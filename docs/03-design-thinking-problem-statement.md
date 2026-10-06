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

## 2. Refined Human-Centered Problem Statements

Using the standard Design Thinking problem structure:  
`Person` → `Situation` → `Difficulty` → `Consequence` → `Desired Improvement`

### Staff & Management Problem Statement
- **Person**: Store Cashier & Store Owner
- **Situation**: Managing heavy physical counter sales during morning and evening tea stall rush hours while simultaneously taking phone/whatsapp grocery orders
- **Difficulty**: Must manually look up item prices and count physical shelf boxes for every order
- **Consequence**: Billing queues slow down, cashiers experience peak-hour stress, and out-of-stock items are accidentally promised to customers
- **Desired Improvement**: A single synchronized billing system that automatically locks stock upon physical counter checkout or web order confirmation.

### Customer Problem Statement
- **Person**: Neighborhood Grocery Customer
- **Situation**: Buying daily staples, milk, tea powder, and snacks for household consumption
- **Difficulty**: Cannot verify if desired brands are in stock without traveling to the physical store or calling the owner
- **Consequence**: Experiences wasted trips, unexpected order cancellations, and uncertainty regarding order packing progress
- **Desired Improvement**: Live inventory availability visibility on mobile and visual order preparation tracking.

---

## 3. Provisional Design Question ("How Might We")

> [!IMPORTANT]
> **PROVISIONAL DESIGN QUESTION**  
> *"How might we help customers and staff at Sri Chamundi Stores complete purchases with less waiting and less uncertainty about product availability and order progress?"*

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
7. **HMW 7**: *How might we give online shoppers confidence that the items they see online are available right now on the store shelves?*
8. **HMW 8**: *How might we provide customers with clear, visual 6-stage order tracking so they don't need to call the store for delivery updates?*
9. **HMW 9**: *How might we make re-ordering daily household staples a single-click experience for repeat local buyers?*

---

## 5. User Stories Matrix (Validated Baseline vs. Hypotheses)

| User Role | User Story Format | Mapped System Feature | Validation Status |
|-----------|-------------------|-----------------------|-------------------|
| **Customer** | As a neighborhood customer, I want to see real-time stock availability before visiting so I don't waste trips. | Live Stock Badges on Catalogue (`/products`) | **Hypothesis to Validate** |
| **Cashier** | As a store cashier, I want to scan item barcodes or enter SKUs quickly so counter queues don't build up. | POS Billing Terminal (`/admin/pos`) | **Baseline Observed Need** |
| **Owner / Manager** | As a store owner, I want stock levels to update automatically when physical sales occur so online orders never oversell. | Atomic Prisma Transaction Lock | **Baseline Observed Need** |
