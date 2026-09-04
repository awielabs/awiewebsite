'use client';

export default function StoreTermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">E-COMMERCE TERMS</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">AWIE Store Terms</h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 · Electronics, Components & Hardware Store Rules
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. Scope & Products Sold</h2>
            <p>AWIE Store offers hardware components including:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Microcontrollers (ESP32, Arduino, Raspberry Pi Pico)</li>
              <li>Sensors (Environmental, Motion, Optical, Gas)</li>
              <li>Modules (Relays, Power Chargers, Transceivers)</li>
              <li>Displays (OLED, TFT LCD, LED Matrices)</li>
              <li>Motors & Drivers (Servos, Steppers, DC Gear Motors)</li>
              <li>Power & Battery components (Li-Ion, BMS boards, Converters)</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Product Sourcing</h2>
            <p>
              Components listed on AWIE Store may be sourced from third-party manufacturers, official distributors, or verified online/offline suppliers.
            </p>
            <p className="font-bold text-slate-900">
              AWIE does not represent third-party electronics or components as manufactured by AWIE unless they are genuinely designed and produced by AWIE.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Product Descriptions & Specifications</h2>
            <p>
              Product descriptions, images, and specifications are provided for informational and purchasing purposes. Minor visual variations or component layout revisions may occur where original manufacturers update board designs without altering core functionality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Pricing, Orders & Stock Availability</h2>
            <p>
              Prices shown on the website are subject to market changes. The price applicable to an order is the price confirmed at checkout.
            </p>
            <p>
              If a product becomes unavailable after an order is placed due to stock exhaustion or supplier delay, AWIE reserves the right to cancel the affected order and issue a full refund.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. Tax Compliance</h2>
            <p>
              AWIE displays and collects applicable taxes in accordance with its Udyam Micro Enterprise registration status and Indian tax laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Customer Technical Verification</h2>
            <p>Customers are responsible for verifying technical compatibility prior to ordering, including:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Operating voltage (3.3V vs 5V)</li>
              <li>Current ratings & Power supply limits</li>
              <li>Pinout configurations & Communication protocols (I2C, SPI, UART)</li>
              <li>Physical dimensions and connector compatibility</li>
            </ul>
            <p>
              AWIE is not responsible for damage caused by incorrect wiring, overvoltage, reversed polarity, or improper handling of delicate electronic components.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">7. Returns & Replacement Eligibility</h2>
            <p>
              Returns and replacements for AWIE Store purchases are governed by our <a href="/refund" className="text-[#2563EB] font-bold underline">Refund & Cancellation Policy</a>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">8. Product Sourcing Requests (AWIE Source Bot)</h2>
            <p>
              The AWIE Source Bot lets you submit a sourcing request for components not listed in our catalogue. By submitting a request you agree to the following:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Sourcing requests require an active AWIE account; requests must include a valid contact email and, where provided, an accurate phone/WhatsApp number.</li>
              <li>Reference images attached to a sourcing request are stored in a private storage folder named <span className="font-mono font-bold">sourcing-requests</span> and are <span className="font-bold">automatically deleted within 3 days</span> of review. Do not attach images containing personal data you do not intend to share.</li>
              <li>AWIE typically checks availability and responds to sourcing requests <span className="font-bold">within 7 days</span>. Sourcing timelines for the actual product may vary depending on supplier availability, and quoted prices and delivery dates are estimates until confirmed.</li>
              <li>A sourcing request is not an order confirmation and creates no payment obligation until you accept a quote.</li>
              <li><span className="font-bold text-slate-900">Abuse & Misuse:</span> submitting false, spam, abusive, repeated junk, or malicious requests — or impersonating another person — may lead to immediate rejection of the request and, at AWIE&apos;s sole discretion, permanent removal of the associated account and blocking of future sourcing access.</li>
              <li>You confirm that all information provided in a sourcing request is accurate and that you own or have the right to share any attached reference images.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
