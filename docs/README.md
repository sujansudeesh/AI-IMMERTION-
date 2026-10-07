# Review evidence index

**Sri Chamundi Stores & Tea Stall · revised 6 October 2026**

Start with [Review 2](../Review_2_Project_Report.md). The dossier currently contains prepared research instruments and design reasoning, not completed fieldwork. A green documentation label must not be read as completed user validation.

| Document | Purpose | Evidence status |
|---|---|---|
| [01 — Empathy research](01-empathy-research.md) | Recruitment, interviews and observation records | Protocol ready; records pending. |
| [02 — Empathy maps](02-empathy-map.md) | Role-based evidence synthesis | Hypotheses only. |
| [03 — Problem and user stories](03-design-thinking-problem-statement.md) | HMW, provisional POV and acceptance criteria | Awaiting research support. |
| [04 — AI audit](04-ai-interaction-audit.md) | Original vs reconstructed vs current AI work | Current assistance summary; historical provenance unverified. |
| [05 — Alternatives](05-ideation-process.md) | Five-option current comparison | Design reasoning, not a user-rated selection. |
| [06 — Validation](06-prototype-validation-report.md) | Role-specific tasks and outcome forms | No completed tester records. |
| [07 — Changes and retests](07-feedback-change-log.md) | Trace feedback to implementation and retest | Documentation corrections recorded; user iterations pending. |
| [08 — Pathway and stage](08-design-thinking-stage.md) | A/B decision and actual stage status | Pathway unconfirmed. |
| [09 — Evaluator response](09-evaluator-feedback-response.md) | Feedback-to-evidence mapping | Partly addressed; field evidence still open. |
| [10 — Checklist](10-resubmission-checklist.md) | Submission gates | Not ready for a completed-validation claim. |
| [11 — Technical verification](11-technical-verification.md) | Runtime checks and deployment limitations | Full application checks pending. |
| [12 — Journey map](12-user-journey-map.md) | Connect actions, difficulties and opportunities | Worksheet awaiting observations. |
| [13 — Historical Review 1 corrections](13-review1-corrections.md) | Preserve original submission and distinguish later corrections | Historical file not overwritten. |
| [Evidence folder](evidence/README.md) | Safe record naming and provenance | Redacted records to be added. |

## Status definitions

**Source inspected** means a file or implementation was read. **Draft/hypothesis** means an idea awaits evidence. **Protocol ready** means a collection method exists. **Recorded evidence** means an actual dated activity has a traceable record. **Verified result** requires an identifiable test, expected outcome, actual outcome and evidence; it is not a synonym for an attractive interface.

## Keeping the website and report consistent

The review page reads `data/project-review.json`. Add only real, redacted evidence records to its arrays after completing the activities. The markdown documents provide context and detailed forms; they do not automatically populate the website. Update both the evidence record and its linked summary, then run:

```bash
node scripts/check-review-evidence.mjs
node scripts/check-review-evidence.mjs --submission
```

The checker reports missing evidence and broken local record links. It cannot decide whether an interview truly occurred or whether the report meets the coordinator's full rubric.
