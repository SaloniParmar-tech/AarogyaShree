import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import ProgessBar from "../../components/ProgessBar";

export default function LifestyleStep() {
  const navigate = useNavigate();

  const options = [
    "Regular exercise",
    "Healthy diet",
    "Poor sleep",
    "High stress",
    "Smoking / Alcohol"
  ];

  const CURRENT_STEP = 5;
  const TOTAL_STEPS = 6;

  const [selected, setSelected] = useState([]);

  // ✅ progress increases only after selection
  const stepToShow = selected.length > 0 ? CURRENT_STEP : CURRENT_STEP - 1;

  const toggleOption = (opt) => {
    setSelected((prev) =>
      prev.includes(opt)
        ? prev.filter((o) => o !== opt)
        : [...prev, opt]
    );
  };

  return (
    <AssessmentShell>
      <SakhiMessage text="Tell me about your daily lifestyle habits." />

      <ProgessBar step={stepToShow} total={TOTAL_STEPS} />

      <div className="bg-white mt-6 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-center mb-6">
          Lifestyle Habits
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex gap-3 px-4 py-3 rounded-xl border cursor-pointer transition
                ${
                  selected.includes(opt)
                    ? "border-pink-500 bg-pink-50"
                    : "border-pink-200 hover:bg-pink-50"
                }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {/* Previous */}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg border-2 border-pink-500 text-pink-500 font-medium hover:bg-pink-50 transition"
          >
            ← Previous
          </button>

          {/* Next */}
          <button
            disabled={selected.length === 0}
            onClick={() => navigate("/assessment/summary")}
            className="px-6 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
