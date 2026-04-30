import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const { t, language } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage("");
    setIsSubmitting(true);

    try {
      if (!form.email || !form.password || (!isLogin && !form.name)) {
        throw new Error("Please fill all required fields");
      }

      if (!isLogin && form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (isLogin) {
        await login({
          email: form.email,
          password: form.password,
        });
      } else {
        await register({
          name: form.name || "Sakhi",
          email: form.email,
          password: form.password,
          languagePreference: language,
        });
      }

      onClose();
    } catch (err) {
      setMessage(err.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-gray-400 hover:text-red-500"
          aria-label="Close"
        >
          x
        </button>

        <h2 className="mb-6 text-center text-2xl font-semibold text-pink-600">
          {isLogin ? t("welcomeBack") : t("joinAarogyaShree")}
        </h2>

        {!isLogin && (
          <input
            name="name"
            placeholder={t("fullName")}
            onChange={handleChange}
            className="mb-3 w-full rounded-lg border px-4 py-2"
          />
        )}

        <input
          name="email"
          type="email"
          placeholder={t("email")}
          onChange={handleChange}
          className="mb-3 w-full rounded-lg border px-4 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder={t("password")}
          onChange={handleChange}
          className="mb-3 w-full rounded-lg border px-4 py-2"
        />

        {!isLogin && (
          <input
            name="confirmPassword"
            type="password"
            placeholder={t("confirmPassword")}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border px-4 py-2"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full rounded-lg bg-pink-600 py-2 font-medium text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Please wait..." : isLogin ? t("login") : t("signUp")}
        </button>

        {message && (
          <p className="mt-3 rounded-xl bg-pink-50 px-3 py-2 text-center text-xs font-medium text-pink-700">
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-sm">
          {isLogin ? t("newHere") : t("alreadyRegistered")}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-medium text-pink-600"
          >
            {isLogin ? t("createAccount") : t("login")}
          </span>
        </p>
      </div>
    </div>
  );
}
