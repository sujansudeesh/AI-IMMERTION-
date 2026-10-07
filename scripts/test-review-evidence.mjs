/** Synthetic metadata tests ONLY. These fixtures are never participant evidence. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectEvidence } from './check-review-evidence.mjs';
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseline = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/project-review.json'), 'utf8'));

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chamundi-metadata-test-'));
  const data = structuredClone(baseline);
  // Ensure tests remain independent of later real records added by the team.
  for (const key of ['participants','interviews','observations','aiSessions','tests','changes']) data[key] = [];
  data.pathway = { selected: null, confirmedOn: null, evidenceRef: null };
  data.technicalVerification = { buildStatus: 'not_run', buildRef: null, evidenceRef: null, demoEvidenceRef: null };
  const record = 'docs/evidence/SYNTHETIC-TEST-FIXTURE.md';
  fs.mkdirSync(path.dirname(path.join(root, record)), { recursive: true });
  fs.writeFileSync(path.join(root, record), '# SYNTHETIC METADATA FIXTURE\nNot actual field research.\n');
  return { root, data, record, close: () => fs.rmSync(root, { recursive: true, force: true }) };
}
function complete(f) {
  const { data: d, record: r } = f;
  d.pathway = { selected: 'A', confirmedOn: '2026-10-06', evidenceRef: r };
  d.participants = ['P01','P02','P03'].map((id) => ({ id, role: 'Synthetic test role', consentForRedactedUse: true }));
  d.aiSessions = [{ id: 'AI01', date: '2026-10-06', evidenceRef: r, kind: 'current_revision', alternatives: ['Synthetic A','Synthetic B'], humanDecision: 'Synthetic fixture decision, not real evidence.' }];
  d.tests = d.participants.map((p, i) => ({ id: `T0${i+1}`, participantId: p.id, date: '2026-10-06', evidenceRef: r, buildRef: 'synthetic-build', tasks: [{ id: 'TASK01', outcome: 'assisted' }], feedback: 'Synthetic feedback for a metadata test only.' }));
  d.changes = [{ id: 'CH01', date: '2026-10-06', evidenceRef: r, testId: 'T01', decision: 'Synthetic no-change decision.', implementationRef: null, retestRef: r }];
  d.technicalVerification = { buildStatus: 'pass', buildRef: 'synthetic-build', evidenceRef: r, demoEvidenceRef: r };
}
const check = (f) => inspectEvidence(f.data, f.root);

test('empty interim dossier is structurally valid but not submission ready', () => {
  const f = fixture(); try { const r=check(f); assert.equal(r.errors.length,0); assert.equal(r.ready,false); assert.ok(r.pending.length >= 5); } finally { f.close(); }
});
test('complete synthetic metadata satisfies metadata gate, not authenticity', () => {
  const f=fixture(); try { complete(f); const r=check(f); assert.deepEqual(r.errors,[]); assert.equal(r.ready,true); } finally { f.close(); }
});
test('three sessions with the same person are not three testers', () => {
  const f=fixture(); try { complete(f); f.data.tests.forEach((t)=>t.participantId='P01'); assert.ok(check(f).pending.some((s)=>s.includes('1 are recorded'))); } finally { f.close(); }
});
test('invalid date is rejected', () => {
  const f=fixture(); try { complete(f); f.data.tests[0].date='2026-02-30'; assert.ok(check(f).errors.some((s)=>s.includes('date'))); } finally { f.close(); }
});
test('unknown participants and duplicate tasks are rejected', () => {
  const f=fixture(); try { complete(f); f.data.tests[0].participantId='P99'; f.data.tests[0].tasks.push({...f.data.tests[0].tasks[0]}); const r=check(f); assert.ok(r.errors.some((s)=>s.includes('unknown participant'))); assert.ok(r.errors.some((s)=>s.includes('duplicate task'))); } finally { f.close(); }
});
test('missing record and README reference are rejected', () => {
  const f=fixture(); try { complete(f); f.data.tests[0].evidenceRef='docs/evidence/missing.md'; f.data.tests[1].evidenceRef='docs/evidence/README.md'; const r=check(f); assert.ok(r.errors.some((s)=>s.includes('cannot read record'))); assert.ok(r.errors.some((s)=>s.includes('not a README'))); } finally { f.close(); }
});
test('traversal and symlink references are rejected', () => {
  const f=fixture(); try { complete(f); f.data.tests[0].evidenceRef='docs/evidence/../../secret.txt'; fs.symlinkSync(path.join(f.root,f.record),path.join(f.root,'docs/evidence/link.md')); f.data.tests[1].evidenceRef='docs/evidence/link.md'; const r=check(f); assert.ok(r.errors.length>=2); } finally { f.close(); }
});
test('non-attempted tasks do not count as a completed tester record', () => {
  const f=fixture(); try { complete(f); f.data.tests[0].tasks[0].outcome='not_attempted'; const r=check(f); assert.ok(r.errors.some((s)=>s.includes('no attempted task'))); assert.ok(r.pending.some((s)=>s.includes('2 are recorded'))); } finally { f.close(); }
});
test('public participant records require consent', () => {
  const f=fixture(); try { complete(f); f.data.participants[0].consentForRedactedUse=false; assert.ok(check(f).errors.some((s)=>s.includes('consent'))); } finally { f.close(); }
});
test('retrospective AI entries alone leave authentic session evidence pending', () => {
  const f=fixture(); try { complete(f); f.data.aiSessions[0].kind='retrospective'; assert.ok(check(f).pending.some((s)=>s.includes('authentic original/current'))); } finally { f.close(); }
});
test('fresh-discovery route requires interview and observation records', () => {
  const f=fixture(); try { complete(f); f.data.pathway.selected='B'; const r=check(f); assert.ok(r.pending.some((s)=>s.includes('interview'))); assert.ok(r.pending.some((s)=>s.includes('observation'))); } finally { f.close(); }
});
test('non-JSON objects and broken arrays fail without throwing', () => {
  const f=fixture(); try { assert.ok(inspectEvidence(null,f.root).errors.length); f.data.tests=null; assert.ok(check(f).errors.some((s)=>s.includes('array required'))); } finally { f.close(); }
});


test('five comparison alternatives are required', () => {
  const f=fixture(); try { f.data.alternatives.pop(); assert.ok(check(f).errors.some((s)=>s.includes('alternatives'))); } finally { f.close(); }
});
test('duplicate alternative ids are rejected', () => {
  const f=fixture(); try { f.data.alternatives[1].id=f.data.alternatives[0].id; assert.ok(check(f).errors.some((s)=>s.includes('duplicate id'))); } finally { f.close(); }
});
test('current assistance without final human choice is allowed but remains pending', () => {
  const f=fixture(); try { complete(f); f.data.aiSessions[0].humanDecision=null; const r=check(f); assert.deepEqual(r.errors,[]); assert.equal(r.ready,false); assert.ok(r.pending.some((s)=>s.includes('human decision'))); } finally { f.close(); }
});
