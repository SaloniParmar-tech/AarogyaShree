import AssessmentShell from "../../components/AssessmentShell";

export default function ResultStep() {
  return (
    <AssessmentShell>
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Your Health Insight</h2>
        <p className="text-gray-600">
          Based on your responses, we recommend consulting a healthcare professional if symptoms persist.
        </p>
      </div>
    </AssessmentShell>
  );
}
