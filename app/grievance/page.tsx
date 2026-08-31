'use client';

export default function GrievancePage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">SUPPORT & REDRESSAL</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Grievance Redressal</h1>
          <p className="text-xs text-slate-500 font-medium">
            Customer Support & Escalation Mechanism under Indian Consumer Protection (E-Commerce) Rules
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Grievance Officer & Contact Details</h2>
            <p>
              In accordance with the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020, the details of the Grievance Officer for AWIE are published below:
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2 my-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enterprise Entity</span>
                <span className="text-xs font-mono font-bold text-[#2563EB]">AWIE (Udyam Micro Enterprise)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <p className="text-slate-500 font-medium">Designation:</p>
                  <p className="font-bold text-slate-900">Grievance & Compliance Officer</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Official Email:</p>
                  <p className="font-mono font-bold text-[#2563EB]">awielabs@gmail.com</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Registration Number:</p>
                  <p className="font-mono text-slate-800">UDYAM-MH-33-0820594</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Response Window:</p>
                  <p className="text-slate-800 font-medium">Acknowledgement within 48 hours</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 text-xs">
                <p className="text-slate-500 font-medium">Registered Office Address:</p>
                <p className="font-medium text-slate-800">
                  AWIE, NL-1 B, Room No. 41/7, LIG, Sector-10, Nerul West, Navi Mumbai, Maharashtra – 400706, India
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. How to Submit a Grievance</h2>
            <p>
              For questions, complaints, order issues, service concerns, or policy-related matters, customers can send an email to:
            </p>
            <p className="font-mono font-bold text-base text-[#2563EB]">
              awielabs@gmail.com
            </p>
            <p className="font-bold text-slate-900 text-xs">
              Subject Line Format: <span className="font-mono text-[#2563EB]">Grievance / Support – [Your Order ID or Project ID]</span>
            </p>
            <p>Please include the following details to help us investigate and resolve your concern quickly:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Full Name & Contact Email/Phone</li>
              <li>Order ID, Invoice Number, or Project Reference</li>
              <li>Detailed description of the grievance or technical issue</li>
              <li>Relevant unboxing video, photos, or documents where applicable</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Redressal Mechanism & Timelines</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Acknowledgement:</strong> All grievances received will be acknowledged within <strong>48 hours</strong> with a unique tracking ticket reference.</li>
              <li><strong>Resolution Target:</strong> AWIE endeavours to resolve all consumer complaints and grievances within <strong>1 month (30 days)</strong> from the date of receipt.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
