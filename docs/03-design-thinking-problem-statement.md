# 03 — Human-Centered Problem Statement & "How Might We" (HMW) Framework

**Project**: Integrated Retail Store Billing, Real-Time Inventory & Online Ordering Platform  
**Target Entity**: Sri Chamundi Stores & Tea Stall  
**Design Thinking Stage**: Stage 2 — DEFINE

---

## 1. Contrast: Technical Implementation Problem vs. Human-Centered Problem

Evaluating a project purely through technical metrics (e.g., *"Database ORM schema with 17 entities and Next.js routes"*) obscures the real human friction experienced by store owners, cashiers, and customers. 

Below is the side-by-side contrast between the technical implementation perspective and the human-centered perspective:

| Technical Implementation Perspective | Human-Centered Design Perspective |
|---------------------------------------|-----------------------------------|
| *"Build an SQLite database with Prisma ORM to record orders, products, and inventory logs."* | **Store Owner Friction**: *"The store owner experiences persistent anxiety over unrecorded inventory losses, unknown daily profit margins, and supplier stockouts because stock counting is manual and error-prone."* |
| *"Create a Next.js API route that calculates subtotal, GST, discount, and grand total."* | **Cashier Friction**: *"Store cashiers suffer from extreme stress and cognitive fatigue during peak evening rush hours due to manual price lookups, handheld calculator usage, and slow billing queues."* |
| *"Implement an e-commerce checkout page with React state management."* | **Customer Friction**: *"Local and highway customers feel frustration and disappointment when traveling to the store or calling only to find items are out of stock or orders lack delivery updates."* |

---

## 2. Point-of-View (POV) Statements

The Point-of-View (POV) statement frames the design challenge from the perspective of specific human users, their unmet needs, and the underlying human insights.

### POV 1: Store Owner
- **User**: S. Varma, Owner of Sri Chamundi Stores & Tea Stall.
- **Need**: A clear, effortless real-time overview of financial profit margins and automated low-stock warnings.
- **Insight**: Small retail owners do not want full-scale enterprise ERP software; they need simple, actionable data to prevent stockouts and make confident purchasing decisions.

### POV 2: Store Cashier / Counter Staff
- **User**: A. Kumar, Evening Counter Staff & POS Cashier.
- **Need**: An ultra-fast billing interface with instant barcode/SKU scanning and automated cash change calculations.
- **Insight**: Front-desk staff under heavy queue pressure avoid complicated screens with multiple clicks; they require minimal keypresses and zero manual arithmetic.

### POV 3: Customer
- **User**: R. Mehta, Local Household Buyer & Regular Patron.
- **Need**: Real-time item stock availability on their phone and transparent live delivery tracking.
- **Insight**: Customers choose local neighborhood stores over giant remote platforms when they feel confident that their order is fresh, actually in stock, and tracked end-to-end.

---

## 3. Primary "How Might We" (HMW) Statement

> [!IMPORTANT]
> **PRIMARY DESIGN THINKING QUESTION**  
> *"How might we help Sri Chamundi Stores reduce billing delays, inventory uncertainty, and ordering friction so customers and staff can complete purchases more reliably, quickly, and conveniently?"*

---

## 4. Sub-"How Might We" Questions (Categorized by User Need)

To drive the ideation process across all operational touchpoints, the primary HMW is broken down into specific design questions:

### A. Point-of-Sale & Queue Velocity (Cashier Experience)
1. **HMW 1**: *How might we eliminate manual calculator usage at the counter so cashiers can finish billing in under 15 seconds per customer?*
2. **HMW 2**: *How might we enable instant barcode SKU scanning for packaged tea snacks and groceries while keeping manual search effortless for unbarcoded items?*
3. **HMW 3**: *How might we prevent cash change calculation errors during busy peak shifts?*

### B. Inventory & Financial Control (Owner Experience)
4. **HMW 4**: *How might we notify the store owner before high-selling staples (Atta, Oil, Milk, Tea) completely run out of stock?*
5. **HMW 5**: *How might we automatically update store inventory levels whenever a supplier purchase invoice is recorded?*
6. **HMW 6**: *How might we show the owner their true gross profit margin (`Selling Price - Purchase Price`) without requiring accounting knowledge?*

### C. Online Customer Shopping & Transparency (Customer Experience)
7. **HMW 7**: *How might we give online shoppers 100% confidence that the items they see online are available right now on the store shelves?*
8. **HMW 8**: *How might we provide customers with clear, visual 6-stage order tracking so they don't need to call the store for delivery updates?*
9. **HMW 9**: *How might we make re-ordering daily household staples a single-click experience for repeat local buyers?*
