'use client';

export default function ServicesTermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">LEGAL TERMS</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Technology Services Terms</h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 · Client Project Engagements & Software Engineering
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Scope of Technology Services</h2>
            <p>AWIE provides technical engineering services including:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Web application architecture & development</li>
              <li>Mobile application development (iOS & Android)</li>
              <li>Custom software engineering</li>
              <li>AI integration & Cloud workflows</li>
              <li>IoT systems & Embedded firmware development</li>
              <li>PCB prototyping & Electronics engineering</li>
              <li>Automation & System integration</li>
              <li>Software maintenance and technical support</li>
            </ul>
            <p className="text-xs text-slate-500">
              These activities align with AWIE's registered activities as an Udyam Registered Micro Enterprise.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Project Process</h2>
            <p>Standard project workflow follows:</p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-[#2563EB] text-center">
              Enquiry → Requirement Review → Proposal/Quotation → Payment → Development → Testing → Delivery
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Project Scope & Deliverables</h2>
            <p>
              The scope, technical specifications, milestones, deliverables, and timeline are defined exclusively by the accepted quotation or project agreement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Payments & Milestone Billing</h2>
            <p>
              Payments may be structured as advance deposits, milestone payments, or final delivery payments as agreed in the project proposal.
            </p>
            <p>
              Development work proceeds upon receipt of the agreed milestone payments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Requirement Changes & Scope Creep</h2>
            <p>
              Any changes, feature additions, or modifications requested after project scope approval will be evaluated and quoted separately as a change order.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Hosting & Third-Party Expenses</h2>
            <p>
              Unless explicitly included in the accepted quotation, the client is responsible for external costs including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Domain registration & Cloud hosting fees</li>
              <li>Paid API usage & AI service credits (e.g. OpenAI, Anthropic, Google Cloud)</li>
              <li>Database hosting & Third-party software licenses</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">7. Intellectual Property Rights</h2>
            <p>
              AWIE retains full ownership of its pre-existing code, frameworks, libraries, reusable components, development tools, methods, generic technology modules, and technical know-how.
            </p>
            <p>
              Client-specific ownership or licensing of custom-developed project deliverables will be determined by the accepted project agreement or quotation. Where full ownership of custom deliverables is agreed upon, transfer of ownership takes effect only after complete payment of all applicable project fees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">8. Post-Delivery Support</h2>
            <p>
              Post-delivery technical support or bug-fix coverage is provided solely to the extent specified in the project agreement. New feature requests or ongoing maintenance outside the warranty period are treated as separate paid work.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
