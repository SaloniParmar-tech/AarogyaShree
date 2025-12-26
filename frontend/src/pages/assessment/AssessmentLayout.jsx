import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import { useAssessment } from "../../context/AssessmentContext";

export default function AssessmentLayout({ children, title, subtitle }) {
  const { state, prevStep } = useAssessment();
  const navigate = useNavigate();

  const handleBack = () => {
    prevStep();
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="px-3 py-2 rounded-md bg-white border shadow"
            >
              ← Back
            </button>

            <div>
              <div className="text-lg font-semibold text-gray-800">
                {title}
              </div>
              {subtitle && (
                <div className="text-sm text-gray-600">{subtitle}</div>
              )}
            </div>
          </div>

          <div className="hidden sm:block w-56">
            <ProgressBar step={state.step} total={state.totalSteps} />
          </div>
        </div>

        {/* Mobile progress */}
        <div className="sm:hidden mb-6">
          <ProgressBar step={state.step} total={state.totalSteps} />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
