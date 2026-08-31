'use client';

export default function RepairPolicyPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">PRODUCT POLICY</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Product Service & Repair Policy</h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 · Applicable to AWIE-Developed Hardware & IoT Products
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Scope of Coverage</h2>
            <p>
              This policy applies to proprietary products developed, engineered, or branded by AWIE, including AWIE IoT companion devices (such as GEM Buddy), specialized hardware modules, and custom electronic products.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Service & Maintenance Model</h2>
            <p className="font-bold text-slate-900">
              Unless a specific product documentation or written agreement explicitly states otherwise, AWIE products are provided under a paid Service & Repair model rather than a general commercial warranty.
            </p>
            <p>
              AWIE offers technical diagnostics, component servicing, firmware updates, and repair services to maintain device functionality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Service & Diagnostic Charges</h2>
            <p>Service and repair charges are determined upon device inspection and may include:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Replacement hardware components & sensors</li>
              <li>Technical labor & diagnostic testing</li>
              <li>Shipping and handling costs where applicable</li>
            </ul>
            <p>
              AWIE will provide a detailed cost estimate prior to carrying out chargeable repairs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Third-Party Components</h2>
            <p>
              Where AWIE products incorporate third-party components (such as displays, microcontrollers, or power cells), any manufacturer warranties applicable to those specific parts will be passed through to the extent possible.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Requesting Product Service</h2>
            <p>
              To request inspection or service for an AWIE product, email <strong>awielabs@gmail.com</strong> with your Device ID, purchase details, and a description of the issue.
            </p>
            <p className="text-xs text-slate-500">
              Nothing in this policy limits statutory remedies that cannot legally be excluded under applicable consumer laws.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
