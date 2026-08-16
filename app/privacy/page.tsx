'use client';

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-300">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information Collection</h2>
            <p>
              AWIE collects personal information (name, email address, phone number, project details) provided voluntarily through our contact forms, project request portals, and account registration forms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Use of Information</h2>
            <p>
              The information collected is used exclusively for evaluating project requirements, responding to client inquiries, delivering engineering services, and maintaining customer accounts. We do not sell or rent user data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Data Protection & Security</h2>
            <p>
              We implement industry-standard encryption, relational database security rules, and server-side processing protocols to protect your personal and project information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Contact Us</h2>
            <p>
              For privacy-related inquiries or data removal requests, contact us at contact@awielabs.com.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
