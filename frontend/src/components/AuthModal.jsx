import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    login({
      name: form.name || "Sakhi",
      email: form.email
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-pink-600">
          {isLogin ? "Welcome Back Sakhi 🌸" : "Join AarogyaShree 🌸"}
        </h2>

        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        {/* Confirm Password (Sign Up only) */}
        {!isLogin && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-lg"
          />
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          {isLogin ? "New here?" : "Already registered?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-600 cursor-pointer font-medium"
          >
            {isLogin ? "Create account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
