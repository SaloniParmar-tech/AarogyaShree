import React, { useState } from "react";

export default function AiSummaryModal({ title, description, onClose }) {
  const [languageInput, setLanguageInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!languageInput.trim()) {
      setError("Please enter a language.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("http://localhost:5000/api/gemini-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          language: languageInput,
        }),
      });

      const data = await res.json();

      if (data.text === "The requested language does not exist.") {
        setError("The requested language does not exist.");
      } else {
        setSummary(data.text);
      }
    } catch {
      setError("Unable to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-2">
          Simple Summary
        </h3>

        {/* 🔹 THIS IS THE INPUT */}
        <input
          type="text"
          placeholder="Enter language (e.g. Hindi, Tamil, Bengali)"
          value={languageInput}
          onChange={(e) => setLanguageInput(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-pink-400"
        />
        <p className="mt-2 text-xs text-gray-500">
  This summary is for educational purposes only and does not provide
  medical or professional advice.
</p>


        <button
          onClick={handleGenerate}
          className="w-full mt-4 py-2.5 rounded-xl bg-pink-600 text-white text-sm font-medium"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>

        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {summary && (
          <div className="mt-4 text-sm text-gray-700 whitespace-pre-line">
            {summary}
          </div>
        )}
      </div>
    </div>
  );
}
