import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 via-white to-purple-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-pink-700">
            Welcome{user ? `, ${user.name}` : ""} 🌸
          </h1>
          <p className="text-gray-600 mt-2">
            Sakhi is here to support your health journey
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            onClick={() => navigate("/assessment")}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-pink-100"
          >
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Start Questionnaire
            </h3>
            <p className="text-sm text-gray-600">
              Answer a few questions to get insights
            </p>
          </div>

          <div
            onClick={() => navigate("/assessment/image")}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-pink-100"
          >
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Image Analysis
            </h3>
            <p className="text-sm text-gray-600">
              Upload an image for AI-based guidance
            </p>
          </div>

          <div
            onClick={() => navigate("/talk-to-sakhi")}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-pink-100"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Talk to Sakhi
            </h3>
            <p className="text-sm text-gray-600">
              Ask questions and get gentle support
            </p>
          </div>
        </div>

        {/* Assessment Summary */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10 border border-pink-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Your Assessment Summary
          </h2>
          <p className="text-sm text-gray-600">
            No saved assessments yet. Complete an assessment to see your health
            history here.
          </p>
        </div>

        {/* Health Tips */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Sakhi’s Daily Tips 🌿
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-pink-50 p-4 rounded-xl">
              💧 Stay hydrated throughout the day
            </div>
            <div className="bg-pink-50 p-4 rounded-xl">
              🧘‍♀️ Light stretching or yoga helps balance hormones
            </div>
            <div className="bg-pink-50 p-4 rounded-xl">
              😴 Prioritize sleep for better cycle health
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
