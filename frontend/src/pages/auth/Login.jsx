import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-pink-700 py-2 font-medium text-white transition hover:bg-pink-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Please wait..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="cursor-pointer font-medium text-pink-700"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
