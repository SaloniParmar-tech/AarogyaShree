import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import ProgressBar from "../../components/ProgressBar";
import { useAssessment } from "../../context/AssessmentContext";

export default function LifestyleStep() {
  const navigate = useNavigate();
  const { setAnswer, setStep } = useAssessment();

  const options = [
    "Regular exercise",
    "Healthy diet",
    "Poor sleep",
    "High stress",
    "Smoking / Alcohol",
  ];

  const CURRENT_STEP = 5;
  const TOTAL_STEPS = 6;

  const [selected, setSelected] = useState([]);
  const stepToShow = selected.length > 0 ? CURRENT_STEP : CURRENT_STEP - 1;

  const toggleOption = (opt) => {
    const updated =
      selected.includes(opt)
        ? selected.filter((o) => o !== opt)
        : [...selected, opt];

    setSelected(updated);
    setAnswer("lifestyle", { habits: updated });
    setStep(CURRENT_STEP);
  };

  return (
    <AssessmentShell>
      <SakhiMessage text="Tell me about your daily lifestyle habits." />
      <ProgressBar step={stepToShow} total={TOTAL_STEPS} />

      <div className="bg-white mt-6 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-center mb-6">
          Lifestyle Habits
        </h2>

        <div className="space-y-3">
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex gap-3 px-4 py-3 rounded-xl border cursor-pointer
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
              {opt}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg border-2 border-pink-500 text-pink-500">
            ← Previous
          </button>

          <button
            disabled={selected.length === 0}
            onClick={() => navigate("/assessment/summary")}
            className="px-6 py-2 rounded-lg bg-pink-500 text-white disabled:opacity-40">
            Next →
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
