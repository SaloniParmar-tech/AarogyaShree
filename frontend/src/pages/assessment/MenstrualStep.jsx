import { useNavigate } from "react-router-dom";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import ProgressBar from "../../components/ProgressBar";
import { useAssessment } from "../../context/AssessmentContext";
import { useLanguage } from "../../context/LanguageContext";

function OptionCard({ option, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border py-3 text-sm font-medium transition-all ${
        selected
          ? "scale-[1.02] border-pink-500 bg-pink-50 shadow-md"
          : "border-gray-200 bg-white hover:border-pink-400 hover:shadow"
      }`}
    >
      {option.label}
    </button>
  );
}

function QuestionCard({ icon, title, options, value, onChange }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xl text-pink-600">{icon}</span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>

      <div className={`grid gap-3 ${options.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            option={opt}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default function MenstrualStep() {
  const navigate = useNavigate();
  const { setMultipleAnswers, setStep, state } = useAssessment();
  const { t } = useLanguage();

  const answers = state.answers.menstrual || {};
  const update = (key, val) => {
    setMultipleAnswers({ menstrual: { ...answers, [key]: val } });
  };

  const canProceed =
    answers.regular && answers.cycle && answers.heavy && answers.missed;

  return (
    <AssessmentShell>
      <SakhiMessage text={t("menstrualSakhi")} />
      <ProgressBar step={2} total={7} />

      <div className="mt-6 space-y-5 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-5">
        <QuestionCard
          icon="1."
          title={t("regularPeriods")}
          options={[
            { value: "Yes", label: t("yes") },
            { value: "Sometimes", label: t("sometimes") },
            { value: "No", label: t("no") },
          ]}
          value={answers.regular}
          onChange={(v) => update("regular", v)}
        />

        <QuestionCard
          icon="2."
          title={t("cycleLength")}
          options={[
            { value: "<21 days", label: t("less21") },
            { value: "21-35 days", label: t("days21to35") },
            { value: ">35 days", label: t("more35") },
          ]}
          value={answers.cycle}
          onChange={(v) => update("cycle", v)}
        />

        <QuestionCard
          icon="3."
          title={t("heavyBleeding")}
          options={[
            { value: "Yes", label: t("yes") },
            { value: "No", label: t("no") },
          ]}
          value={answers.heavy}
          onChange={(v) => update("heavy", v)}
        />

        <QuestionCard
          icon="4."
          title={t("missedPeriods")}
          options={[
            { value: "Yes", label: t("yes") },
            { value: "No", label: t("no") },
          ]}
          value={answers.missed}
          onChange={(v) => update("missed", v)}
        />

        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-pink-400 px-5 py-2 text-pink-500 transition hover:bg-pink-100"
          >
            ← {t("previous")}
          </button>

          <button
            disabled={!canProceed}
            onClick={() => {
              setStep(2);
              navigate("/assessment/cervical");
            }}
            className="rounded-xl bg-pink-500 px-6 py-2 text-white shadow-lg transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("next")} →
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
