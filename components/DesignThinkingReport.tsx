'use client';

import React from 'react';
import type { ReactNode } from 'react';
import dossier from '@/data/project-review.json';
import type { ProjectReviewEvidence } from '@/lib/project-review-types';

// Run scripts/check-review-evidence.mjs after editing the public dossier.
const evidence = dossier as ProjectReviewEvidence;
const repository = 'https://github.com/sujansudeesh/AI-IMMERTION-/blob/main/';
const sections = [
  ['summary', 'Summary'], ['pathway', 'Pathway'], ['research', 'Research'],
  ['problem', 'Problem'], ['ideation', 'Ideation & AI'], ['prototype', 'Prototype'],
  ['validation', 'Validation'], ['iteration', 'Iteration'], ['next', 'Next actions'],
];
const documents = [
  ['01-empathy-research.md', 'Interviews & observations'],
  ['02-empathy-map.md', 'Empathy maps'],
  ['03-design-thinking-problem-statement.md', 'Problem & user stories'],
  ['04-ai-interaction-audit.md', 'AI provenance audit'],
  ['05-ideation-process.md', 'Five-alternative comparison'],
  ['06-prototype-validation-report.md', 'Usability protocol & results'],
  ['07-feedback-change-log.md', 'Changes & retests'],
  ['08-design-thinking-stage.md', 'Pathway & stage record'],
  ['09-evaluator-feedback-response.md', 'Evaluator response'],
  ['10-resubmission-checklist.md', 'Submission checklist'],
  ['11-technical-verification.md', 'Technical verification'],
  ['12-user-journey-map.md', 'Journey map'],
  ['13-review1-corrections.md', 'Historical Review 1 corrections'],
];

function sourceUrl(path: string): string {
  return repository + path.split('/').map(encodeURIComponent).join('/');
}

function DocumentLink({ path, children }: { path: string; children: ReactNode }) {
  return (
    <a href={sourceUrl(path)} target="_blank" rel="noopener noreferrer"
      className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:text-brand-900 dark:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
      {children}<span className="sr-only"> (opens repository file in a new tab)</span>
    </a>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <h2 id={`${id}-title`} className="mb-5 text-xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">{children}</div>
    </section>
  );
}

function Pending({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">{children}</p>;
}

export default function DesignThinkingReport() {
  const attemptedTests = evidence.tests.filter((test) => test.evidenceRef && test.feedback &&
    test.tasks.some((task) => task.outcome !== 'not_attempted'));
  const testerIds = new Set(attemptedTests.map((test) => test.participantId));
  const retests = evidence.changes.filter((change) => change.retestRef);
  const assessment = evidence.assessment;
  const review1Percent = assessment.review1Maximum > 0
    ? ((assessment.review1Marks / assessment.review1Maximum) * 100).toFixed(1)
    : 'Not available';
  const roleFor = (id: string) => evidence.participants.find((participant) => participant.id === id)?.role || 'Role not recorded';
  const stages = [
    ['Empathize', evidence.interviews.length || evidence.observations.length ? 'Records available — synthesis needs review' : 'Protocol ready; field records pending'],
    ['Define', 'Provisional problem; research support must be checked'],
    ['Ideate', 'Five current alternatives; human selection pending'],
    ['Prototype', `Source exists; recorded build status: ${evidence.technicalVerification.buildStatus.replace('_', ' ')}`],
    ['Test', `${testerIds.size} distinct tester records with attempted tasks`],
    ['Iterate', `${retests.length} changes with linked retest records`],
  ];

  return (
    <div className="project-evidence min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8 dark:bg-slate-950 dark:text-slate-100">
      <style>{`
        @media print {
          @page { margin: 14mm; }
          .project-evidence { background: white !important; color: black !important; padding: 0 !important; }
          .project-evidence .screen-only { display: none !important; }
          .project-evidence section { border: 1px solid #ddd !important; box-shadow: none !important; margin: 12pt 0; }
          .project-evidence h2, .project-evidence h3 { break-after: avoid; }
          .project-evidence p, .project-evidence li { orphans: 3; widows: 3; }
          .project-evidence table { font-size: 9pt; }
          .project-evidence tr { break-inside: avoid; }
          .project-evidence * { color: black !important; background-color: transparent !important; }
        }
      `}</style>
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">Project Better Tomorrow · Review evidence</p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{evidence.project}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{evidence.title}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-1.5 font-semibold text-amber-950 dark:bg-amber-950 dark:text-amber-200">{evidence.reportStatus}</span>
            <span className="text-slate-500 dark:text-slate-400">Revision: {evidence.revisionDate}</span>
          </div>
          <div className="screen-only mt-6 flex flex-wrap gap-4">
            <button type="button" onClick={() => window.print()}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-white dark:text-slate-900">Print all sections</button>
            <a href="/" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-slate-700">Storefront</a>
            <a href="/admin" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-slate-700">Staff portal</a>
          </div>
        </header>

        <nav aria-label="Evidence report sections" className="screen-only flex flex-wrap gap-2">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-slate-700 dark:bg-slate-900">{label}</a>)}
        </nav>

        <Section id="summary" title="1. What exists, and what remains to be evidenced">
          <Pending>Prepared documents and source code are not proof of completed research or a successful deployment. Counts below reflect records in this dossier, not independently authenticated activities.</Pending>
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ['Interview records', evidence.interviews.length], ['Observation records', evidence.observations.length],
              ['Distinct tester records', testerIds.size], ['Linked retests', retests.length],
            ].map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
              <dd className="mt-2 text-3xl font-bold">{value}</dd>
            </div>)}
          </dl>
          <p>Review 1 in the supplied screenshots: <strong>{assessment.review1Marks}/{assessment.review1Maximum} ({review1Percent}%)</strong>. This is an assessment score, not the percentage of software completed. {assessment.review2Milestone}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Source: {assessment.source}</p>
          <p><DocumentLink path="Review_2_Project_Report.md">Full Review 2 progress report</DocumentLink> · <DocumentLink path="docs/09-evaluator-feedback-response.md">Response to evaluator feedback</DocumentLink></p>
        </Section>

        <Section id="pathway" title="2. Pathway and stage declaration">
          <p><strong>Selected route:</strong> {evidence.pathway.selected ? `Pathway ${evidence.pathway.selected}` : 'Not yet confirmed'}. {evidence.pathway.confirmedOn ? `Recorded confirmation: ${evidence.pathway.confirmedOn}.` : 'The team must confirm the route and supporting evidence.'}</p>
          {evidence.pathway.evidenceRef && <p><DocumentLink path={evidence.pathway.evidenceRef}>Pathway evidence record</DocumentLink></p>}
          <p><strong>A — Continuation:</strong> identify the prior empathy data and defined problem being carried forward. <strong>B — Fresh Discovery:</strong> document fresh empathy, definition and AI-assisted ideation within the required timeline. Existing application code alone establishes neither route.</p>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map(([stage, status]) => <div key={stage} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"><dt className="font-bold">{stage}</dt><dd className="mt-1 text-sm">{status}</dd></div>)}
          </dl>
          <p><DocumentLink path="docs/08-design-thinking-stage.md">Pathway decision and chronology</DocumentLink></p>
        </Section>

        <Section id="research" title="3. Empathy research and the user journey">
          <p>The proposed roles are owner/manager, cashier and customer. Possible billing effort, stock uncertainty and unclear order progress are hypotheses to investigate, not confirmed findings about the store. No invented names, demographics or direct quotes are presented.</p>
          <p>Collect non-leading interviews and observations with consent. Separate recorded speech, visible actions and the researcher’s interpretation. Use anonymous participant codes and publish only appropriate redacted records.</p>
          {evidence.interviews.length === 0 ? <Pending>No completed interview records are linked. The interview questions and empathy maps are prepared research instruments.</Pending> :
            <ul className="list-disc space-y-2 pl-5">{evidence.interviews.map((record) => <li key={record.id}><DocumentLink path={record.evidenceRef}>{record.id}</DocumentLink> — {record.participantId}, {roleFor(record.participantId)}, {record.date}</li>)}</ul>}
          <p><DocumentLink path="docs/01-empathy-research.md">Research protocol</DocumentLink> · <DocumentLink path="docs/02-empathy-map.md">Empathy maps</DocumentLink> · <DocumentLink path="docs/12-user-journey-map.md">Journey worksheet</DocumentLink></p>
        </Section>

        <Section id="problem" title="4. Provisional problem and design question">
          <p>{evidence.problemStatement}</p>
          <blockquote className="border-l-4 border-brand-500 bg-brand-50 p-5 text-base font-semibold leading-8 dark:bg-brand-950/30">{evidence.hmw}</blockquote>
          <p>Research may narrow or change this question. The goal is an understandable purchase workflow, not simply a larger feature list. Draft user stories cover cashier item lookup, owner stock decisions, customer availability and order progress, and traceable adjustments.</p>
          <p><DocumentLink path="docs/03-design-thinking-problem-statement.md">User stories and proposed acceptance criteria</DocumentLink></p>
        </Section>

        <Section id="ideation" title="5. Alternatives and AI provenance">
          <p>{evidence.alternatives.length} alternatives are compared below and in the written report. This comparison was prepared during the correction; it is not claimed to precede the original build or to reflect measured customer preferences.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {evidence.alternatives.map((option) => <article key={option.id} className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-500">{option.id} · {option.status}</p>
              <h3 className="mt-1 font-bold">{option.name}</h3>
              <p><strong>Potential benefit:</strong> {option.benefit}</p>
              <p><strong>Limitation:</strong> {option.limitation}</p>
              <p><strong>Evaluation:</strong> {option.test}</p>
            </article>)}
          </div>
          <p>The existing integrated POS/storefront is a prototype to evaluate, not a proven best solution. The team should record its own decisions and compare against at least one simpler intervention supported by the research.</p>
          {evidence.aiSessions.length === 0 ? <Pending>No original AI session files are linked in this dossier. The audit discloses current correction assistance and distinguishes it from unverified historical reconstruction.</Pending> :
            <ul className="list-disc space-y-2 pl-5">{evidence.aiSessions.map((record) => <li key={record.id}><DocumentLink path={record.evidenceRef}>{record.id}</DocumentLink> — {record.kind.replace('_', ' ')}, {record.date}. Human decision: {record.humanDecision || 'Pending — no final choice recorded.'}</li>)}</ul>}
          <p>The linked current-revision entry is an assistant-authored summary, not an original historical transcript. Approval to correct the project is not treated as choosing a winning alternative.</p>
          <p><DocumentLink path="docs/04-ai-interaction-audit.md">AI audit and record form</DocumentLink> · <DocumentLink path="docs/05-ideation-process.md">Five-alternative comparison</DocumentLink></p>
        </Section>

        <Section id="prototype" title="6. Existing prototype and verification boundary">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Customer catalogue', '/products', 'Find products and inspect availability.'],
              ['Customer account', '/profile', 'Open an actual demo order from the account to inspect tracking.'],
              ['Cashier POS', '/admin/pos', 'Find items, adjust a demo bill and open invoice printing.'],
              ['Inventory', '/admin/inventory', 'Inspect stock and permitted adjustment workflows.'],
              ['Purchases', '/admin/purchases', 'Inspect supplier stock-in workflow.'],
              ['Reports', '/admin/reports', 'Inspect and verify the available report/export features.'],
            ].map(([title, route, description]) => <article key={route} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="font-bold">{title}</h3><p className="mt-1 text-sm">{description}</p>
              <a href={route} className="screen-only mt-3 inline-block text-sm font-semibold text-brand-700 underline underline-offset-4 dark:text-brand-300">Open workflow</a>
            </article>)}
          </div>
          <p>These links point to existing source routes and may require a role-specific login. Source presence is not a guarantee that every workflow works. The shared database and transactional stock helper require end-to-end tests; payment selection is not verified settlement.</p>
          <p><strong>Recorded build status:</strong> {evidence.technicalVerification.buildStatus.replace('_', ' ')}. {evidence.technicalVerification.buildRef || 'No tested build reference recorded.'}</p>
          {evidence.technicalVerification.evidenceRef && <p><DocumentLink path={evidence.technicalVerification.evidenceRef}>Technical test record</DocumentLink></p>}
          {evidence.technicalVerification.demoEvidenceRef ? <p><DocumentLink path={evidence.technicalVerification.demoEvidenceRef}>Controlled demonstration evidence</DocumentLink></p> : <Pending>No remotely inspectable demonstration is linked. Localhost is not a public demo. Use synthetic data and address deployment risks before exposing the application.</Pending>}
          <p><DocumentLink path="docs/11-technical-verification.md">Verification plan and source-review limitations</DocumentLink></p>
        </Section>

        <Section id="validation" title="7. Real-user validation">
          <p>The study should include at least three real people, with role-relevant tasks. Record actual dates, role, device, build, attempted tasks, moderator help, observed problems and genuine feedback. Do not infer an independent success from a coached completion.</p>
          {attemptedTests.length === 0 ? <Pending>No completed session with attempted tasks is recorded. Success rates and time savings are not measured; there are no sample PASS rows.</Pending> :
            <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-sm"><caption className="mb-3 text-left">Recorded sessions — not independently authenticated</caption><thead><tr>{['Session', 'Participant / role', 'Date', 'Task outcomes', 'Feedback'].map((label) => <th key={label} scope="col" className="border-b border-slate-300 p-3 align-top dark:border-slate-700">{label}</th>)}</tr></thead><tbody>
              {attemptedTests.map((test) => <tr key={test.id}><td className="border-b border-slate-200 p-3 align-top dark:border-slate-700"><DocumentLink path={test.evidenceRef}>{test.id}</DocumentLink></td><td className="border-b border-slate-200 p-3 align-top dark:border-slate-700">{test.participantId} / {roleFor(test.participantId)}</td><td className="border-b border-slate-200 p-3 align-top dark:border-slate-700">{test.date}</td><td className="border-b border-slate-200 p-3 align-top dark:border-slate-700">{test.tasks.map((task) => `${task.id}: ${task.outcome.replace('_', ' ')}`).join('; ')}</td><td className="border-b border-slate-200 p-3 align-top dark:border-slate-700">{test.feedback}</td></tr>)}
            </tbody></table></div>}
          <p><DocumentLink path="docs/06-prototype-validation-report.md">Role-specific tasks, session form and metric definitions</DocumentLink></p>
        </Section>

        <Section id="iteration" title="8. Feedback, changes and retests">
          <p>Documentation corrections in this revision are separate from user-driven product improvements. A feature already in the source is not proof that a user requested it or that a retest succeeded.</p>
          {evidence.changes.length === 0 ? <Pending>No verified user-feedback change sequence is claimed. Record the original session, decision, implementation evidence and actual retest outcome after the activities occur.</Pending> :
            <ul className="list-disc space-y-3 pl-5">{evidence.changes.map((change) => <li key={change.id}><DocumentLink path={change.evidenceRef}>{change.id}</DocumentLink> — {change.decision}. Implementation: {change.implementationRef || 'Not recorded'}. {change.retestRef ? <DocumentLink path={change.retestRef}>Retest record</DocumentLink> : 'Retest pending.'}</li>)}</ul>}
          <p><DocumentLink path="docs/07-feedback-change-log.md">Correction and feedback change log</DocumentLink></p>
        </Section>

        <Section id="next" title="9. Completion steps and evidence directory">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Confirm the pathway and milestone meaning; supply the appropriate prior or fresh research.</li>
            <li>Ground the problem and alternatives in that evidence, and preserve authentic AI session provenance.</li>
            <li>Test with at least three real people; record feedback, decisions, changes and retests.</li>
            <li>Verify the application, provide a controlled demonstration and update the dossier from the actual records.</li>
          </ol>
          <p>The website reads <code>data/project-review.json</code>. Markdown edits alone do not update its evidence counts. Run <code>node scripts/check-review-evidence.mjs --submission</code> after adding real records. A metadata check cannot authenticate research or award a grade.</p>
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">{documents.map(([file, title]) => <li key={file}><DocumentLink path={`docs/${file}`}>{title}</DocumentLink></li>)}</ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">Repository links resolve against main after the correction files are applied and pushed. This page does not submit a report to the college portal.</p>
        </Section>
        <footer className="pb-6 text-center text-xs leading-6 text-slate-500 dark:text-slate-400">Baseline inspected: <code>{evidence.baselineCommit}</code><br />Prepared evidence instruments are not completed field research.</footer>
      </div>
    </div>
  );
}
