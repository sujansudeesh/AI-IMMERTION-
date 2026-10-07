# 11 — Technical verification and demonstration plan

**Status: current full application build, browser workflows and deployment not verified by this correction.**

## Scope

This correction changes reports, evidence templates and the review-page presentation. It does not certify or repair the retail application's business APIs. Consult the correction pack's `VALIDATION_REPORT.md` for the limited local checks actually run on generated files.

## Baseline source observations

`lib/stock.ts` performs a product lookup/check/update/log within a Prisma transaction. That helper alone does not establish transaction boundaries of all order routes or concurrency correctness. `lib/auth.ts` uses an environment secret with a hard-coded fallback. `app/api/orders/route.ts` includes complete product objects when returning order items; review whether that exposes purchase costs or other internal fields to customers. These are source-review findings, not exploitation tests.

## Required demo checks

| Area | Check to perform | Evidence to record |
|---|---|---|
| Clean environment | Install from lockfile, generate Prisma, use a disposable database, build the application. | Commands, versions, date, commit and full outcomes. |
| Authentication/authorization | Test every role against permitted and prohibited routes and records. Ensure one customer cannot access another's order. | Expected/actual statuses and redacted responses. |
| Data minimization | Inspect public/customer responses for internal cost data and unrelated personal information. | Fields reviewed and corrective commit if needed. |
| Stock integrity | Reject negative, zero, fractional and invalid quantities as appropriate; test duplicate items and two requests for the last unit. | Initial stock, requests, final stock, order/log consistency. |
| Atomicity and retry | Force failure midway; ensure stock and order do not diverge. Replay submissions and cancellation/return actions. | Rollback/idempotency outcomes. |
| Billing/report accuracy | Check quantities, discounts, tax inputs, returns and period boundaries against explicit fixtures. | Expected and actual totals, not screenshots alone. |
| Payment limitations | Separate selecting a method from independently confirmed gateway settlement. | Clearly label simulated or manually confirmed flows. |
| UI and print | Customer purchase, cashier sale, manager stock/report, keyboard navigation, narrow screens and print preview. | Actual screenshots and recorded difficulties. |
| Evidence portal | `/project-review` and `/admin/design-thinking` show consistent pending/data-derived statuses; print includes every section. | Screenshots and print-preview inspection. |

## Controlled evaluator demo

Use only synthetic accounts and transactions. Provide a short role-based walkthrough and the exact tested commit. A redacted recording is an alternative when a hosted demo is not ready. Do not include real customer details or administrator passwords in a public video. Do not call a local development address a public deployment.

Before public deployment, replace unsafe fallback secrets and demo account access, review authorization and data exposure, verify dependency security/support, and test backup/recovery. Current dependency advisories have not been assessed in this pack; no claim that the pinned stack is safe or up to date is made.

## Result record

Test ID; actual date; command/scenario; environment; build reference; expected result; actual result; evidence file; pass/fail/not run; issue; corrective commit; retest. Never copy “pass” from a proposed test into the outcome column.
