import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import { useAssessment } from "../../context/AssessmentContext";
import { useAuth } from "../../context/AuthContext";
import ResultSavePopup from "../../components/ResultSavePopup";

export default function ResultStep() {
  const navigate = useNavigate();
  const { state } = useAssessment();
  const { user } = useAuth();

  const [showPopup, setShowPopup] = useState(true);

  const { pain, menstrual, lifestyle } = state.answers;

  // 🧠 Simple insight logic
  const painLevel = pain?.level || "Not specified";

  const painInsight =
    painLevel === "Severe"
      ? "You reported severe pain. Medical consultation is recommended."
      : painLevel === "Moderate"
      ? "Moderate pain noted. Lifestyle changes may help."
      : painLevel === "Mild"
      ? "Mild pain reported. Usually manageable."
      : "No pain reported.";

  const lifestyleCount = Object.keys(lifestyle || {}).length;

  const lifestyleInsight =
    lifestyleCount >= 3
      ? "Multiple lifestyle factors may be affecting your health."
      : "Your lifestyle habits seem balanced.";

  return (
    <>
      {/* 🔔 Popup for guest users */}
      {!user && showPopup && (
        <ResultSavePopup
          onClose={() => setShowPopup(false)}
          onLogin={() => {
            setShowPopup(false);
            document.dispatchEvent(new Event("open-auth-modal"));
          }}
        />
      )}

      <AssessmentShell>
        <SakhiMessage text="Based on your responses, here is a gentle overview of your health. This is guidance, not a diagnosis." />

        {/* 🔽 YOUR EXISTING RESULT UI (UNCHANGED) */}
        <div className="bg-white mt-6 rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
            Your Health Insight
          </h2>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-pink-200 rounded-xl p-4 bg-pink-50 text-center">
              <div className="text-3xl mb-2">🤕</div>
              <h3 className="font-semibold text-gray-700">Pain Level</h3>
              <p className="text-sm text-gray-600 mt-1">{painInsight}</p>
            </div>

            <div className="border border-pink-200 rounded-xl p-4 bg-pink-50 text-center">
              <div className="text-3xl mb-2">🌿</div>
              <h3 className="font-semibold text-gray-700">Lifestyle</h3>
              <p className="text-sm text-gray-600 mt-1">{lifestyleInsight}</p>
            </div>

            <div className="border border-pink-200 rounded-xl p-4 bg-pink-50 text-center">
              <div className="text-3xl mb-2">🩸</div>
              <h3 className="font-semibold text-gray-700">Cycle</h3>
              <p className="text-sm text-gray-600 mt-1">
                {menstrual?.type || "Cycle data not provided"}
              </p>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Sakhi&apos;s Suggestions
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {painLevel === "Severe" && <li>• Please consult a gynecologist</li>}
              <li>• Maintain proper sleep and hydration</li>
              <li>• Light exercise or yoga can help</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-lg border-2 border-pink-500 text-pink-500"
            >
              Go to Home
            </button>

            <button
              onClick={() => navigate("/assessment/age")}
              className="px-6 py-2 rounded-lg bg-pink-500 text-white"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </AssessmentShell>
    </>
  );
}
