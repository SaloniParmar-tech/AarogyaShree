import { useState } from "react";
import { clinicSlots } from "../../data/slots";

export default function AppointmentModal({ clinic, onClose }) {
  const [step, setStep] = useState("FORM");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    otp: "",
  });

  if (!clinic) return null;

  const slots = clinicSlots[clinic.id] || [];

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("VERIFY");
    }, 800);
  };

  const verifyOtp = () => {
    if (form.otp.length < 4) return alert("Invalid OTP");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("CONFIRMED");
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-800">
          {step === "CONFIRMED" ? "Appointment Confirmed" : "Book Appointment"}
        </h2>
        <p className="text-sm text-gray-500">{clinic.name}</p>

        {/* ================= FORM ================= */}
        {step === "FORM" && (
          <form onSubmit={submitForm} className="mt-5 space-y-4">
            <input
              name="name"
              placeholder="Patient name"
              value={form.name}
              onChange={update}
              required
              className="w-full input"
            />

            <input
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={update}
              required
              className="w-full input"
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={update}
              required
              className="w-full input"
            />

            <select
              name="time"
              value={form.time}
              onChange={update}
              required
              className="w-full input"
            >
              <option value="">Select time</option>
              {slots.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <button
              disabled={loading}
              className="w-full rounded-full bg-pink-600/80
              text-white py-2 font-medium hover:bg-pink-700 transition"
            >
              {loading ? "Checking..." : "Continue"}
            </button>
          </form>
        )}

        {/* ================= OTP ================= */}
        {step === "VERIFY" && (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-gray-600">
              Enter OTP sent to <strong>{form.phone}</strong>
            </p>

            <input
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={update}
              className="w-full input text-center tracking-widest"
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full rounded-full bg-pink-600/80
              text-white py-2 font-medium hover:bg-pink-700 transition"
            >
              {loading ? "Verifying..." : "Verify & Book"}
            </button>
          </div>
        )}

        {/* ================= SUCCESS ================= */}
        {step === "CONFIRMED" && (
          <div className="mt-6 text-center space-y-4">
            <div className="text-4xl">✅</div>
            <p className="text-sm text-gray-600">
              Your appointment is confirmed
            </p>

            <div className="bg-pink-50 rounded-xl p-4 text-sm">
              <p>
                <strong>{clinic.name}</strong>
              </p>
              <p>
                {form.date} · {form.time}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-full border border-pink-200
              text-pink-600 py-2 hover:bg-pink-100 transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
