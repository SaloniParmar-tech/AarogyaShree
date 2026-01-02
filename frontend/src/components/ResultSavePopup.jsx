import { useAuth } from "../context/AuthContext";

export default function ResultSavePopup({ onClose, onLogin }) {
  const { user } = useAuth();

  // If user is logged in, don't show popup
  if (user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
        
        {/* ❌ Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-pink-600 mb-2">
          Save Your Result 🌸
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Login or sign up to save your assessment results and track your health
          insights in the future.
        </p>

        <button
          onClick={onLogin}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium"
        >
          Login / Sign Up
        </button>
      </div>
    </div>
  );
}
