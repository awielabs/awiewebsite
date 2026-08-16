'use client';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-300">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the AWIE website, services, hardware products, or mentorship programs, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Scope of Engineering Services</h2>
            <p>
              AWIE provides custom software development, web applications, mobile apps, IoT platforms, custom electronics design, and student project mentorship. Specific deliverables, budgets, and timelines are specified in formal project proposals.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Academic Integrity & Student Mentorship</h2>
            <p>
              Our student mentorship program is strictly educational and advisory. Students remain responsible for understanding, coding, and defending their own academic submissions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Intellectual Property</h2>
            <p>
              Custom software and hardware developed under client contract will have ownership transfer terms detailed in individual project agreements. In-house AWIE products remain intellectual property of AWIE.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
