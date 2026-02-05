import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import ProgressBar from "../../components/ProgressBar";
import { useAssessment } from "../../context/AssessmentContext";

export default function AgeStep() {
  const navigate = useNavigate();
  const { setAnswer, setStep } = useAssessment();

  const options = ["18–25", "26–35", "36–45", "46–55", "55+"];

  const CURRENT_STEP = 1;
  const TOTAL_STEPS = 6;

  const [selected, setSelected] = useState(null);
  const stepToShow = selected ? CURRENT_STEP : 0;

  const handleSelect = (opt) => {
    setSelected(opt);
    setAnswer("ageGroup", opt);
    setStep(CURRENT_STEP);
  };

  return (
    <AssessmentShell>
      <SakhiMessage text="Let me know your age group so I can guide you better🌼 " />
      <ProgressBar step={stepToShow} total={TOTAL_STEPS} />

      <div className="bg-white mt-6 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-center mb-6">
          What is your age group?
        </h2>

        <div className="space-y-3">
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex gap-3 px-4 py-3 rounded-xl border cursor-pointer
              ${selected === opt ? "border-pink-500 bg-pink-50" : "border-pink-200"}`}
            >
              <input
                type="radio"
                checked={selected === opt}
                onChange={() => handleSelect(opt)}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button disabled className="px-6 py-2 rounded-lg border-2 border-pink-300 text-pink-300">
            ← Previous
          </button>

          <button
            disabled={!selected}
            onClick={() => navigate("/assessment/menstrual")}
            className="px-6 py-2 rounded-lg bg-pink-500 text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
