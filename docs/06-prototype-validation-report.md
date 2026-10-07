# 06 — Prototype validation protocol and results record

**Status: protocol prepared; no completed real-user tests recorded in this dossier.**

The assignment requires feedback from at least three real testers. Covering customer, cashier and owner/manager is the proposed study design; it is not evidence of recruitment or completed testing. A participant may take part in both discovery and prototype testing, but record the activities separately.

## Study setup

Use a disposable demo database and a known build/commit. Record actual date, role, device, browser, session duration, moderator and consent. Explain that the prototype, not the person, is being tested. Do not use real payments. Avoid coaching until a participant is stuck; record every hint and classify the result as assisted when applicable.

## Role-specific tasks

| Task | Role | Scenario | Expected observable behavior (not a measured result) |
|---|---|---|---|
| T01 | Customer | Find a specified demo product. | Finds the intended product and reads availability. |
| T02 | Customer | Add two units, then attempt an unavailable quantity. | Understands the cart; overselling is rejected without a false success state. |
| T03 | Customer | Complete a demo order using the available simulated flow. | Reaches an order confirmation and understands that payment is not real settlement. |
| T04 | Customer | Find the order's current stage. | Locates their own order and explains the next action. |
| T05 | Cashier | Find an item by its configured identifier. | Correct product is added; unknown identifier is handled clearly. |
| T06 | Cashier | Change quantity and calculate cash change on a demo bill. | Displayed total and change match the chosen test inputs. |
| T07 | Cashier | Complete the demo sale and open invoice print preview. | Order/stock behavior is observed; printable content is legible. |
| T08 | Owner/manager | Identify low stock and record a permitted adjustment. | Correct item is identified; reason and stock log are recorded. |
| T09 | Owner/manager | Inspect and export the available sales/report data. | Explains the report's meaning and opens the exported file. |

Do not ask a customer to execute staff tasks. Do not treat missing scanner hardware as a tested barcode integration. The actual tracker is opened from a real demo order, not an invented `/orders` listing page.

## Session form — duplicate for each real participant

| Field | Entry |
|---|---|
| Session ID / participant code / role | Not recorded. |
| Actual date, device, build and moderator | Not recorded. |
| Consent scope / record reference | Not recorded. |
| Tasks attempted | Not recorded. |
| Outcome per task | Not assessed: independent / assisted / failed / not attempted. |
| Measured seconds and timing definition | Not measured. |
| Directly observed difficulty, error and moderator help | Not recorded. |
| Genuine quote, or clearly labelled paraphrase | Not recorded. |
| Participant's desired improvement | Not recorded. |
| Severity and rationale assigned by researcher | Not assessed. |
| Proposed action / implemented change / retest link | Pending. |

Use participant codes rather than invented names or ages. A moderator's note must not be formatted as the participant's exact speech.

## Metrics

Independent task completion = independently completed attempted tasks / all attempted tasks. Report assisted and failed tasks separately. Exclude not-attempted tasks from this denominator and state the resulting counts. Report time only for measured tasks with a consistent start/end definition. Do not generalize a small convenience sample to all customers.

A before/after time-saving claim requires comparable tasks, actual baseline measurements, post-change measurements and a clear calculation. No such data is included here.

## Current results

| Measure | Current status |
|---|---|
| Completed real tester records | 0 recorded in this corrected dossier. |
| Independent or assisted success rate | Not measured. |
| Mean/median task time | Not measured. |
| Implemented and retested user-driven improvements | None evidenced. |

After actual testing, add redacted session files under `docs/evidence/`, update the [change log](07-feedback-change-log.md) and the summary in `data/project-review.json`. A filled template is not sufficient unless its contents describe a real, traceable activity.
