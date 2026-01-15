# PROMPT FOR LOVABLE CLOUD (Copy & Paste This)

**Instruction for Lovable AI:**

Hello Lovable. I am handing over a project that has been architected by a Senior Product Manager. Your job is to take the "Blueprint" documents in this repository and build the fully functional backend logic using your Supabase integration.

**1. The Context**
This is a premium E-commerce Web App for "Merit African Style", a high-end Nigerian Tailor.
We are replacing the static portfolio with a dynamic shop.

**2. Your Source of Truth**
Please read the following files in the repository IMMEDIATELY:
- `planning/PRD.md` (The Product Requirements)
- `planning/supabase_schema.sql` (The strict SQL Blueprint)

**3. Your Task (The Build)**
I need you to perform the following:
1.  **Initialize Supabase**: Create the project instance.
2.  **Execute the Schema**: Run the SQL exactly as defined in `planning/supabase_schema.sql`. This creates the `products`, `orders`, and `consultations` tables with the "Hybrid" commerce logic.
3.  **Wire the Frontend**:
    *   Connect the "Shop" page to the `products` table.
    *   Implement the "Sew For Me" button logic (as described in the PRD).
    *   Implement the Guest Checkout that inserts into the `orders` table.
4.  **Admin Dashboard**:
    *   Create a protected `/admin` route.
    *   Build the interface to upload products (and set `is_hybrid` and stock levels).
    *   Build the interface to view orders and set the `delivery_date`.

**4. Design Requirements**
The design must be world-class, premium, and mobile-first.
- Use a "Slide-over" Cart.
- Use glassmorphism and high-end typography (Inter/Outfit).
- Ensure the "Help Me Measure" button opens WhatsApp with the pre-filled message.

**5. Success Criteria**
I should be able to:
- Purchase a Ready-to-wear item (Stock decrements).
- Order a Bespoke item (Form asks for measurements).
- Log in as Admin and see the orders.

Please proceed with the build.
