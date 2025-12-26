import { useNavigate } from "react-router-dom";
import AssessmentShell from "../../components/AssessmentShell";

export default function SummaryStep() {
  const navigate = useNavigate();

  return (
    <AssessmentShell>
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Assessment Summary</h2>
        <p className="text-gray-600 mb-6">
          Thank you for completing the assessment.
        </p>
        <button onClick={() => navigate("/assessment/result")}
          className="px-6 py-2 bg-pink-500 text-white rounded-lg">
          View Result →
        </button>
      </div>
    </AssessmentShell>
  );
}
