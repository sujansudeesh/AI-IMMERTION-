#!/usr/bin/env node
/**
 * Validate PUBLIC, REDACTED evidence metadata and local links.
 * This is not an authenticity check, a full rubric evaluation or a grade.
 * Empty evidence arrays are a valid interim dossier, but not submission-ready.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const text = (value) => typeof value === 'string' && value.trim().length > 0;
const placeholder = (value) => !text(value) || /^(pending|tbd|not recorded|not assessed|to be completed|\[)/i.test(value.trim());
const validDate = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const arrayFields = ['participants', 'interviews', 'observations', 'aiSessions', 'tests', 'changes'];
const outcomeValues = new Set(['independent', 'assisted', 'failed', 'not_attempted']);

export function inspectEvidence(data, projectRoot) {
  const errors = [];
  const pending = [];
  const root = path.resolve(projectRoot);
  const requireText = (value, label) => { if (!text(value)) errors.push(`${label}: nonempty text required.`); };
  const requireDate = (value, label) => { if (!validDate(value)) errors.push(`${label}: an actual YYYY-MM-DD date is required.`); };

  function checkRef(value, label) {
    if (!text(value) || !value.startsWith('docs/evidence/') || value.includes('\\') ||
        value.split('/').some((part) => part === '..' || part === '.') || value.toLowerCase().endsWith('/readme.md')) {
      errors.push(`${label}: use a real record under docs/evidence/, not a README, URL or traversal path.`);
      return;
    }
    const target = path.resolve(root, value);
    const relative = path.relative(root, target);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      errors.push(`${label}: path must remain inside the project.`); return;
    }
    try {
      const realRoot = fs.realpathSync(root);
      const realTarget = fs.realpathSync(target);
      const realRelative = path.relative(realRoot, realTarget);
      // Reject any symlink segment, including one that remains inside the project.
      let segment = root;
      for (const part of value.split('/')) {
        segment = path.join(segment, part);
        if (fs.lstatSync(segment).isSymbolicLink()) throw new Error('symlink references are not accepted');
      }
      if (realRelative.startsWith('..') || path.isAbsolute(realRelative)) throw new Error('reference escapes project');
      const stat = fs.statSync(realTarget);
      if (!stat.isFile() || stat.size === 0) throw new Error('record is empty or not a file');
    } catch (error) {
      errors.push(`${label}: cannot read record ${value} (${error.message}).`);
    }
  }

  if (!object(data)) return { errors: ['Dossier must be a JSON object.'], pending, ready: false };
  if (data.schemaVersion !== 1) errors.push('schemaVersion must be 1.');
  for (const key of ['project', 'title', 'reportStatus', 'problemStatement', 'hmw']) requireText(data[key], key);
  requireDate(data.revisionDate, 'revisionDate');
  if (!/^[0-9a-f]{40}$/i.test(data.baselineCommit || '')) errors.push('baselineCommit must be a 40-character commit SHA.');
  for (const key of arrayFields) if (!Array.isArray(data[key])) errors.push(`${key}: array required.`);
  if (errors.length) return { errors, pending, ready: false };

  if (!Array.isArray(data.alternatives) || data.alternatives.length !== 5) {
    errors.push('alternatives: this revision must contain the five agreed comparison entries.');
  } else {
    const alternativeIds = new Set();
    for (const option of data.alternatives) {
      if (!object(option)) { errors.push('alternatives: every entry must be an object.'); continue; }
      for (const key of ['id','name','benefit','limitation','test','status']) requireText(option[key], `alternative.${key}`);
      if (alternativeIds.has(option.id)) errors.push('alternatives: duplicate id.');
      alternativeIds.add(option.id);
    }
  }

  const ids = {};
  for (const key of arrayFields) {
    ids[key] = new Set();
    for (const [index, record] of data[key].entries()) {
      const label = `${key}[${index}]`;
      if (!object(record)) { errors.push(`${label}: object required.`); continue; }
      if (!text(record.id)) { errors.push(`${label}: id required.`); continue; }
      if (ids[key].has(record.id)) errors.push(`${label}: duplicate id ${record.id}.`);
      ids[key].add(record.id);
      if (key !== 'participants') {
        requireDate(record.date, `${label}.date`);
        checkRef(record.evidenceRef, `${label}.evidenceRef`);
      }
    }
  }

  for (const record of data.participants.filter(object)) {
    requireText(record.role, `participant ${record.id}.role`);
    if (record.consentForRedactedUse !== true) errors.push(`participant ${record.id}: consent for redacted use must be recorded before public inclusion.`);
  }
  for (const record of data.interviews.filter(object)) {
    if (!ids.participants.has(record.participantId)) errors.push(`interview ${record.id}: unknown participantId.`);
  }
  for (const record of data.observations.filter(object)) requireText(record.role, `observation ${record.id}.role`);
  for (const record of data.aiSessions.filter(object)) {
    if (!['original', 'retrospective', 'current_revision'].includes(record.kind)) errors.push(`AI record ${record.id}: invalid kind.`);
    if (!Array.isArray(record.alternatives) || record.alternatives.length < 2 || !record.alternatives.every(text)) errors.push(`AI record ${record.id}: record at least two actual alternatives considered.`);
    if (record.humanDecision !== null && placeholder(record.humanDecision)) errors.push(`AI record ${record.id}: a real human decision/rationale is required, not a placeholder.`);
  }

  const testerIds = new Set();
  for (const record of data.tests.filter(object)) {
    if (!ids.participants.has(record.participantId)) errors.push(`test ${record.id}: unknown participantId.`);
    requireText(record.buildRef, `test ${record.id}.buildRef`);
    if (placeholder(record.feedback)) errors.push(`test ${record.id}: genuine feedback or a labelled researcher summary is required.`);
    if (!Array.isArray(record.tasks) || record.tasks.length === 0) { errors.push(`test ${record.id}: tasks required.`); continue; }
    const taskIds = new Set();
    let attempted = false;
    for (const task of record.tasks) {
      if (!object(task) || !text(task.id) || !outcomeValues.has(task.outcome)) { errors.push(`test ${record.id}: invalid task record/outcome.`); continue; }
      if (taskIds.has(task.id)) errors.push(`test ${record.id}: duplicate task id ${task.id}.`);
      taskIds.add(task.id);
      if (task.outcome !== 'not_attempted') attempted = true;
    }
    if (attempted && ids.participants.has(record.participantId)) testerIds.add(record.participantId);
    else if (!attempted) errors.push(`test ${record.id}: no attempted task; do not count this as completed testing.`);
  }
  for (const record of data.changes.filter(object)) {
    if (!ids.tests.has(record.testId)) errors.push(`change ${record.id}: source testId does not exist.`);
    if (placeholder(record.decision)) errors.push(`change ${record.id}: record a real change or reasoned no-change decision.`);
    if (record.implementationRef !== null && !text(record.implementationRef)) errors.push(`change ${record.id}: implementationRef must be text or null.`);
    if (record.retestRef !== null) checkRef(record.retestRef, `change ${record.id}.retestRef`);
  }

  if (!object(data.pathway)) errors.push('pathway: object required.');
  else if (data.pathway.selected === null) pending.push('Confirm Pathway A or B and link the actual pathway/prior-evidence record.');
  else if (!['A', 'B'].includes(data.pathway.selected)) errors.push('pathway.selected must be A, B or null.');
  else {
    requireDate(data.pathway.confirmedOn, 'pathway.confirmedOn');
    checkRef(data.pathway.evidenceRef, 'pathway.evidenceRef');
    if (data.pathway.selected === 'B') {
      if (!data.interviews.length) pending.push('For the fresh-discovery route, add actual interview records.');
      if (!data.observations.length) pending.push('For the fresh-discovery route, add actual observation records.');
    }
  }
  if (!data.interviews.length && data.pathway?.selected !== 'A') pending.push('Supply the applicable empathy evidence and ground the problem/journey in it.');
  if (!data.aiSessions.some((record) => object(record) && record.kind !== 'retrospective' && !placeholder(record.humanDecision))) pending.push('Add authentic original/current AI session evidence with alternatives and a human decision.');
  if (testerIds.size < 3) pending.push(`Record prototype feedback from at least 3 distinct real testers; ${testerIds.size} are recorded.`);
  if (!data.changes.some((record) => object(record) && text(record.retestRef))) pending.push('Link real feedback to a decision and record the follow-up/retest outcome.');

  const technical = data.technicalVerification;
  if (!object(technical)) errors.push('technicalVerification: object required.');
  else {
    if (!['not_run', 'pass', 'fail'].includes(technical.buildStatus)) errors.push('technicalVerification.buildStatus must be not_run, pass or fail.');
    if (technical.buildStatus === 'not_run') pending.push('Run the application build/workflow checks and record their actual results.');
    else {
      requireText(technical.buildRef, 'technicalVerification.buildRef');
      checkRef(technical.evidenceRef, 'technicalVerification.evidenceRef');
      if (technical.buildStatus === 'fail') pending.push('Resolve the recorded failed build before claiming a verified prototype.');
    }
    if (!technical.demoEvidenceRef) pending.push('Add a controlled demo/recording reference accessible to the evaluator.');
    else checkRef(technical.demoEvidenceRef, 'technicalVerification.demoEvidenceRef');
  }
  const assessment = data.assessment;
  if (!object(assessment)) errors.push('assessment: object required.');
  else {
    if (!Number.isFinite(assessment.review1Marks) || !Number.isFinite(assessment.review1Maximum) ||
        assessment.review1Maximum <= 0 || assessment.review1Marks < 0 || assessment.review1Marks > assessment.review1Maximum) errors.push('assessment: invalid marks/max values.');
    requireText(assessment.source, 'assessment.source');
    requireText(assessment.review2Milestone, 'assessment.review2Milestone');
  }
  return { errors, pending: [...new Set(pending)], ready: errors.length === 0 && pending.length === 0 };
}

function main() {
  const args = process.argv.slice(2);
  if (args.some((arg) => !['--submission', '--json'].includes(arg))) {
    console.error('Usage: node scripts/check-review-evidence.mjs [--submission] [--json]');
    process.exitCode = 1; return;
  }
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  let result;
  try {
    result = inspectEvidence(JSON.parse(fs.readFileSync(path.join(root, 'data/project-review.json'), 'utf8')), root);
  } catch (error) {
    result = { errors: [`Could not load dossier: ${error.message}`], pending: [], ready: false };
  }
  if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(result.errors.length ? 'STRUCTURE: INVALID' : 'STRUCTURE: VALID');
    result.errors.forEach((issue) => console.log(`ERROR: ${issue}`));
    result.pending.forEach((issue) => console.log(`PENDING: ${issue}`));
    console.log(result.ready ? 'METADATA GATE: SATISFIED — human authenticity/rubric review still required.' : 'METADATA GATE: NOT SATISFIED — do not claim completed validation.');
    console.log('This checker does not authenticate participants, run the application or award a grade.');
  }
  process.exitCode = result.errors.length ? 1 : args.includes('--submission') && !result.ready ? 2 : 0;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main();
