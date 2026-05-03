import { useNavigate } from "react-router-dom";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import ProgressBar from "../../components/ProgressBar";
import { useAssessment } from "../../context/AssessmentContext";
import { useLanguage } from "../../context/LanguageContext";

function QuestionCard({ icon, title, options, value, onChange }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xl text-pink-600">{icon}</span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className={`grid gap-3 ${options.length > 2 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`w-full rounded-xl border py-3 text-sm font-medium transition-all ${
              value === opt.value
                ? "scale-[1.02] border-pink-500 bg-pink-50"
                : "border-pink-200 bg-white hover:border-pink-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CervicalStep() {
  const navigate = useNavigate();
  const { setMultipleAnswers, setStep, state } = useAssessment();
  const { t } = useLanguage();
  const answers = state.answers.discharge || {};

  const update = (k, v) =>
    setMultipleAnswers({ discharge: { ...answers, [k]: v } });

  const canProceed =
    answers.discharge && answers.bleeding && answers.pain && answers.pap;

  return (
    <AssessmentShell>
      <SakhiMessage text={t("cervicalSakhi")} />
      <ProgressBar step={3} total={7} />

      <div className="mt-6 space-y-5 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-5">
        <QuestionCard
          icon="1."
          title={t("abnormalDischarge")}
          options={[
            { value: "Yes", label: t("yes") },
            { value: "No", label: t("no") },
          ]}
          value={answers.discharge}
          onChange={(v) => update("discharge", v)}
        />
        <QuestionCard
          icon="2."
          title={t("bleedingBetween")}
          options={[
            { value: "Yes", label: t("yes") },
            { value: "No", label: t("no") },
          ]}
          value={answers.bleeding}
          onChange={(v) => update("bleeding", v)}
        />
        <QuestionCard
          icon="3."
          title={t("pelvicPain")}
          options={[
            { value: "Yes", label: t("yes") },
            { value: "No", label: t("no") },
          ]}
          value={answers.pain}
          onChange={(v) => update("pain", v)}
        />
        <QuestionCard
          icon="4."
          title={t("papTest")}
          options={[
            { value: "Never", label: t("never") },
            { value: "More than 3 years ago", label: t("moreThan3Years") },
            { value: "Within last 3 years", label: t("within3Years") },
          ]}
          value={answers.pap}
          onChange={(v) => update("pap", v)}
        />

        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-pink-400 px-5 py-2 text-pink-500 hover:bg-pink-100"
          >
            ← {t("previous")}
          </button>
          <button
            disabled={!canProceed}
            onClick={() => {
              setStep(3);
              navigate("/assessment/breast");
            }}
            className="rounded-xl bg-pink-500 px-6 py-2 text-white shadow-lg hover:bg-pink-600 disabled:opacity-40"
          >
            {t("next")} →
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
