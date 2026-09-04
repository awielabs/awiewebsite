'use client';

import Link from 'next/link';

export default function SourcerTermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">LEGAL POLICY</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">AWIE Sourcer Bot — Terms &amp; Conditions</h1>
          <p className="text-xs text-slate-500 font-medium">
            Last Updated: September 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">

          {/* 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">1. About AWIE Sourcer Bot</h2>
            <p>
              AWIE Sourcer Bot is a product-sourcing assistance service provided by AWIE. It allows users to submit details of products, components, electronic parts, modules, sensors, boards, batteries, or other items that may not currently be available in the AWIE Store.
            </p>
            <p>
              The service helps AWIE determine whether the requested item can reasonably be sourced through its available supplier network.
            </p>
          </section>

          {/* 2 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">2. Product Request</h2>
            <p>Users may provide:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Product or component name</li>
              <li>Reference image</li>
              <li>Model/SKU/part number</li>
              <li>Required quantity</li>
              <li>Preferred brand</li>
              <li>Technical specifications</li>
              <li>Additional requirements</li>
            </ul>
            <p>
              Users are responsible for providing accurate and sufficient information about the requested product.
            </p>
          </section>

          {/* 3 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">3. Sourcing Check</h2>
            <p>
              Submitting a request does not constitute an order or guarantee of supply.
            </p>
            <p>
              AWIE may check its suppliers and available sources to determine whether the requested item can be sourced.
            </p>
            <p>
              A request may be marked with one of the following statuses, which will be communicated to the user by email:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><span className="text-emerald-600 font-bold">🟢 Sourceable</span> — AWIE can potentially obtain the requested item.</li>
              <li><span className="text-amber-500 font-bold">🟡 Checking</span> — AWIE is still checking availability or supplier information.</li>
              <li><span className="text-red-600 font-bold">🔴 Not Sourceable</span> — AWIE currently cannot reasonably source the requested item.</li>
            </ul>
            <p>
              Availability can change depending on supplier stock, manufacturer availability, market conditions and other circumstances.
            </p>
          </section>

          {/* 4 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">4. Price &amp; Delivery</h2>
            <p>If a product can be sourced, AWIE may provide:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Product price</li>
              <li>Applicable delivery/shipping charges</li>
              <li>Estimated sourcing time</li>
              <li>Estimated delivery time</li>
              <li>Available quantity</li>
              <li>Relevant product specifications</li>
            </ul>
            <p>
              Any price or delivery estimate provided during the sourcing stage is not a final order confirmation unless explicitly confirmed by AWIE.
            </p>
            <p>
              The final price may change before the order is placed because of supplier pricing, availability, shipping charges, taxes or other applicable costs.
            </p>
          </section>

          {/* 5 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">5. No Obligation to Purchase</h2>
            <p>
              A user is not required to purchase a product simply because AWIE has successfully sourced or identified it.
            </p>
            <p>
              Likewise, AWIE is not required to purchase or reserve an item from a supplier solely because a user submitted a request.
            </p>
          </section>

          {/* 6 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">6. Customer Confirmation</h2>
            <p>
              For a sourceable product, AWIE may provide a final quotation or order option.
            </p>
            <p>The customer may proceed only after reviewing and accepting the:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Product</li>
              <li>Specification/variant</li>
              <li>Quantity</li>
              <li>Price</li>
              <li>Shipping charges</li>
              <li>Estimated delivery</li>
              <li>Applicable terms</li>
            </ul>
            <p>
              Once the customer confirms and payment is successfully completed, the request may be converted into a regular AWIE Store order.
            </p>
          </section>

          {/* 7 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">7. Product Accuracy</h2>
            <p>
              AWIE will make reasonable efforts to provide accurate information obtained from suppliers.
            </p>
            <p>
              However, supplier information, product images, specifications, packaging, colour, revision, branding or availability may differ between suppliers or batches.
            </p>
            <p>
              Where an exact model or specification is important, customers should confirm it with AWIE before placing the order.
            </p>
          </section>

          {/* 8 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">8. Restricted or Unavailable Products</h2>
            <p>AWIE may refuse or decline requests for products that:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Cannot legally be sold or supplied</li>
              <li>Require licences, permissions or special handling that AWIE cannot provide</li>
              <li>Are prohibited or restricted</li>
              <li>Present unreasonable safety risks</li>
              <li>Are unavailable through AWIE&apos;s suppliers</li>
              <li>Cannot be reliably verified</li>
              <li>Otherwise fall outside AWIE&apos;s sourcing capabilities</li>
            </ul>
            <p>
              AWIE reserves the right to decline a sourcing request without being required to source the item.
            </p>
          </section>

          {/* 9 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">9. Cancellation</h2>
            <p>
              A sourcing request may generally be cancelled before the customer confirms an order or AWIE purchases the item specifically for that customer.
            </p>
            <p>
              Once an item has been specially ordered, purchased or dispatched for a customer, cancellation and refund will be subject to the applicable <a href="/refund" className="text-[#2563EB] font-bold underline">AWIE Store Refund &amp; Cancellation Policy</a> and the specific order terms.
            </p>
          </section>

          {/* 10 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">10. Payment</h2>
            <p>
              AWIE Sourcer Bot does not itself guarantee a sale.
            </p>
            <p>
              Payment should only be made through the official payment method provided by AWIE after the product, price and order details have been confirmed.
            </p>
            <p>
              Users should not send payment to any third party claiming to represent AWIE unless the payment method has been officially provided by AWIE.
            </p>
          </section>

          {/* 11 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">11. Images &amp; Uploaded Information</h2>
            <p>
              Users may upload product photographs, links and specifications for identification or sourcing purposes. Uploaded reference images are stored in a private storage folder named <span className="font-mono font-bold">sourcing-requests</span> and are automatically deleted within 3 days.
            </p>
            <p>Users should not upload:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Passwords</li>
              <li>Payment information</li>
              <li>Government ID documents</li>
              <li>Confidential business information</li>
              <li>Personal information belonging to another person without permission</li>
            </ul>
            <p>
              Uploaded information may be used by AWIE to evaluate and process the sourcing request in accordance with the <a href="/privacy" className="text-[#2563EB] font-bold underline">AWIE Privacy Policy</a>.
            </p>
          </section>

          {/* 12 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">12. Third-Party Suppliers</h2>
            <p>
              AWIE may obtain requested products from third-party suppliers.
            </p>
            <p>
              The supplier may differ from the manufacturer or seller originally shown in a customer&apos;s reference image or link.
            </p>
            <p>
              Where applicable, the final product details, warranty, return conditions and service arrangements will be communicated before purchase or as part of the order.
            </p>
          </section>

          {/* 13 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">13. Estimated Timelines</h2>
            <p>
              Any sourcing or delivery period provided by AWIE is an estimate, not an absolute guarantee.
            </p>
            <p>
              Delays may occur because of supplier availability, courier delays, logistics issues, holidays, customs, manufacturing delays or other circumstances outside AWIE&apos;s reasonable control.
            </p>
          </section>

          {/* 14 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">14. Privacy</h2>
            <p>
              Information submitted through AWIE Sourcer Bot will be handled according to the <a href="/privacy" className="text-[#2563EB] font-bold underline">AWIE Privacy Policy</a>.
            </p>
            <p>
              Only information reasonably required to process the sourcing request should be submitted.
            </p>
          </section>

          {/* 15 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">15. Grievance &amp; Support</h2>
            <p>
              For questions, complaints or issues relating to a sourcing request, users may contact AWIE through the official contact details provided on the <a href="/contact" className="text-[#2563EB] font-bold underline">AWIE website</a>.
            </p>
          </section>

          {/* 16 */}
          <section className="space-y-2">
            <h2 className="text-base font-black text-slate-900 border-l-4 border-[#2563EB] pl-3">16. Acceptance</h2>
            <p>
              By submitting a request through AWIE Sourcer Bot, the user confirms that they have read and understood these terms and agree to the applicable AWIE policies.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="font-bold text-slate-900">
                Important: Submitting a request means &ldquo;Please check whether you can source this.&rdquo; It does not mean &ldquo;I have purchased this product.&rdquo;
              </p>
            </div>
          </section>

          {/* Back link */}
          <div className="pt-2">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs transition-all shadow-lg shadow-[#2563EB]/25"
            >
              <span>← Back to AWIE Store</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
