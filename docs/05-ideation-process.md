# 05 — Five-alternative comparison

**Status: current assistant-assisted design reasoning; no participant ratings or final human selection recorded.**

## Scope and chronology

This comparison is prepared after the existing prototype and the evaluator feedback. It replaces the inconsistent older ten-option active matrix. The earlier matrix remains in Git history, not as verified evidence of the original development process.

The following **five alternatives** are also stored in `data/project-review.json` and shown directly by the review page. A structured comparison is not a completed user study.

| ID | Alternative | Potential benefit | Limitation / uncertainty | Evaluation question |
|---|---|---|---|---|
| ALT-01 | Paper-based stock and billing checklist | Could improve consistency without requiring customers to use a new application. | Staff would still have to record and reconcile changes manually. | Observe whether a clearer checklist reduces repeated checks without extra work. |
| ALT-02 | Message-based ordering | Could allow assisted ordering through a communication channel already used by participants. | Availability checks, confirmations and stock updates may still require staff intervention. | Ask which channels people actually use; observe staff effort per order. |
| ALT-03 | Standalone offline POS | Could focus on counter billing without requiring an online customer account. | Remote stock visibility would need a separate integration or process. | Compare cashier task completion and recovery from mistakes with the current workflow. |
| ALT-04 | Third-party ordering or delivery platform | Could reuse external ordering or delivery capabilities rather than building every feature. | Fees, eligibility, data access and integrations need provider-specific verification. No fixed commission is assumed. | Check actual terms and whether the store and its customers need the service. |
| ALT-05 | Integrated web POS and storefront | The existing prototype shares retail data across staff and customer interfaces. | Requires staff adoption, reliable records, authorization checks, maintenance and end-to-end transaction tests. | Evaluate the existing prototype with real participants and compare it with a simpler intervention. |

## Current implementation direction

**ALT-05 is the existing prototype, not a user-validated winner.** Keep it while collecting evidence. Shortlist at least one simpler intervention relevant to the actual findings, such as ALT-01 or ALT-03, and compare the relevant task rather than unrelated feature counts.

## Criteria for the human decision

Evaluate observed need, customer comprehension, staff effort, ability to recover from errors, accessibility, implementation feasibility, operating requirements and data risks. No arbitrary numerical ranking, unverified commission rate, “zero cost” claim or unsupported adoption preference is presented here.

Record the decision-maker, actual date, research IDs, chosen scope, rejected alternatives and reasons. Mark any subjective score as an estimate. Distinguish the assistant's recommendation from a human's final decision.

## AI record

See [04 — AI provenance](04-ai-interaction-audit.md) and the [current assistance summary](evidence/ai-revision-2026-10-06.md). No claim is made that this comparison occurred before the original application was built.
