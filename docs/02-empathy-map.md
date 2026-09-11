# 02 — User Empathy Maps

**Project**: Integrated Retail Store Billing, Real-Time Inventory & Online Ordering Platform  
**Target Entity**: Sri Chamundi Stores & Tea Stall  
**Status**: Initial Working Hypotheses & Draft Maps — *To Be Validated With Field Transcripts*

---

## 1. Persona A: Store Owner (Business & Operations Lead)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                              EMPATHY MAP: STORE OWNER                             │
├──────────────────────────────────────────────────┬────────────────────────────────┤
│ SAYS                                             │ THINKS                         │
│ • "I don't know my exact stock until it's empty."│ • "Am I actually making a net  │
│ • "Wholesale suppliers raise prices without      │   profit after all expenses?"  │
│   me noticing the margin drop."                  │ • "If I am not here, will the  │
│ • "I want my store to look modern like big mart  │   cash register be accurate?"  │
│   chains, but stay simple for my staff."         │ • "How can I expand to online  │
│                                                  │   delivery without extra chaos?"│
├──────────────────────────────────────────────────┼────────────────────────────────┤
│ DOES                                             │ FEELS                          │
│ • Manually inspects shelves at night to guess    │ • Anxious about undetected     │
│   what needs reordering.                         │   losses or dead stock.        │
│ • Writes wholesale purchase totals on loose paper│ • Overwhelmed by daily store   │
│   slips or notebooks.                            │   routine and lack of data.    │
│ • Interrupts counter staff to check prices.      │ • Proud of local reputation.   │
├──────────────────────────────────────────────────┴────────────────────────────────┤
│ PAINS                                                                             │
│ • Unexpected stockouts of high-demand items (Atta, Oil, Butter).                 │
│ • Inability to calculate gross profit margin (`Selling Price - Purchase Price`). │
│ • Fear of stock theft, inventory leakage, or double-entry mistakes.               │
├───────────────────────────────────────────────────────────────────────────────────┤
│ GAINS                                                                             │
│ • Clear dashboard showing daily revenue, profits, and low-stock alerts.          │
│ • Automated stock-in updates when supplier purchases are recorded.               │
│ • Peace of mind knowing staff can run fast POS billing without price mistakes.    │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Persona B: Cashier / Counter Staff (POS & Front Desk Operator)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                              EMPATHY MAP: STORE CASHIER                           │
├──────────────────────────────────────────────────┬────────────────────────────────┤
│ SAYS                                             │ THINKS                         │
│ • "During evening rush hours, the line gets too   │ • "I hope I don't calculate the│
│   long and customers get impatient."             │   change wrong when it's busy."│
│ • "I have to memorize prices for hundreds of     │ • "I wish scanning barcodes    │
│   unbarcoded items and tea snacks."              │   was instant for all items."  │
│ • "Calculating manual discounts takes too long." │ • "I get blamed if stock is    │
│                                                  │   missing at end of shift."    │
├──────────────────────────────────────────────────┼────────────────────────────────┤
│ DOES                                             │ FEELS                          │
│ • Uses a handheld plastic calculator at register.│ • Stressed during peak tea/snack│
│ • Asks customers to wait while verifying prices.  │   and grocery rush hours.      │
│ • Manually tallies cash drawer totals at night.   │ • Reluctant to use complicated │
│                                                  │   software with tiny buttons.  │
├──────────────────────────────────────────────────┴────────────────────────────────┤
│ PAINS                                                                             │
│ • Slow checkout velocity causing customer frustration and long queues.           │
│ • Manual calculation errors on tax, discounts, or cash change due.               │
│ • Fatigue from repetitive manual price lookups and ledger writing.               │
├───────────────────────────────────────────────────────────────────────────────────┤
│ GAINS                                                                             │
│ • Lightning-fast POS terminal with barcode/SKU instant search.                   │
│ • Automatic cash change due and UPI QR code generator.                           │
│ • 1-click thermal tax invoice printing (`window.print()`).                      │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Persona C: Customer (Local Resident & Highway Commuter)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                               EMPATHY MAP: CUSTOMER                               │
├──────────────────────────────────────────────────┬────────────────────────────────┤
│ SAYS                                             │ THINKS                         │
│ • "I want to know if items are in stock before I │ • "Why can't I order online    │
│   walk over to the store."                       │   from my local trusted store?"│
│ • "I hate waiting in long lines just for tea or  │ • "Are the items online        │
│   a packet of biscuits."                         │   actually available right now?"│
│ • "I want transparent tax invoices for household │ • "I hope my order arrives     │
│   budgeting."                                    │   fresh and on time."          │
├──────────────────────────────────────────────────┼────────────────────────────────┤
│ DOES                                             │ FEELS                          │
│ • Calls store owner on mobile to check milk/tea  │ • Annoyed when driving to store│
│   stock before making a trip.                    │   only to find items sold out. │
│ • Abandons shopping if queue is too long.        │ • Appreciative of local store  │
│ • Orders groceries for home delivery when busy.  │   trust and familiarity.       │
├──────────────────────────────────────────────────┴────────────────────────────────┤
│ PAINS                                                                             │
│ • Wasted trips due to unannounced stockouts.                                      │
│ • Lack of clear order tracking for home deliveries.                               │
│ • Disorganized printed bills or missing receipt breakdowns.                       │
├───────────────────────────────────────────────────────────────────────────────────┤
│ GAINS                                                                             │
│ • Real-time stock visibility (`In Stock`, `Only 3 left`, `Out of Stock`).         │
│ • Multi-step online checkout with UPI, Card, Net Banking & COD choices.          │
│ • 6-stage visual live order tracking with digital invoice download.               │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Assumptions To Validate With Real Users

> [!WARNING]
> **RESEARCH ASSUMPTION DISCLOSURE**  
> The empathy maps above represent **plausible design hypotheses** based on observed retail dynamics at Sri Chamundi Stores. They must be validated against real interview transcripts before final project defense.

### Specific Assumptions to Validate:

1. **Store Owner Assumptions**:
   - Assumed that the owner prioritizes gross profit tracking (`Selling Price - Purchase Cost`) over basic turnover metrics.
   - *Validation Test*: Verify during interview whether the owner calculates profit daily or weekly.

2. **Cashier / Staff Assumptions**:
   - Assumed that cashiers prefer barcode SKU search over visual grid browsing during peak hours.
   - *Validation Test*: Time cashier completion speed using barcode scanner vs. screen click during user testing.

3. **Customer Assumptions**:
   - Assumed that local customers check stock availability online (`In Stock (12)`) prior to visiting the physical counter.
   - *Validation Test*: Survey 5 local shoppers on whether public stock counts influence their decision to order online or visit in person.
