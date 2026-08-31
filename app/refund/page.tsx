'use client';

export default function RefundPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">LEGAL POLICY</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Refund & Cancellation Policy</h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 · Last Updated: August 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Technology Services</h2>
            <p>
              Before development begins, cancellation may be considered according to the applicable quotation/project agreement.
            </p>
            <p>
              Once development or other billable work has started, refunds may be adjusted for work already completed, committed resources, third-party expenses (such as API credits, domain/hosting costs), and other applicable project costs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Student Projects</h2>
            <p>
              Student projects are generally limited to a maximum project value of ₹10,000, subject to scope, feasibility, and AWIE approval.
            </p>
            <p>
              Cancellation after work begins may result in charges for work already performed and non-recoverable expenses. A change in student requirements or college submission deadlines does not automatically create a right to a full refund.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. AWIE Products</h2>
            <p>
              Refunds and returns for AWIE-developed products are governed by the specific product page and the AWIE Product Service & Repair Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. AWIE Store Electronics Components</h2>
            <p>Returns are generally not accepted for:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Change of mind</li>
              <li>Incorrect product selection</li>
              <li>Incorrect compatibility choice</li>
              <li>Customer ordering the wrong item</li>
            </ul>
            <p>
              However, if an item is damaged in transit, defective on arrival, incorrectly supplied, missing material components, or materially different from its listed description, the customer should contact AWIE at <strong>awielabs@gmail.com</strong> with order details and supporting evidence within 7 days of delivery.
            </p>
            <p>
              AWIE will assess the issue and, where appropriate, provide a replacement, repair, refund, or other lawful resolution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Unboxing Evidence</h2>
            <p>
              For damaged, defective, incomplete, or incorrect orders, AWIE may request a continuous, unedited unboxing video showing the package, shipping label, packaging, and product.
            </p>
            <p className="text-xs text-slate-500">
              Note: This requirement assists in rapid claims processing with logistics partners and does not limit statutory rights available under applicable law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Refund Processing Timeline</h2>
            <p>
              Approved refunds will generally be processed through the original payment method (or another mutually agreed payment method).
            </p>
            <p>
              Once initiated, refunds typically take 5 to 7 business days to reflect in the customer's account, depending on the payment provider or banking institution.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
