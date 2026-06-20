import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

const queryTypes = [
  "How to return a damaged product",
  "How to contact a seller",
  "Delivery delay support",
  "Payment issues",
  "Handmade customization queries"
];

export default function Contact() {
  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] bg-[#fff0df] p-8 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-500">Support</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">Contact Akriti</h1>
          <p className="mt-4 leading-8 text-slate-600">Need help with orders, sellers, payments, or handmade customization requests? Our support team is here to assist you.</p>
          <div className="mt-6 grid gap-3">
            <p className="flex items-center gap-3 font-bold"><FiMail /> hello@akriti.com</p>
            <p className="flex items-center gap-3 font-bold"><FiPhone /> +91 92268 72234</p>
            <p className="flex items-center gap-3 font-bold"><FiPhone /> +91 88560 52873</p>
          </div>
          <div className="mt-6 flex gap-3">
            {[FiMail, FiPhone, FaInstagram].map((Icon, index) => <a title="Contact icon" key={index} href="#" className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:-translate-y-1"><Icon /></a>)}
          </div>
        </div>
        <form className="glass-card grid gap-4 rounded-[30px] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input required placeholder="Name" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
            <input required placeholder="Email" type="email" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
            <input required placeholder="Mobile number" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
            <select required className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none">
              <option value="">Select query type</option>
              {queryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </div>
          <textarea required placeholder="Describe your query" className="min-h-36 rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
          <button className="pill-button bg-ink text-white">Send message</button>
        </form>
      </section>
    </PageTransition>
  );
}
