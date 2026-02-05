import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import AssessmentShell from "../../components/AssessmentShell";
import { useAssessment } from "../../context/AssessmentContext";

export default function SummaryStep() {
  const navigate = useNavigate();
  const hasSavedRef = useRef(false);
  const { state } = useAssessment();

  const {
    menstrual = {},
    discharge = {},
    pain = {},
    urinary = {},
    mood = {},
    lifestyle = {},
  } = state.answers;

  // -------- RISK LOGIC (UNCHANGED) --------

  const pcosFlags = [
    menstrual.regular === "No",
    menstrual.cycle === ">35 days",
    menstrual.missed === "Yes",
  ].filter(Boolean).length;

  const pcosRisk =
    pcosFlags >= 2 ? "high" : pcosFlags === 1 ? "medium" : "low";

  const cervicalRisk =
    discharge.discharge === "Yes" ||
    discharge.bleeding === "Yes" ||
    discharge.pain === "Yes";

  const breastRisk =
    pain.lump === "Yes" ||
    pain.skin === "Yes" ||
    pain.discharge === "Yes";

  const utiRisk =
    urinary.burning === "Yes" && urinary.urgency === "Yes";

  const mentalRisk =
    mood.feeling === "Very low" || mood.feeling === "Anxious";

  const resultPayload = {
    pcosRisk,
    cervicalRisk,
    breastRisk,
    utiRisk,
    mentalRisk,
  };

  const handleViewResult = async () => {
    const token = localStorage.getItem("token");

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
            risks: resultPayload,
          }),
        });
      } catch (err) {
        console.error("Save failed", err);
      }
    }

    navigate("/assessment/result", { state: resultPayload });
  };

  return (
    <AssessmentShell>
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-xl p-8 text-center">

        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Assessment Complete!
        </h2>

        <p className="text-gray-600 mb-8">
          Your Sakhi has reviewed your responses and prepared your health
          overview 💗
        </p>

        <button
          onClick={handleViewResult}
          className="px-8 py-3 bg-pink-500 text-white rounded-2xl shadow-lg hover:bg-pink-600 hover:scale-[1.02] transition"
        >
          View My Health Report →
        </button>

      </div>
    </AssessmentShell>
  );
}
