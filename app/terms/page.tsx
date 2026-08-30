'use client';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">LEGAL</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Terms & Conditions</h1>
          <p className="text-xs text-slate-500 font-medium">Last updated: August 2026 · Applicable to all AWIE services and products</p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          {/* 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the AWIE website (<strong>awie.in</strong>), AWIE Store, engineering services, hardware products, or student mentorship programs, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to any of these terms, please discontinue use of our platform immediately.
            </p>
          </section>

          {/* 2 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. About AWIE</h2>
            <p>
              AWIE is an engineering studio providing software development, web applications, mobile applications, IoT systems, custom electronics design, PCB development, and student project mentorship. AWIE also operates an online electronics component store at <strong>awie.in/store</strong>.
            </p>
          </section>

          {/* 3 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Store & Product Orders</h2>
            <p>
              All products listed on the AWIE Store are sourced, tested, and dispatched directly by AWIE. Orders placed through the store are subject to stock availability. AWIE reserves the right to cancel or modify any order in the event of stock unavailability, pricing errors, or verification failure.
            </p>
            <p>
              All prices displayed are inclusive of applicable GST unless otherwise stated. Shipping charges, if any, will be communicated during order confirmation. Delivery timelines are estimates and may vary based on courier partners and location.
            </p>
          </section>

          {/* 4 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Payments</h2>
            <p>
              AWIE processes payments through <strong>Razorpay</strong>, a PCI DSS–compliant payment gateway. Accepted payment methods include UPI, credit/debit cards, net banking, and wallets. AWIE does not store any card or financial credentials. All payment data is handled securely by Razorpay.
            </p>
            <p>
              In the current pre-launch phase, certain orders may be fulfilled through manual bank transfer or UPI, communicated directly via WhatsApp or email.
            </p>
          </section>

          {/* 5 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Refunds & Replacements</h2>
            <p>
              AWIE offers a <strong>7-day replacement policy</strong> for defective or damaged components. To initiate a replacement, contact us at <strong>awielabs@gmail.com</strong> within 7 days of delivery with your order ID and photos of the defective item.
            </p>
            <p>
              Refunds will be processed to the original payment method within 5–7 business days after replacement eligibility is confirmed. Components that have been physically damaged, modified, or misused are not eligible for refund or replacement.
            </p>
          </section>

          {/* 6 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Engineering Services</h2>
            <p>
              All custom engineering project engagements — including software, hardware, IoT, and PCB development — are governed by individual project agreements issued by AWIE. Timelines, deliverables, payment milestones, and intellectual property terms will be defined per project.
            </p>
            <p>
              AWIE is not liable for project delays caused by client unavailability, incomplete requirements, or third-party infrastructure failures beyond AWIE's control.
            </p>
          </section>

          {/* 7 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">7. Intellectual Property</h2>
            <p>
              All AWIE-owned products, frameworks, source code, firmware, designs, and brand assets (including AWIE, GEM Buddy) remain the exclusive intellectual property of AWIE and may not be reproduced, resold, or reverse-engineered without prior written consent.
            </p>
            <p>
              For client-contracted projects, ownership transfer of deliverables will be specified in the individual project agreement.
            </p>
          </section>

          {/* 8 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">8. Student Mentorship</h2>
            <p>
              AWIE's student engineering support program is strictly educational and advisory in nature. Students remain individually responsible for understanding, implementing, testing, and defending their own academic work. AWIE does not submit, upload, or directly participate in academic assessments on behalf of students.
            </p>
          </section>

          {/* 9 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">9. Privacy & Data</h2>
            <p>
              AWIE collects only the minimum information required to process orders and enquiries — including name, email, phone number, and shipping address. This information is stored securely and never shared with third parties for marketing purposes. For details, refer to our <a href="/privacy" className="text-[#2563EB] font-bold underline underline-offset-2">Privacy Policy</a>.
            </p>
          </section>

          {/* 10 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">10. Limitation of Liability</h2>
            <p>
              AWIE shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products, services, or website. AWIE's maximum liability in any claim is limited to the value of the transaction in question.
            </p>
          </section>

          {/* 11 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">11. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts located in Tamil Nadu, India.
            </p>
          </section>

          {/* 12 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">12. Contact</h2>
            <p>
              For any questions regarding these Terms & Conditions, orders, or services, please reach out to us at:
            </p>
            <div className="mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium space-y-1">
              <p><strong>AWIE</strong></p>
              <p>Email: <a href="mailto:awielabs@gmail.com" className="text-[#2563EB] font-bold">awielabs@gmail.com</a></p>
              <p>Website: <a href="https://awie.in" className="text-[#2563EB] font-bold">awie.in</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
