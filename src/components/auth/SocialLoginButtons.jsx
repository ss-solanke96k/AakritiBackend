import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default function SocialLoginButtons({ onSocialLogin }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onSocialLogin("Google")}
        className="pill-button bg-white/75 text-ink shadow-sm hover:-translate-y-1 hover:shadow-glow"
      >
        <FaGoogle /> Continue with Google
      </button>
      <button
        type="button"
        onClick={() => onSocialLogin("Facebook")}
        className="pill-button bg-white/75 text-ink shadow-sm hover:-translate-y-1 hover:shadow-glow"
      >
        <FaFacebookF /> Continue with Facebook
      </button>
    </div>
  );
}
