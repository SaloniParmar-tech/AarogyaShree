import { useNavigate } from "react-router-dom";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import ProgressBar from "../../components/ProgressBar";
import { useAssessment } from "../../context/AssessmentContext";

function OptionCard({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-xl border text-sm font-medium transition-all
        ${
          selected
            ? "bg-pink-50 border-pink-500 scale-[1.02] shadow-md"
            : "bg-white border-gray-200 hover:border-pink-400 hover:shadow"
        }`}
    >
      {label}
    </button>
  );
}

function QuestionCard({ icon, title, options, value, onChange }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl text-pink-600">{icon}</span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>

      <div
        className={`grid gap-3 ${
          options.length > 2 ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {options.map((opt) => (
          <OptionCard
            key={opt}
            label={opt}
            selected={value === opt}
            onClick={() => onChange(opt)}
          />
        ))}
      </div>
    </div>
  );
}

export default function MenstrualStep() {
  const navigate = useNavigate();
  const { setMultipleAnswers, setStep, state } = useAssessment();

  const answers = state.answers.menstrual || {};

  const update = (key, val) => {
    setMultipleAnswers({
      menstrual: { ...answers, [key]: val },
    });
  };

  const CURRENT_STEP = 2;
  const TOTAL_STEPS = 7;

  const canProceed =
    answers.regular && answers.cycle && answers.heavy && answers.missed;

  return (
    <AssessmentShell>
      <SakhiMessage text="Let’s talk about your periods and hormonal health 🌸" />
      <ProgressBar step={CURRENT_STEP} total={TOTAL_STEPS} />

      {/* Gradient background panel */}
      <div className="mt-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-5 space-y-5">

        <QuestionCard
          icon="1."
          title="Are your periods regular?"
          options={["Yes", "Sometimes", "No"]}
          value={answers.regular}
          onChange={(v) => update("regular", v)}
        />

        <QuestionCard
          icon="2."
          title="Your usual cycle length?"
          options={["<21 days", "21–35 days", ">35 days"]}
          value={answers.cycle}
          onChange={(v) => update("cycle", v)}
        />

        <QuestionCard
          icon="3."
          title="Do you have very heavy bleeding?"
          options={["Yes", "No"]}
          value={answers.heavy}
          onChange={(v) => update("heavy", v)}
        />

        <QuestionCard
          icon="4."
          title="Missed periods for 2+ months (not pregnant)?"
          options={["Yes", "No"]}
          value={answers.missed}
          onChange={(v) => update("missed", v)}
        />

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl border border-pink-400 text-pink-500 hover:bg-pink-100 transition"
          >
            ← Previous
          </button>

          <button
            disabled={!canProceed}
            onClick={() => {
              setStep(2);
              navigate("/assessment/cervical");
            }}
            className="px-6 py-2 rounded-xl bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
