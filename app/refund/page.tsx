'use client';

export default function RefundPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Refund & Cancellation Policy</h1>
          <p className="text-xs text-slate-400">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-300">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Custom Engineering Projects</h2>
            <p>
              Custom engineering projects (Web, Mobile, IoT, Electronics) follow milestone-based development. Refunds for custom projects are evaluated based on unfulfilled milestones prior to deliverable approval.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Hardware Products & GEM Buddy</h2>
            <p>
              Hardware products purchased from AWIE carry a 7-day return policy for manufacturing defects. Returned units must include all original accessories, packaging, and microcontrollers intact.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Student Mentorship Services</h2>
            <p>
              Mentorship sessions cancelled at least 24 hours prior to scheduled time qualify for rescheduling or full refund. Completed mentorship sessions are non-refundable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Refund Process</h2>
            <p>
              Approved refunds are processed to the original payment method within 5-7 business days. Contact support at contact@awielabs.com for assistance.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
