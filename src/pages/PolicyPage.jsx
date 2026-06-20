import { Navigate, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const policies = {
  "returns-exchange": {
    title: "Return & Exchange Policy",
    intro: "At Akriti Marketplace, we strive to ensure that every customer is satisfied with their purchase. Since many products are handmade and crafted by individual sellers, our return and exchange policy is designed to balance customer satisfaction with seller protection.",
    sections: [
      { title: "1. Eligibility for Returns", body: ["Customers may request a return if:"], bullets: ["The product received is damaged, defective, or broken.", "The product delivered is different from the item ordered.", "Essential parts or accessories are missing.", "The item received is significantly different from the product description."], after: "To initiate a return, customers must raise a request within 7 days of delivery." },
      { title: "2. Non-Returnable Items", body: ["The following items are generally not eligible for return:"], bullets: ["Customized or personalized products.", "Handmade products created specifically on customer request.", "Digital products or downloadable content.", "Products damaged due to misuse, improper handling, or normal wear and tear."] },
      { title: "3. Exchange Policy", body: ["Customers may request an exchange within 7 days of delivery if:"], bullets: ["The wrong product was delivered.", "The product arrived damaged or defective.", "The received item differs substantially from the listing."], after: "Exchanges are subject to seller approval and product availability." },
      { title: "4. Return Process", body: ["To request a return or exchange:"], ordered: ["Log in to your Akriti account.", "Navigate to \"My Orders.\"", "Select the relevant order.", "Click \"Request Return\" or \"Request Exchange.\"", "Upload clear photos showing the issue.", "Submit the request."], after: "Our support team will review the request and respond within 2-5 business days." },
      { title: "5. Refund Policy", body: ["Once the returned item is received and inspected:"], bullets: ["Approved refunds will be processed to the original payment method.", "Refunds typically reflect within 5-10 business days, depending on the payment provider.", "Shipping charges may not be refundable unless the return is due to seller error or a defective product."] },
      { title: "6. Seller Responsibility", body: ["Sellers are responsible for:"], bullets: ["Providing accurate product descriptions and images.", "Packaging products securely.", "Responding promptly to return and exchange requests."], after: "Repeated policy violations may result in suspension of seller privileges." },
      { title: "7. Cancellation Policy", body: ["Orders may be cancelled before shipment. Once an order has been shipped, cancellation may not be possible and the return process must be followed."] },
      { title: "8. Contact Support", body: ["For assistance regarding returns, exchanges, or refunds, please contact:", "Email: support@akriti.com", "Phone: +91 9226872234 / +91 8856052873", "Our support team will be happy to assist you."] }
    ]
  },
  "payment-issues": {
    title: "Payment Issues Policy",
    intro: "At Akriti Marketplace, we aim to provide a secure and seamless payment experience. If you encounter any payment-related issues, please review the following guidelines.",
    sections: [
      { title: "1. Payment Failure", body: ["A payment may fail due to:"], bullets: ["Insufficient account balance.", "Expired or invalid card details.", "Network connectivity issues.", "Bank server downtime.", "Incorrect OTP or authentication failure.", "Payment gateway interruptions."], after: "If your payment fails, please verify your payment details and try again after some time." },
      { title: "2. Amount Debited but Order Not Confirmed", body: ["In some cases, the payment amount may be deducted from your account, but the order is not successfully placed.", "What happens next?"], bullets: ["If the transaction is unsuccessful, the deducted amount is usually reversed automatically by your bank.", "Refund timelines depend on the payment method and banking partner.", "Most refunds are processed within 5-7 business days, though some banks may take longer."], after: "If the refund is not received within the expected timeframe, please contact your bank first and then reach out to Akriti Support." },
      { title: "3. Duplicate Payments", body: ["If you accidentally make multiple payments for the same order:"], bullets: ["Contact Akriti Support immediately.", "Provide the order ID and payment transaction details.", "After verification, any excess payment received will be refunded to the original payment source."] },
      { title: "4. Payment Verification Delays", body: ["Occasionally, payment verification may take longer than usual due to:"], bullets: ["Bank processing delays.", "High transaction volumes.", "Payment gateway maintenance."], after: "Customers are advised not to place multiple orders for the same product until the payment status is confirmed." },
      { title: "5. Refund Processing", body: ["Approved refunds are processed to the original payment method used during checkout.", "Estimated Refund Timelines"], table: [["Payment Method", "Refund Timeline"], ["UPI", "2-5 Business Days"], ["Debit Card", "5-7 Business Days"], ["Credit Card", "5-10 Business Days"], ["Net Banking", "5-7 Business Days"], ["Wallets", "2-5 Business Days"]], after: "Actual timelines may vary depending on your bank or payment provider." },
      { title: "6. Secure Payments", body: ["Akriti Marketplace uses trusted payment gateways and industry-standard security measures to protect customer transactions.", "Customers are advised:"], bullets: ["Never share OTPs, CVV numbers, or banking passwords.", "Verify payment details before completing transactions.", "Use secure and trusted internet connections while making payments."] },
      { title: "7. Fraudulent Transactions", body: ["If you notice any unauthorized transaction related to your Akriti account:"], ordered: ["Immediately contact your bank.", "Report the issue to Akriti Support.", "Provide transaction details and supporting documents if requested."], after: "Akriti reserves the right to investigate suspicious transactions and may temporarily hold orders for verification purposes." },
      { title: "8. Contact Support", body: ["For payment-related concerns, please contact:", "Email: support@akriti.com", "Phone: +91 9226872234", "Alternate Contact: +91 8856052873", "Our support team will assist you as quickly as possible."] }
    ]
  },
  "delivery-delay": {
    title: "Delivery Delay Policy",
    intro: "At Akriti Marketplace, we work closely with independent sellers and logistics partners to ensure timely delivery of your orders. However, delays may occasionally occur due to factors beyond our control.",
    sections: [
      { title: "1. Estimated Delivery Time", body: ["The expected delivery date shown at checkout and in your order details is an estimate based on:"], bullets: ["Seller processing time", "Product availability", "Shipping destination", "Courier partner performance"], after: "For handmade and made-to-order products, additional preparation time may apply." },
      { title: "2. Reasons for Delivery Delays", body: ["Orders may be delayed due to:"], bullets: ["High order volumes during sales or festive seasons", "Seller processing delays for handmade/custom items", "Weather conditions, natural disasters, or transportation disruptions", "Courier network issues or regional restrictions", "Incomplete or incorrect delivery address details", "Failed delivery attempts due to customer unavailability"] },
      { title: "3. Tracking Your Order", body: ["Once your order is shipped, you will receive a tracking ID and courier details via email, SMS, or your Akriti account.", "You can track your order by:"], bullets: ["Logging into your Akriti account", "Going to My Orders", "Selecting the relevant order and clicking Track Order"] },
      { title: "4. What Happens If My Order Is Delayed?", body: ["If your order is delayed beyond the estimated delivery date:"], bullets: ["Our system will continue to monitor the shipment status.", "You may receive updated delivery estimates from the courier partner.", "If the delay becomes significant, our support team may contact the seller or courier for an update."], after: "Please note that estimated delivery dates are not guaranteed delivery commitments." },
      { title: "5. Cancellation Due to Delay", body: ["You may request cancellation if:"], bullets: ["The order has not yet been shipped, or", "The delivery delay is substantial and the order is no longer useful to you."], after: "Cancellation requests are reviewed based on the current shipment status. Once an order is out for delivery, cancellation may not be possible." },
      { title: "6. Refunds for Delayed Orders", body: ["If an order is cancelled due to a confirmed delivery delay, refunds will be processed to the original payment method.", "Typical refund timelines:"], table: [["Payment Method", "Refund Timeline"], ["UPI / Wallet", "2-5 Business Days"], ["Debit Card / Net Banking", "5-7 Business Days"], ["Credit Card", "5-10 Business Days"]] },
      { title: "7. Seller Responsibility", body: ["Sellers are expected to:"], bullets: ["Dispatch orders within the promised handling time", "Provide accurate inventory availability", "Respond promptly to delivery-related queries"], after: "Repeated delays or failure to fulfill orders may lead to seller performance actions by Akriti Marketplace." },
      { title: "8. Customer Responsibility", body: ["To help avoid delays, customers should:"], bullets: ["Provide a complete and accurate delivery address", "Keep their phone number reachable for courier calls", "Accept deliveries during courier attempts or arrange a suitable time"] },
      { title: "9. Contact Support", body: ["If your order is significantly delayed or you need assistance, please contact Akriti Support:", "Email: support@akriti.com", "Phone: +91 9226872234 / +91 8856052873", "We will do our best to help resolve the issue as quickly as possible."] }
    ]
  },
  "customization-queries": {
    title: "Customization Queries Policy",
    intro: "At Akriti Marketplace, many products are handcrafted and can be customized according to customer preferences. This policy explains how customization requests are handled between customers and sellers.",
    sections: [
      { title: "1. Availability of Customization", body: ["Customization options vary from seller to seller and product to product.", "Customizations may include:"], bullets: ["Names, initials, or text engraving", "Color variations", "Size modifications", "Personalized designs", "Gift messages", "Handmade design adjustments", "Packaging preferences"], after: "Availability of customization is clearly mentioned on the product page wherever applicable." },
      { title: "2. Submitting a Customization Request", body: ["Customers can submit customization requirements:"], bullets: ["Through the customization fields provided on the product page.", "During checkout if customization options are available.", "By contacting the seller through Akriti Marketplace before placing an order."], after: "Please ensure that all customization details are accurate before confirming your order." },
      { title: "3. Seller Approval", body: ["Some customization requests may require seller confirmation.", "The seller may:"], bullets: ["Accept the request as submitted.", "Request additional information or clarification.", "Suggest alternative customization options.", "Decline requests that cannot be fulfilled."], after: "Orders requiring customization may begin production only after confirmation from the seller." },
      { title: "4. Production and Delivery Time", body: ["Customized and personalized products often require additional preparation time.", "As a result:"], bullets: ["Processing times may be longer than standard products.", "Delivery estimates may be extended.", "Customers will be informed of any significant delays."], after: "The estimated delivery date displayed at checkout may vary depending on the complexity of the customization." },
      { title: "5. Changes After Order Placement", body: ["Once a customized product enters production, modification requests may not be possible.", "Customers are encouraged to carefully review:"], bullets: ["Names and spellings", "Design instructions", "Color selections", "Sizes and measurements", "Personalization details"], after: "Akriti Marketplace and sellers are not responsible for errors caused by incorrect information submitted by customers." },
      { title: "6. Cancellation of Customized Orders", body: ["Customized or personalized orders may not be eligible for cancellation once production has started.", "Cancellation requests are subject to:"], bullets: ["Seller approval", "Production status", "Nature of customization"], after: "If production has not yet begun, cancellation may be permitted according to the seller's policy." },
      { title: "7. Returns and Refunds", body: ["Because customized products are made specifically for individual customers:", "Generally Not Eligible for Return", "Customized items are typically non-returnable and non-refundable unless:"], bullets: ["The wrong product is delivered.", "The product arrives damaged.", "The customization differs significantly from the approved request.", "The product contains manufacturing defects."], after: "Supporting photographs or evidence may be required during review." },
      { title: "8. Quality Expectations", body: ["As many products are handmade:"], bullets: ["Minor variations in color, texture, size, or finish may occur.", "Slight differences are considered part of the handmade process and do not qualify as defects."], after: "Customers are encouraged to review product images and descriptions carefully before ordering." },
      { title: "9. Communication Guidelines", body: ["For a smooth customization experience:"], bullets: ["Provide complete and accurate instructions.", "Respond promptly to seller queries.", "Avoid submitting offensive, illegal, or copyrighted content for customization."], after: "Akriti Marketplace reserves the right to reject customization requests that violate applicable laws or platform policies." },
      { title: "10. Contact Support", body: ["For customization-related assistance, please contact:", "Email: support@akriti.com", "Phone: +91 9226872234", "Alternate Contact: +91 8856052873", "Our support team will assist in coordinating with sellers whenever possible.", "Note: Customized products are handcrafted based on individual customer requirements. Please review all customization details carefully before placing your order, as changes may not be possible once production begins."] }
    ]
  }
};

export default function PolicyPage() {
  const { slug } = useParams();
  const policy = policies[slug];

  if (!policy) return <Navigate to="/" replace />;

  return (
    <PageTransition>
      <section className="container-soft py-12">
        <div className="glass-card rounded-[34px] p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-wide text-accent">Akriti Policies</p>
          <h1 className="heading-font mt-3 text-4xl font-black text-primary sm:text-5xl">{policy.title}</h1>
          <p className="mt-5 max-w-4xl leading-8 text-slate-600">{policy.intro}</p>
          <div className="mt-8 grid gap-6">
            {policy.sections.map((section) => (
              <article key={section.title} className="rounded-[24px] bg-white/70 p-5">
                <h2 className="text-2xl font-black text-primary">{section.title}</h2>
                {section.body?.map((paragraph) => <p key={paragraph} className="mt-3 leading-7 text-slate-600">{paragraph}</p>)}
                {section.bullets && <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.ordered && <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-600">{section.ordered.map((item) => <li key={item}>{item}</li>)}</ol>}
                {section.table && (
                  <div className="mt-4 overflow-x-auto rounded-2xl border border-primary/10">
                    <table className="w-full min-w-[420px] border-collapse bg-white text-left text-sm">
                      <tbody>
                        {section.table.map((row, index) => (
                          <tr key={row.join("-")} className={index === 0 ? "bg-primary text-white" : "border-t border-primary/10"}>
                            {row.map((cell) => <td key={cell} className="px-4 py-3 font-bold">{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.after && <p className="mt-3 leading-7 text-slate-600">{section.after}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
