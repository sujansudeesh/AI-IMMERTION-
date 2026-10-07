# Review 2 — Sri Chamundi Stores & Tea Stall

**Project:** Integrated Retail Store Billing, Real-Time Inventory & Online Ordering Platform  
**Repository:** `sujansudeesh/AI-IMMERTION-`  
**Revision date:** 6 October 2026  
**Baseline inspected:** `1070d38646d2f190cfa229eb15e6b103ba45adee`  
**Milestone label:** Review 2 — 35% project completion, as shown in the supplied portal screenshot.  
**Current status:** Consistency correction prepared; real-user research, pathway confirmation and full application verification pending.

## 1. Existing project and preservation

This continues the same Sri Chamundi Stores project. It is not a new application or repository. The existing customer catalogue, cart/checkout, staff POS, inventory, purchasing and reports remain the prototype baseline. The store transaction APIs, dependency files, database/schema and shop photographs are not replaced by this correction package.

The original [Review 1 report](Review_1_Project_Report.md) stays unchanged. [Later corrections](docs/13-review1-corrections.md) clarify historical claims without pretending those corrections existed earlier.

## 2. Human-centred objective

The project investigates how customers and staff can complete purchases with understandable information and less repeated work. Waiting, stock uncertainty and unclear order progress are hypotheses to investigate, not confirmed store findings in the absence of supplied interviews.

> How might we help customers and staff at Sri Chamundi Stores complete purchases with less waiting and less uncertainty about product availability and order progress?

The [problem definition](docs/03-design-thinking-problem-statement.md) connects possible users, situations, difficulties, consequences and desired improvements. User stories and proposed acceptance criteria remain provisional until supported by evidence.

## 3. What this consistency correction changes

The earlier partial update changed the review page and report but left several supporting files unchanged. This package corrects the active README, supporting documents and review component together.

| Area | Correction | Evidence boundary |
|---|---|---|
| Empathy | Interview/observation forms, distinct map categories and journey worksheet; no invented quotations or identities. | Actual interviews and observations still absent from the dossier. |
| Define | One provisional HMW and explicit person/situation/difficulty/consequence framing. | Must be checked against real research. |
| Ideation | Exactly five consistent alternatives in the JSON, page and written comparison. | New design reasoning, not measured preferences or a final human selection. |
| AI audit | Unsupported historical dates/prompts removed from the active audit; current assistance documented as a summary. | Original historical exports not recovered; final human decision pending. |
| Validation | Role-specific study protocol and unfilled real-tester records; feedback/change/retest tracking. | No completed three-person study or measured time saving is claimed. |
| Pathway | Prior code history shown separately from research; A/B confirmation remains explicit. | Existing code does not prove completed earlier empathy research. |
| Presentation | Data-driven evidence counts, readable section navigation and print styling. | A component change is not a full-app/browser test or deployment. |

The five options are: paper-based stock and billing checklist; message-based ordering; standalone offline POS; third-party ordering or delivery platform; and integrated web POS and storefront. The integrated option is retained as the existing prototype, not pronounced a user-validated winner.

## 4. Prototype architecture and verification boundary

The baseline source uses Next.js/React interfaces, server API routes and Prisma/SQLite. The schema defines 17 models. Source contains a transactional stock-check/update/log helper and staff/customer workflows. These are source observations, not evidence of concurrent checkout safety, successful payment settlement, secure deployment or a passing current build.

This revision adds no store business-functionality changes. It corrects the evaluation portfolio and evidence handling. The [technical plan](docs/11-technical-verification.md) identifies build, authorization, stock, payment-boundary and role-workflow checks required before claiming a verified demonstration.

## 5. Research, testers and status

No real participant identities, interviews, observations or usability results are inserted by this package. The public evidence arrays for those activities remain empty. The current AI-assistance summary is explicitly separate from participant research.

Testing should involve at least three distinct real people with appropriate customer, cashier and owner/manager tasks. Record actual dates, version, task outcomes, help given, observed difficulties and genuine feedback. Link decisions and changes to their source feedback and record follow-up outcomes. A software test cannot substitute for a real tester.

## 6. Pathway and chronology

**Pathway A/B confirmation remains pending.** The existing project history is retained. Continuation requires identifying the earlier research being carried forward; fresh discovery requires real new research. Do not backdate a study or select a route simply to make a status badge green.

Review 1 is shown as 30.1/35 (86%) in the user's screenshots. These awarded marks are not a measurement of project completion. The Review 2 milestone heading is reproduced as a label, not upgraded to a 70% or 100% progress claim.

## 7. Evidence directory and next steps

Start at the [evidence index](docs/README.md) and [five-area evaluator response](docs/09-evaluator-feedback-response.md). The [checklist](docs/10-resubmission-checklist.md) keeps human tasks and technical checks distinct from completed documentation changes.

Next: confirm pathway; supply or collect genuine research; revise the problem and choose an intervention from evidence; test with at least three real participants; implement justified changes and record follow-up results; run application checks; supply a controlled demo or redacted recording.

## 8. Publication status

This correction was prepared in a delivery package after the GitHub connection returned HTTP 403 for a write attempt. It is **not a successfully published GitHub revision** until an authorized editor applies, commits and pushes it. Add the real correction commit after that succeeds. Localhost links are not public demo links, and no college submission is performed by this package.
