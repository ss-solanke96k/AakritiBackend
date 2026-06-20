export default function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      {eyebrow && <p className="text-sm font-black uppercase tracking-wide text-rose-400">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-black md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-slate-600">{text}</p>}
    </div>
  );
}
