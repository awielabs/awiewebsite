'use client';

export default function StudentTermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">MENTORSHIP & PROJECTS</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Student Project Terms</h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 · Technical Development & Guidance Guidelines
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Purpose & Mentorship Model</h2>
            <p>
              AWIE provides technical development, guidance, hardware support, firmware assistance, and mentoring for eligible student engineering projects.
            </p>
            <p>Project domains include:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Web and Mobile Software Applications</li>
              <li>IoT Systems & Embedded Hardware</li>
              <li>Robotics, Automation & Sensors</li>
              <li>Custom Electronics & Circuit Prototyping</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Project Value Cap</h2>
            <p>
              Standard student projects are generally limited to a <strong>maximum project value of ₹10,000</strong>, subject to technical scope, component availability, and AWIE review.
            </p>
            <p>
              Projects exceeding this amount will be evaluated separately and require individual commercial approval prior to commitment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Student Responsibilities</h2>
            <p>Students must provide accurate information regarding:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Project functional requirements and hardware specifications</li>
              <li>College or institutional submission deadlines</li>
              <li>Documentation and presentation standards</li>
            </ul>
            <p>
              Modifications or requirement changes requested after project scope approval may incur additional charges.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Academic Responsibility & Disclaimer</h2>
            <p>
              AWIE's program is educational, technical, and advisory. AWIE does <strong>not</strong> guarantee:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Marks, grades, or academic evaluation scores</li>
              <li>That the project made by us will be accepted or approved by your college</li>
              <li>Academic publication or competition victories</li>
            </ul>
            <p>
              Project topic selection is entirely a self-selection process by the student. Any rejection or disapproval of the project by your college or university is solely your responsibility. The student remains individually responsible for understanding, presenting, explaining, and defending their own academic submission before their institution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Intellectual Property & Code</h2>
            <p>
              AWIE's pre-existing software tools, libraries, code components, and technical know-how remain the property of AWIE. Project-specific deliverables and documentation are provided to the student for their academic presentation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Post-Delivery Support</h2>
            <p>
              Student project assistance concludes upon delivery of agreed project components. Subsequent hardware alterations, code refactoring, or feature additions requested after project sign-off will be charged separately.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
