# Sri Chamundi Stores & Tea Stall
## Retail billing, inventory and online-ordering prototype

**Course project:** Project Better Tomorrow  
**Full project title:** Integrated Retail Store Billing, Real-Time Inventory & Online Ordering Platform  
**Review revision:** 6 October 2026  
**Status:** Technical prototype source exists; field research, user validation and current runtime verification remain pending.

This project explores whether a shared retail application can reduce billing friction and uncertainty about product availability and order progress for store staff and customers. It combines a customer storefront with staff billing, inventory, purchasing and reporting interfaces.

These are design objectives, not measured outcomes. The current evidence does not establish reduced waiting time, improved profit, customer adoption or production readiness.

## Start with the review evidence

- [Review 2 report](Review_2_Project_Report.md) — current progress, corrective actions and remaining work.
- [Original Review 1](Review_1_Project_Report.md) and [later corrections](docs/13-review1-corrections.md) — retained history, not current test certification.
- [Portal submission text](Review_2_Submission.txt) — an interim progress statement, not a claim of completed validation.
- [Evidence index](docs/README.md) — research, problem definition, alternatives, AI provenance, tests and review response.
- [Submission checklist](docs/10-resubmission-checklist.md) — the remaining completion gates.

The in-app evidence page is `/project-review`; the existing administrative wrapper is `/admin/design-thinking`. Both use `components/DesignThinkingReport.tsx` and the summary record in `data/project-review.json`.

## Working design question

> How might we help customers and staff at Sri Chamundi Stores complete purchases with less waiting and less uncertainty about product availability and order progress?

This question and the role-based user stories are **provisional** until supported or revised by actual interviews and observations. No named persona in this revision is represented as an interviewed participant.

## What the source contains

| Area | Source reference | Evidence boundary |
|---|---|---|
| Customer storefront | `app/page.tsx`, customer product/cart/checkout pages | Source implementation; not proof of successful customer use. |
| Staff point of sale | `app/admin/pos/page.tsx` | Billing interface; speed and scanner compatibility need testing. |
| Stock handling | `lib/stock.ts`, inventory routes | Transactional check/update/log helper; end-to-end race safety has not been established. |
| Purchasing and reports | `app/admin/purchases/page.tsx`, `app/admin/reports/page.tsx` | Prototype workflows; calculations, authorization and exports need verification. |
| Data model | `prisma/schema.prisma` | 17 Prisma models using SQLite; demo data is not real operating evidence. |
| Authentication | `lib/auth.ts`, authentication routes | JWT implementation; not a security certification. |

The baseline `package.json` specifies Next.js 14.1.0, React 18 and Prisma 5.x dependencies. Those are repository specifications, not recommendations of current versions. This revision does not upgrade the runtime dependencies.

## Run locally in an isolated demo environment

First inspect the existing project and back up any local database. Use the project's dependency lockfile and your team's supported Node environment.

```bash
npm ci
npx prisma generate
npm run dev -- --port 3008
```

Do not reset or reseed an existing database. A missing database requires a separately prepared synthetic environment. Use the address printed by the development server; the default port is normally 3000 unless configured differently. A `localhost` address is accessible only on the machine serving it and is **not a public evaluator demo**.

```bash
npm run build
node scripts/check-review-evidence.mjs
node scripts/check-review-evidence.mjs --submission
```

The review-evidence checker validates the dossier structure and referenced files. `--submission` also exits with a nonzero status while required evidence is absent. Passing a structure check does not authenticate human research or establish that the application works.

## Demo safety and known limitations

Use synthetic customers, addresses and transactions. The existing seed/login flows expose demonstration accounts: do not put those accounts on a public server with real store data. The baseline JWT helper also contains a hard-coded fallback secret. Replace that behavior and configure an unpredictable deployment secret before any public use.

Payment-method choices and a QR display are not evidence of settled gateway payments. Store photographs do not prove stock accuracy or user validation. Printed prototype invoices and financial reports are not certified accounting or tax records. A shared database does not automatically provide live updates to every open browser.

[Technical verification](docs/11-technical-verification.md) records the release-blocking checks. The stock, authentication, order APIs, dependencies and database schema are not changed by this documentation/review-page correction pack.

## Evidence and privacy

Keep original consent forms, contact details, recordings and private store records out of the public repository. Publish only consented, redacted evidence under `docs/evidence/`, using participant codes such as P01. Add record links to `data/project-review.json` after the activities actually occur. See [evidence guidance](docs/evidence/README.md).

**Pathway A/B is awaiting confirmation.** Existing code is not proof of prior empathy work or fresh discovery. See [pathway and stage record](docs/08-design-thinking-stage.md).

The previous README linked an MIT license without a verified accompanying license file. This revision does not grant or change licensing rights; the repository owner should confirm the intended license separately.
