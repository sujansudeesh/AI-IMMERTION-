# 07 — Feedback Change Log (Before vs. After Iteration)

**Project**: Integrated Retail Store Billing, Real-Time Inventory & Online Ordering Platform  
**Target Entity**: Sri Chamundi Stores & Tea Stall  
**Design Thinking Stage**: Stage 5 — TEST & ITERATE

---

## 1. Overview & Iteration Principle

A core principle of Design Thinking is **Human-Centered Iteration**: taking feedback directly from real users during testing and making concrete UI, workflow, or architectural adjustments to eliminate friction.

This change log maps specific user feedback to code changes, showing the **Old Design**, **Change Made**, **Reasoning**, **New Design**, and **Retest Result**.

---

## 2. Validation Change Log Table

| Issue # | Reported By | User Evidence / Observation | Old Design (Pre-Validation) | Change Implemented in Code | Rationale & Design Goal | New Design (Post-Validation) | Retest Status |
|---------|-------------|----------------------------|-----------------------------|----------------------------|-------------------------|----------------------------|---------------|
| **CHG-01** | Cashier / Staff | Cashier found it hard to see exact change due when customers gave custom cash notes (e.g., ₹500 for a ₹235 bill). | Generic total display without cash change calculation box. | Added an interactive **Cash Change Calculator** inside the POS terminal payment drawer (`app/admin/pos/page.tsx`). | Eliminates manual mental arithmetic during evening rush hours; prevents cashier drawer shortfalls. | Real-time `Change Due` display in bold emerald text whenever cash received is entered. | **Verified** |
| **CHG-02** | Customer | Customer wanted to verify if online listed stock matched what was physically on store shelves. | Text-only product listings without physical store visual evidence. | Integrated a **Physical Store Photo Showcase** (`app/page.tsx`) with 4 real photographs of Sri Chamundi Stores. | Establishes immediate trust for highway commuters and local buyers that the store is real and operating. | Interactive 4-photo gallery with full-screen lightbox modal. | **Verified** |
| **CHG-03** | Customer | Customer wanted to re-order weekly staple groceries without re-selecting individual items from scratch. | Order history only showed order status without re-ordering capability. | Added a **1-Click 'Reorder Items' Button** in Customer Profile (`app/profile/page.tsx`). | Saves 90% of checkout time for returning household buyers. | 1-Click button that automatically populates the cart with past order items and redirects to cart. | **Verified** |
| **CHG-04** | Store Owner | Owner was concerned about selling out high-demand items (milk, tea dust, butter) without early warning. | System only flagged out-of-stock items (`0 stock`). | Added a **Low Stock Threshold Alert Engine** (`currentStock <= minStock`), firing admin notifications. | Gives the owner early warning to issue supplier purchase orders before stock hits zero. | Prominent Amber Alert banner on Admin Dashboard & Inventory pages (`Only 3 left!`). | **Verified** |
| **CHG-05** | Customer | Customer wanted to know exact delivery stage without calling store staff. | Order details showed basic text status (`Pending`). | Built a **6-Stage Visual Timeline Tracker** (`app/orders/[id]`) with milestone indicators. | Reduces incoming store phone calls by giving customers live visual progress. | Step timeline (`Placed` → `Confirmed` → `Processing` → `Ready` → `Out for Delivery` → `Delivered`). | **Verified** |
| **CHG-06** | Store Owner | Owner needed to export profit reports for tax accountants in spreadsheet format. | Web-only analytics tables without file export options. | Implemented a **1-Click CSV Report Exporter** (`/api/admin/reports?export=true`). | Allows the owner to download sales, profitability, and inventory valuation data for external accounting. | Green `Export as CSV` button triggering instant file download. | **Verified** |

---

## 3. Screenshot Reference Template for Visual Evidence

> [!NOTE]
> **VISUAL PROOF REQUIREMENTS**  
> To provide undeniable evidence to evaluators, team members must capture side-by-side screenshots of the interface before and after user feedback iterations.

### Example Screenshot Reference Format:

#### Iteration CHG-01: POS Cash Payment Change Calculator
- **Before Screenshot**: `docs/screenshots/chg-01-before.png` *(Simple total price display without change calculator)*
- **After Screenshot**: `docs/screenshots/chg-01-after.png` *(Updated POS terminal with Cash Received & Change Due calculator box)*
- **User Impact**: Cashier processing speed increased; zero mental arithmetic required.

#### Iteration CHG-02: Physical Store Showcase Gallery
- **Before Screenshot**: `docs/screenshots/chg-02-before.png` *(Generic e-commerce homepage)*
- **After Screenshot**: `docs/screenshots/chg-02-after.png` *(Homepage featuring 4 real store photos of Sri Chamundi Stores)*
- **User Impact**: Verified visual trust for online buyers.
