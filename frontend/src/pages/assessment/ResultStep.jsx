import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import AssessmentShell from "../../components/AssessmentShell";
import SakhiMessage from "../../components/SakhiMessage";
import { useAuth } from "../../context/AuthContext";
import ResultSavePopup from "../../components/ResultSavePopup";

export default function ResultStep() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();

  const [showPopup, setShowPopup] = useState(true);

  const {
    pcosRisk,
    cervicalRisk,
    breastRisk,
    utiRisk,
    mentalRisk,
  } = state || {};

  return (
    <>
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
        <SakhiMessage text="This is only a screening, not a medical diagnosis. Please consult a doctor for any concerns." />

        <div className="mt-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-xl p-6">

          <h2 className="text-2xl font-bold text-center mb-2">
            Your Health Overview 💖
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Based on your answers, here’s what Sakhi noticed
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <ResultCard
              icon="🩸"
              title="Hormonal / PCOS Risk"
              status={pcosRisk}
              message={
                pcosRisk === "high"
                  ? "Cycle pattern suggests possible hormonal imbalance. Doctor visit recommended."
                  : pcosRisk === "medium"
                  ? "Some irregularities noticed. Keep tracking your cycle."
                  : "No strong PCOS indicators found."
              }
            />

            <ResultCard
              icon="🌸"
              title="Cervical Health"
              status={cervicalRisk ? "high" : "low"}
              message={
                cervicalRisk
                  ? "Some symptoms suggest screening may be needed."
                  : "No major cervical warning signs reported."
              }
            />

            <ResultCard
              icon="🎗️"
              title="Breast Health"
              status={breastRisk ? "high" : "low"}
              message={
                breastRisk
                  ? "Breast symptoms noted. Medical evaluation advised."
                  : "No concerning breast symptoms reported."
              }
            />

            <ResultCard
              icon="🚻"
              title="Urinary Health"
              status={utiRisk ? "medium" : "low"}
              message={
                utiRisk
                  ? "Possible UTI symptoms. Drink water & consult doctor."
                  : "No strong signs of urinary infection."
              }
            />

            <ResultCard
              icon="🧠"
              title="Emotional Wellbeing"
              status={mentalRisk ? "medium" : "low"}
              message={
                mentalRisk
                  ? "Feeling low or anxious. Talking to someone can help."
                  : "Emotional wellbeing seems stable."
              }
            />
          </div>

          {/* Suggestions */}
          <div className="mt-8 bg-white rounded-2xl p-5 shadow">
            <p className="font-semibold mb-3 text-pink-600">
              🌼 Sakhi’s Suggestions
            </p>

            <ul className="space-y-2 text-sm text-gray-700">
              {breastRisk && <li>• Book a clinical breast examination</li>}
              {cervicalRisk && <li>• Consider Pap screening</li>}
              {pcosRisk !== "low" && <li>• Track periods & consult gynecologist</li>}
              {utiRisk && <li>• Increase water intake & see a doctor</li>}
              {mentalRisk && <li>• Talk to someone you trust or counselor</li>}
              <li>• Maintain healthy diet and regular sleep</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-xl border border-pink-400 text-pink-500 hover:bg-pink-100 transition"
            >
              Go to Home
            </button>

            <button
              onClick={() => navigate("/assessment/age")}
              className="px-6 py-2 rounded-xl bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition"
            >
              Retake Assessment
            </button>
          </div>

        </div>
      </AssessmentShell>
    </>
  );
}

function ResultCard({ icon, title, status, message }) {
  const color =
    status === "high"
      ? "border-red-300 bg-red-50"
      : status === "medium"
      ? "border-yellow-300 bg-yellow-50"
      : "border-green-300 bg-green-50";

  return (
    <div className={`border rounded-2xl p-4 ${color} shadow-sm`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
}
