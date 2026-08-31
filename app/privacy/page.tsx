'use client';

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">LEGAL POLICY</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 · Last Updated: August 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Information We Collect</h2>
            <p>AWIE may collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Name, Email address, Phone number</li>
              <li>Billing/shipping address</li>
              <li>Account information</li>
              <li>Project information & Student project requirements</li>
              <li>Order information & Payment status/reference information</li>
              <li>Communications with AWIE</li>
              <li>Website usage information and Device/browser details where applicable</li>
            </ul>
            <p>
              We do not need to collect or store your complete card, UPI PIN, or banking credentials for ordinary Razorpay payments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Why We Use Information</h2>
            <p>Information may be used to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Create and manage accounts</li>
              <li>Process orders and manage technology projects</li>
              <li>Communicate with customers and provide technical support</li>
              <li>Process payments and deliver products</li>
              <li>Prevent fraud, misuse, and maintain security</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Payment Information</h2>
            <p>
              Payments may be processed through third-party payment providers such as Razorpay. AWIE may receive transaction reference information necessary to confirm and reconcile payments, but payment-instrument credentials are handled securely by the applicable payment provider.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Sharing Information</h2>
            <p>AWIE may share necessary information with:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Payment processors (e.g. Razorpay)</li>
              <li>Delivery/courier partners</li>
              <li>Hosting/cloud providers</li>
              <li>Technology service providers & Communication providers</li>
              <li>Professional advisers and Government/law-enforcement authorities where legally required</li>
            </ul>
            <p className="font-bold text-slate-900">
              AWIE does not sell personal information as a commercial product.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Security & Retention</h2>
            <p>
              AWIE uses reasonable technical and organizational measures to protect personal information. However, no internet-based system can be guaranteed completely secure.
            </p>
            <p>
              Information is retained only for as long as reasonably necessary for the purposes for which it was collected, contractual requirements, legal obligations, dispute resolution, and legitimate business records.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Your Rights & Requests</h2>
            <p>
              Subject to applicable law, users may contact AWIE at <strong>awielabs@gmail.com</strong> regarding their personal information, including requests concerning access, correction, deletion, or withdrawal of consent where applicable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">7. Cookies & Children's Information</h2>
            <p>
              AWIE may use cookies or similar technologies for login/session functionality, security, analytics, and website performance.
            </p>
            <p>
              AWIE does not knowingly seek to collect personal information from children except where legally permitted and appropriate.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">8. Policy Updates</h2>
            <p>
              This Privacy Policy may be updated when our services, technology, or applicable legal requirements change. Applicable legal frameworks, including India's Digital Personal Data Protection (DPDP) framework and the 2025 Rules, will be reflected as their provisions become applicable under their notified commencement timelines.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
