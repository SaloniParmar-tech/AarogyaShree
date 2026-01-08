import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import AssessmentShell from "../../components/AssessmentShell";

export default function SummaryStep() {
  const navigate = useNavigate();
  const hasSavedRef = useRef(false); // prevents duplicate save

  const handleViewResult = async () => {
    const token = localStorage.getItem("token");

    // Save only once
    if (token && !hasSavedRef.current) {
      hasSavedRef.current = true;

      try {
        await fetch("http://localhost:5000/api/assessment/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            summary: "Assessment Completed",
            score: null,
          }),
        });
      } catch (err) {
        console.error("Failed to save assessment", err);
      }
    }

    navigate("/assessment/result");
  };

  return (
    <AssessmentShell>
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Assessment Summary</h2>
        <p className="text-gray-600 mb-6">
          Thank you for completing the assessment.
        </p>
        <button
          onClick={handleViewResult}
          className="px-6 py-2 bg-pink-500 text-white rounded-lg"
        >
          View Result →
        </button>
      </div>
    </AssessmentShell>
  );
}
