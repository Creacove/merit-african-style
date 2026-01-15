# Product Requirements Document (PRD): Merit African Style Transformation

**Version:** 4.0.0 (The "Lovable Architect" Update)
**Status:** Blueprint for Lovable Cloud
**Author:** Antigravity (Lead Product Manager)
**Date:** January 15, 2026

---

## 1. Executive Summary & Architecture Strategy
**Objective**: To deliver a "Business in a Pocket" application for a premium Nigerian Tailor.
**Execution Strategy**:
*   **Antigravity (Me)**: Defines the *User Experience*, *Data Architecture*, and *Business Logic* (The Blueprint).
*   **Lovable Cloud (The Builder)**: Executes the backend construction (Supabase) and wires up the connections based on this Blueprint.

**Core Philosophy**: "Intimate Digital Tailoring". We are not just selling clothes; we are selling the *confidence* of a perfect fit, whether off-the-rack or bespoke.

---

## 2. The Blueprint (Functional Specs)

### 2.1. The "Hybrid" Commerce Engine
*   **Logic**: Every product can be sold as **Stock** (Immediate) or **Bespoke** (Production Time).
*   **User Flow**:
    1.  User lands on "Royal Blue Agbada".
    2.  User sees "Size L: Sold Out".
    3.  User clicks **"Sew This For Me"**.
    4.  UI transforms: "Production Time: 2 Weeks".
    5.  User inputs Measurements (or selects "Help Me Measure").
    6.  User pays deposit/full amount.

### 2.2. The "Help Me Measure" (WhatsApp Bridge)
*   **Problem**: Users fear measuring themselves incorrectly.
*   **Solution**: A "Help Me Measure" button that deep-links to WhatsApp.
*   **Message Template**: *"Hello, I am interested in [Product Name] but need help with measurements. My name is..."*

### 2.3. The Tailor's Command Center (Admin)
*   **Delivery Date Logic**:
    *   Admin sees a Bespoke Order.
    *   Admin sets "Expected Delivery: Feb 14th".
    *   System emails user: "Your Agbada is due Feb 14th".

---

## 3. The Data Blueprint (Schema Definition)
*This is the strict schema Lovable must implement.*

#### `products`
*   `id` (uuid)
*   `title` (text)
*   `price` (numeric)
*   `is_hybrid` (boolean) - *Enables "Sew For Me" button*
*   `stock_levels` (jsonb) - *e.g., {"M": 2, "L": 0}*
*   `model_stats` (text) - *Context for buyers*

#### `orders`
*   `id` (uuid)
*   `type` (text) - *'stock' or 'bespoke'*
*   `measurements` (jsonb) - *Captured if type='bespoke'*
*   `delivery_date` (date) - *Set by Admin*
*   `status` (text)

---

## 4. Implementation Steps (The Handoff)

1.  **Antigravity**: Creates `supabase_schema.sql` (The contract).
2.  **Antigravity**: Creates `LOVABLE_PROMPT.md` (The instruction manual).
3.  **User**: Pastes Prompt into Lovable Cloud.
4.  **Lovable**:
    *   Spins up Supabase.
    *   Applies the Schema.
    *   Connects the Frontend functionality.

---
## 5. Success Metrics
*   **Zero "Is it ready?" Calls**: Because the Delivery Date is visible.
*   **Zero "My Size is Out" Drop-offs**: Because they converted to Bespoke orders.
