import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentLayout from "./AssessmentLayout";
import { useAssessment } from "../../context/AssessmentContext";

/**
 * AgeStep - Step 1 of 8
 * - shows selectable age cards
 * - saves to context and localStorage
 */

const AGE_GROUPS = [
  { id: "under-18", label: "Under 18" },
  { id: "18-30", label: "18 - 30" },
  { id: "31-45", label: "31 - 45" },
  { id: "46-60", label: "46 - 60" },
  { id: "60plus", label: "Above 60" },
];

export default function AgeStep() {
  const navigate = useNavigate();
  const { state, setMultipleAnswers, setStep, nextStep } = useAssessment();
  const [selected, setSelected] = useState(state.answers.ageGroup || "");

  useEffect(() => {
    // initialize step in context
    setStep(1);
    // eslint-disable-next-line
  }, []);

  const onSelect = (id) => setSelected(id);

  const onNext = () => {
    if (!selected) {
      alert("Please select your age group to continue.");
      return;
    }
    setMultipleAnswers({ ageGroup: selected });
    nextStep();
    navigate("/assessment/menstrual");
  };

  return (
    <AssessmentLayout title="Select Your Age Group" subtitle="This helps us personalize the assessment">
      <div className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGE_GROUPS.map((g) => {
            const active = selected === g.id;
            return (
              <button
                key={g.id}
                onClick={() => onSelect(g.id)}
                className={`text-left p-5 rounded-2xl border transition-shadow focus:outline-none ${
                  active
                    ? "border-pink-600 bg-pink-50 shadow-lg"
                    : "border-gray-200 bg-white hover:shadow-md"
                }`}
              >
                <div className="text-lg font-semibold text-gray-800">{g.label}</div>
                <div className="mt-2 text-sm text-gray-500">Choose this if it matches your age</div>
              </button>
            );
          })}
        </div>

        {/* tips / help */}
        <div className="mt-6 text-sm text-gray-500">
          Tip: You can change this later. Answers are saved locally.
        </div>

        {/* nav */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-md bg-white border border-gray-200"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Step 1 of {state.totalSteps}</div>
            <button
              onClick={onNext}
              className="px-6 py-3 rounded-full bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AssessmentLayout>
  );
}
