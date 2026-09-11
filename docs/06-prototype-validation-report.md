# 06 — Prototype & Usability Validation Framework

**Project**: Integrated Retail Store Billing, Real-Time Inventory & Online Ordering Platform  
**Target Entity**: Sri Chamundi Stores & Tea Stall  
**Design Thinking Stage**: Stage 5 — TEST  
**Status**: Usability Testing Framework & Standardized Test Protocols Created — *Pending Execution With 3 Real Testers*

---

## 1. Overview & Evaluation Guidelines

> [!IMPORTANT]
> **RESEARCH INTEGRITY & ETHICAL DISCLOSURE**  
> To guarantee complete academic and professional honesty, this document defines the **Standardized Usability Testing Protocol**. The tester evaluation logs below contain illustrative structural guidelines and explicitly marked example templates. They must be replaced with recorded observations from 3 real human testers prior to final project submission.

---

## 2. Standardized Usability Task Protocol (9 Tasks)

Each tester is evaluated against 9 core operational tasks representing key customer, cashier, and manager workflows:

| Task ID | Workflow Category | Task Description | Target Success Metric |
|---------|-------------------|------------------|-----------------------|
| **Task 1** | Customer / E-Commerce | Search for a product (e.g., *"Atta"* or *"Red Label Tea"*) using the catalogue search bar. | Completed in < 10 seconds |
| **Task 2** | Customer / E-Commerce | Add 2 units of an item to the shopping cart while verifying stock boundary warnings. | Completed without stock error |
| **Task 3** | Customer / E-Commerce | Complete the 4-step online checkout (Address → Summary → Payment Selection → Confirmation). | Completed in < 45 seconds |
| **Task 4** | Customer / E-Commerce | Locate the placed order and view the live 6-stage visual tracking timeline (`app/orders/[id]`). | Completed in < 15 seconds |
| **Task 5** | POS / Cashier | Open the POS terminal (`/admin/pos`) and scan/search a product by SKU (e.g., `GRO-001`). | Completed in < 5 seconds |
| **Task 6** | POS / Cashier | Apply a ₹15 flat discount, enter cash received amount, and calculate exact change due. | Completed without error |
| **Task 7** | POS / Cashier | Complete POS checkout and trigger the 1-click printable Tax Invoice modal. | Completed in < 10 seconds |
| **Task 8** | Manager / Inventory | Adjust product stock (+10 units) in Inventory Management (`/admin/inventory`) with an audit reason. | Completed in < 20 seconds |
| **Task 9** | Manager / Analytics | Open Sales Reports (`/admin/reports`), view Product Profitability, and download the CSV report. | Completed in < 15 seconds |

---

## 3. Tester Validation Reports (3 Required Participants)

### 3.1 Tester 1 Validation Report: Customer Role
`[TO BE COMPLETED AFTER REAL USER TESTING]`  
`[EXAMPLE ONLY — REPLACE WITH REAL TESTER FEEDBACK]`

| Evaluation Metric | Field Data Collection Entry |
|-------------------|-----------------------------|
| **Tester Name / ID** | *[Insert Real Tester 1 Name / ID]* |
| **User Role** | Local Household Customer |
| **Age Range** | 25 – 40 years |
| **Digital Familiarity** | Moderate (Uses WhatsApp, UPI apps, basic online shopping) |
| **Test Scenario** | *"You want to order 2 packs of wheat flour and tea from Sri Chamundi Stores for evening delivery."* |
| **Tasks Attempted** | Tasks 1, 2, 3, 4 |
| **Task Completion Rate** | *[e.g., 4 / 4 Tasks Completed]* |
| **Observed Friction / Problems** | *[Describe exact user struggles, e.g., "Tester hesitated at payment step wanting COD option."]* |
| **Verbatim Quotes** | `"[Insert exact quote spoken by Tester 1 during testing]"` |
| **Issue Severity** | *[Low / Medium / High / Critical]* |
| **Recommended Improvement** | *[Record requested design change]* |
| **Implementation Status** | *[Implemented / Pending]* |
| **Retest Result** | *[Pass / Fail / Pending]* |

---

### 3.2 Tester 2 Validation Report: Cashier / Staff Role
`[TO BE COMPLETED AFTER REAL USER TESTING]`  
`[EXAMPLE ONLY — REPLACE WITH REAL TESTER FEEDBACK]`

| Evaluation Metric | Field Data Collection Entry |
|-------------------|-----------------------------|
| **Tester Name / ID** | *[Insert Real Tester 2 Name / ID]* |
| **User Role** | Counter Staff / POS Cashier |
| **Age Range** | 20 – 35 years |
| **Digital Familiarity** | Basic to Moderate (Uses smartphone, physical store register) |
| **Test Scenario** | *"A customer at the counter is buying 3 packets of biscuits and paying ₹200 cash. Ring them up fast."* |
| **Tasks Attempted** | Tasks 5, 6, 7 |
| **Task Completion Rate** | *[e.g., 3 / 3 Tasks Completed]* |
| **Observed Friction / Problems** | *[Describe exact cashier struggles, e.g., "Cashier looked for clear 'Print Invoice' button position."]* |
| **Verbatim Quotes** | `"[Insert exact quote spoken by Tester 2 during testing]"` |
| **Issue Severity** | *[Low / Medium / High / Critical]* |
| **Recommended Improvement** | *[Record requested design change]* |
| **Implementation Status** | *[Implemented / Pending]* |
| **Retest Result** | *[Pass / Fail / Pending]* |

---

### 3.3 Tester 3 Validation Report: Store Owner Role
`[TO BE COMPLETED AFTER REAL USER TESTING]`  
`[EXAMPLE ONLY — REPLACE WITH REAL TESTER FEEDBACK]`

| Evaluation Metric | Field Data Collection Entry |
|-------------------|-----------------------------|
| **Tester Name / ID** | *[Insert Real Tester 3 Name / ID]* |
| **User Role** | Store Owner / Business Manager |
| **Age Range** | 40 – 60 years |
| **Digital Familiarity** | Basic (Prefers clear text, simple buttons, avoiding complex menus) |
| **Test Scenario** | *"Check today's sales revenue, adjust stock for 5 damaged tea packets, and export the profit report."* |
| **Tasks Attempted** | Tasks 8, 9 |
| **Task Completion Rate** | *[e.g., 2 / 2 Tasks Completed]* |
| **Observed Friction / Problems** | *[Describe exact owner struggles, e.g., "Owner wanted gross profit displayed in large font."]* |
| **Verbatim Quotes** | `"[Insert exact quote spoken by Tester 3 during testing]"` |
| **Issue Severity** | *[Low / Medium / High / Critical]* |
| **Recommended Improvement** | *[Record requested design change]* |
| **Implementation Status** | *[Implemented / Pending]* |
| **Retest Result** | *[Pass / Fail / Pending]* |

---

## 4. Usability Metric Summary Matrix

Once testing with all 3 real users is finished, summarize results in this matrix:

| Task ID & Description | Tester 1 (Customer) | Tester 2 (Cashier) | Tester 3 (Owner) | Overall Task Completion % | Average Time to Complete |
|-----------------------|--------------------|-------------------|------------------|---------------------------|--------------------------|
| **T1: Product Search** | *[Pass/Fail]* | *[N/A]* | *[N/A]* | *[TBD]* | *[TBD sec]* |
| **T2: Add to Cart & Stock Check** | *[Pass/Fail]* | *[N/A]* | *[N/A]* | *[TBD]* | *[TBD sec]* |
| **T3: Multi-Step Checkout** | *[Pass/Fail]* | *[N/A]* | *[N/A]* | *[TBD]* | *[TBD sec]* |
| **T4: Order Tracking** | *[Pass/Fail]* | *[N/A]* | *[N/A]* | *[TBD]* | *[TBD sec]* |
| **T5: POS Barcode SKU Search** | *[N/A]* | *[Pass/Fail]* | *[N/A]* | *[TBD]* | *[TBD sec]* |
| **T6: Discount & Cash Change** | *[N/A]* | *[Pass/Fail]* | *[N/A]* | *[TBD]* | *[TBD sec]* |
| **T7: Print Invoice** | *[N/A]* | *[Pass/Fail]* | *[N/A]* | *[TBD]* | *[TBD sec]* |
| **T8: Inventory Adjustment** | *[N/A]* | *[N/A]* | *[Pass/Fail]* | *[TBD]* | *[TBD sec]* |
| **T9: Profit Report & CSV Export** | *[N/A]* | *[N/A]* | *[Pass/Fail]* | *[TBD]* | *[TBD sec]* |
