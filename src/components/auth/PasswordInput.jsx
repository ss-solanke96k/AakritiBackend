import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import InputField from "./InputField";

export default function PasswordInput({ label, error, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <InputField label={label} error={error} type={visible ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-3 top-9 grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-pastelPink hover:text-ink"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
}
