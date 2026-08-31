'use client';

export default function ShippingPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">STORE POLICY</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Shipping & Delivery Policy</h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 · Applicable to AWIE Store Orders
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Order Processing</h2>
            <p>
              Orders placed on AWIE Store are processed after successful payment confirmation and order verification, subject to item availability.
            </p>
            <p>
              Standard processing time is typically 1 to 2 business days prior to dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Sourcing & Dispatch</h2>
            <p>
              Certain specialized components or AWIE Store products may be sourced from verified third-party suppliers or distributors after an order is placed.
            </p>
            <p>
              Availability and dispatch timing may vary based on component sourcing schedules. Customers will be notified in case of unexpected delays.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Shipping Charges</h2>
            <p>Shipping charges are calculated based on:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Package weight and volumetric dimensions</li>
              <li>Delivery destination pincode</li>
              <li>Courier partner selection and urgency</li>
            </ul>
            <p>
              Any applicable shipping fee will be clearly displayed during checkout prior to final payment confirmation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Delivery Timelines & Tracking</h2>
            <p>
              Standard domestic delivery across India typically takes 3 to 7 business days following dispatch, depending on destination accessibility.
            </p>
            <p>
              Where available, courier tracking details will be sent via Email or SMS once the package is handed over to logistics partners.
            </p>
            <p className="text-xs text-slate-500">
              Delivery timelines are estimates and may be affected by logistics disruptions, weather conditions, or unforeseen regional restrictions outside AWIE's reasonable control.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Delivery Address & Re-Shipping</h2>
            <p>
              Customers are responsible for providing complete and accurate delivery addresses along with a working phone number.
            </p>
            <p>
              If a package is returned due to an incomplete/incorrect address or non-availability of the recipient, additional re-shipping charges may apply.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Damaged Outer Packaging</h2>
            <p>
              If the outer box or package shows visible signs of damage or tampering upon arrival, customers are advised to photograph the box before opening and contact <strong>awielabs@gmail.com</strong> immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">7. Domestic Focus</h2>
            <p>
              Unless specifically arranged and confirmed in writing, AWIE Store currently focuses on domestic deliveries within India.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
