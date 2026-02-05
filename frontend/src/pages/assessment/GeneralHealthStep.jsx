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
            ? "border-pink-500 bg-pink-50 scale-[1.02]"
            : "border-pink-200 bg-white hover:border-pink-400"
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
          options.length > 2 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"
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

export default function GeneralHealthStep() {
  const navigate = useNavigate();
  const { setMultipleAnswers, setStep, state } = useAssessment();

  const answers = state.answers.urinary || {};

  const update = (k, v) =>
    setMultipleAnswers({ urinary: { ...answers, [k]: v } });

  const canProceed = answers.burning && answers.urgency && answers.fever;

  return (
    <AssessmentShell>
      <SakhiMessage text="Some general health questions before we finish 💪" />
      <ProgressBar step={5} total={7} />

      <div className="mt-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-5 space-y-5">

        <QuestionCard icon="1." title="Burning sensation while urinating?"
          options={["Yes", "No"]} value={answers.burning}
          onChange={(v) => update("burning", v)} />

        <QuestionCard icon="2." title="Frequent urge to urinate?"
          options={["Yes", "No"]} value={answers.urgency}
          onChange={(v) => update("urgency", v)} />

        <QuestionCard icon="3." title="Fever or back pain with urinary problems?"
          options={["Yes", "No"]} value={answers.fever}
          onChange={(v) => update("fever", v)} />

        <div className="flex justify-between pt-4">
          <button onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl border border-pink-400 text-pink-500 hover:bg-pink-100">
            ← Previous
          </button>

          <button disabled={!canProceed}
            onClick={() => { setStep(5); navigate("/assessment/mood"); }}
            className="px-6 py-2 rounded-xl bg-pink-500 text-white shadow-lg hover:bg-pink-600 disabled:opacity-40">
            Next →
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
