import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Search handmade products..." }) {
  return (
    <label className="glass-card flex w-full items-center gap-3 rounded-full px-5 py-3">
      <FiSearch className="text-lg text-rose-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
      />
    </label>
  );
}
