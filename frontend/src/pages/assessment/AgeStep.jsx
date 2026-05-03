import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import ProgressBar from "../../components/ProgressBar";
import { useAssessment } from "../../context/AssessmentContext";
import { useLanguage } from "../../context/LanguageContext";

export default function AgeStep() {
  const navigate = useNavigate();
  const { setAnswer, setStep } = useAssessment();
  const { t } = useLanguage();

  const options = ["18-25", "26-35", "36-45", "46-55", "55+"];
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
      <SakhiMessage text={t("ageSakhi")} />
      <ProgressBar step={stepToShow} total={TOTAL_STEPS} />

      <div className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-center text-xl font-semibold">
          {t("ageQuestion")}
        </h2>

        <div className="space-y-3">
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer gap-3 rounded-xl border px-4 py-3 ${
                selected === opt ? "border-pink-500 bg-pink-50" : "border-pink-200"
              }`}
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

        <div className="mt-8 flex justify-between">
          <button
            disabled
            className="rounded-lg border-2 border-pink-300 px-6 py-2 text-pink-300"
          >
            ← {t("previous")}
          </button>

          <button
            disabled={!selected}
            onClick={() => navigate("/assessment/menstrual")}
            className="rounded-lg bg-pink-500 px-6 py-2 text-white disabled:opacity-40"
          >
            {t("next")} →
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
