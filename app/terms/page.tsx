'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">LEGAL POLICY</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Terms & Conditions</h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 · Last Updated: August 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          {/* 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. About AWIE</h2>
            <p>
              AWIE is a proprietary enterprise operating as a technology and electronics business. AWIE provides technology development services, student project development and technical support, AWIE-developed products, and electronics/components through AWIE Store.
            </p>
            <p>
              AWIE is registered under the Udyam Registration framework as a Micro Enterprise.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1 my-2">
              <p><strong>Enterprise Name:</strong> AWIE</p>
              <p><strong>Udyam Registration Number:</strong> UDYAM-MH-33-0820594</p>
              <p><strong>Official Email:</strong> awielabs@gmail.com</p>
            </div>
          </section>

          {/* 2 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Acceptance</h2>
            <p>
              By accessing or using the AWIE website, creating an account, submitting an enquiry, purchasing a product, or engaging AWIE for services, you agree to these Terms and the policies linked from this website.
            </p>
            <p>
              If you do not agree, please do not use the relevant service.
            </p>
          </section>

          {/* 3 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. AWIE Services</h2>
            <p>
              AWIE may provide:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Web development</li>
              <li>Mobile application development</li>
              <li>Software development</li>
              <li>AI integration</li>
              <li>IoT development</li>
              <li>Embedded systems</li>
              <li>Electronics development & PCB prototyping</li>
              <li>Automation & System integration</li>
              <li>Software support and maintenance</li>
              <li>Technical consulting</li>
              <li>Student project development and support</li>
            </ul>
            <p>
              The actual scope, price, timeline and deliverables are determined by the applicable quotation, proposal, project agreement or order.
            </p>
          </section>

          {/* 4 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Project Enquiries</h2>
            <p>
              Submitting a project enquiry does not automatically create a contract or guarantee that AWIE will accept the project. AWIE may review requirements, technical feasibility, budget, resources, timeline, complexity, and availability.
            </p>
            <p>
              A project becomes binding only after the applicable commercial terms are accepted and any required payment is received.
            </p>
          </section>

          {/* 5 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Pricing</h2>
            <p>
              Prices shown on the website may change without prior notice unless a price has already been confirmed in an accepted quotation, order or agreement. Additional work outside the agreed scope may result in additional charges.
            </p>
          </section>

          {/* 6 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Payments</h2>
            <p>
              Payments may be made through the payment methods made available by AWIE, including third-party payment processors such as Razorpay.
            </p>
            <p>
              AWIE does not store customers' complete card, UPI, banking or payment-instrument credentials on its own systems. Payment processing is subject to the terms and privacy policies of the applicable payment provider.
            </p>
          </section>

          {/* 7 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">7. Intellectual Property</h2>
            <p>
              Unless otherwise agreed in writing, AWIE retains ownership of AWIE's pre-existing software, frameworks, libraries, reusable components, templates, tools, internal systems, development methods, technical know-how, generic modules, pre-existing designs, and AWIE branding.
            </p>
            <p>
              Client-specific deliverables and ownership/licensing arrangements will be governed by the applicable quotation, project agreement or written confirmation. Where a project specifically provides for transfer of ownership of custom-developed deliverables, such transfer will generally take effect only after full payment of the applicable project fees.
            </p>
            <p>
              Third-party software, APIs, libraries, fonts, datasets, platforms and other components remain subject to their respective licenses and terms.
            </p>
          </section>

          {/* 8 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">8. Client Materials</h2>
            <p>
              The client remains responsible for ensuring that any content, images, data, trademarks, documents, code or other materials supplied to AWIE may legally be used. The client grants AWIE the permission necessary to use those materials for performing the agreed services.
            </p>
          </section>

          {/* 9 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">9. Confidentiality</h2>
            <p>
              AWIE will take reasonable measures to protect confidential information received from clients. Confidential information does not include information that is publicly available, was already lawfully known, is independently developed, is lawfully received from another source, or must be disclosed by law or lawful authority.
            </p>
          </section>

          {/* 10 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">10. Changes to Projects</h2>
            <p>
              Changes to requirements after approval may affect cost, timeline, deliverables, and technical implementation. Additional work may be quoted separately.
            </p>
          </section>

          {/* 11 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">11. Delivery and Acceptance</h2>
            <p>
              Deliverables will be provided according to the agreed project scope and delivery arrangement. The client is responsible for reviewing delivered work and reporting material issues within a reasonable period.
            </p>
          </section>

          {/* 12 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">12. Third-Party Services</h2>
            <p>
              AWIE may use third-party services such as cloud hosting, payment gateways, APIs, AI services, software libraries, domain providers, and communication services. Third-party services are subject to their own terms, availability and pricing.
            </p>
          </section>

          {/* 13, 14, 15 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">13. Student Projects, Products & Store Policies</h2>
            <p>
              Student projects are governed additionally by the <Link href="/student-terms" className="text-[#2563EB] font-bold underline">Student Project Terms</Link>.
            </p>
            <p>
              Products developed or branded by AWIE are governed by the applicable product page and <Link href="/repair-policy" className="text-[#2563EB] font-bold underline">Product Service & Repair Policy</Link>.
            </p>
            <p>
              Third-party electronics/components sold through AWIE Store are governed by the <Link href="/store-terms" className="text-[#2563EB] font-bold underline">AWIE Store Terms</Link> and applicable product-specific conditions.
            </p>
          </section>

          {/* 16 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">14. Account Credentials & Security</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their account credentials. Users must provide accurate information and must not misuse another person's account. AWIE may suspend or terminate accounts where necessary for security, fraud prevention, legal compliance or violation of these Terms.
            </p>
          </section>

          {/* 17 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">15. Website Use</h2>
            <p>
              You must not attempt unauthorized access, introduce malicious software, scrape or abuse the website, interfere with website operation, misrepresent your identity, or use AWIE systems for unlawful activity.
            </p>
          </section>

          {/* 18, 19 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">16. Disclaimer & Limitation of Liability</h2>
            <p>
              AWIE makes reasonable efforts to provide accurate information, but website information may contain errors, omissions or changes. Technical services and products are subject to feasibility, availability and applicable third-party dependencies.
            </p>
            <p>
              To the extent permitted by applicable law, AWIE will not be responsible for indirect, incidental, special or consequential losses arising from use of the website, products or services. Nothing in these Terms excludes liability that cannot legally be excluded.
            </p>
          </section>

          {/* 20, 21 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">17. Governing Law & Updates</h2>
            <p>
              These Terms are governed by the laws applicable in India. AWIE may update these Terms from time to time. The latest version published on the website will apply to future use, subject to applicable law and any contractual rights already established.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
