import { useState } from "react";
import AssessmentShell from "../../components/AssessmentShell";

export default function ImageAssessment() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setShowResult(false);
  };

  const handleAnalyze = () => {
    // UI-only placeholder
    setShowResult(true);
  };

  return (
    <AssessmentShell>
      <div className="bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Image-Based Assessment
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Upload an image and let Sakhi provide gentle guidance.
          <br />
          <span className="text-xs text-gray-400">
            (This is guidance, not a medical diagnosis)
          </span>
        </p>

        {/* Upload */}
        <div className="border-2 border-dashed border-pink-200 rounded-xl p-6 text-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="cursor-pointer text-pink-600 font-medium"
          >
            Click to upload an image
          </label>

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-64 rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleAnalyze}
            disabled={!image}
            className={`px-6 py-2 rounded-lg text-white transition ${
              image
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Analyze Image
          </button>
        </div>

        {/* Result (UI Placeholder) */}
        {showResult && (
          <div className="bg-pink-50 border border-pink-100 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2">
              Sakhi’s Gentle Insight 🌸
            </h3>
            <p className="text-sm text-gray-700">
              Based on the image provided, everything appears generally normal.
              If you are experiencing discomfort or changes, consider consulting
              a healthcare professional.
            </p>

            <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
              <li>Maintain proper hygiene</li>
              <li>Stay hydrated</li>
              <li>Seek medical advice if symptoms persist</li>
            </ul>
          </div>
        )}
      </div>
    </AssessmentShell>
  );
}
