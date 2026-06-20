export default function InputField({ label, error, as = "input", className = "", ...props }) {
  const Field = as;

  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-black">{label}</span>
      <Field
        {...props}
        className={`mt-2 w-full rounded-2xl border px-4 py-3 font-semibold outline-none transition focus:scale-[1.01] ${
          error
            ? "border-rose-300 bg-rose-50"
            : "border-white/60 bg-white/75 focus:border-pastelPink"
        }`}
      />
      {error && <span className="mt-1 block text-xs font-bold text-rose-500">{error}</span>}
    </label>
  );
}
