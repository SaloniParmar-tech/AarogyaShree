import React from "react";
import ProgressBar from "../../components/ProgressBar";
import { useAssessment } from "../../context/AssessmentContext";

/**
 * AssessmentLayout
 * - wraps each assessment page
 * - shows progress bar and back button
 */

export default function AssessmentLayout({ children, title, subtitle }) {
  const { state, prevStep } = useAssessment();

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-8">
        {/* header row with back */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={prevStep}
              className="px-3 py-2 rounded-md bg-white border border-gray-200 shadow sm:inline-flex items-center gap-2"
            >
              ← Back
            </button>

            <div>
              <div className="text-lg font-semibold text-gray-800">{title}</div>
              {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="w-44"><ProgressBar step={state.step} total={state.totalSteps} /></div>
          </div>
        </div>

        {/* mobile progress */}
        <div className="block sm:hidden mb-6">
          <ProgressBar step={state.step} total={state.totalSteps} />
        </div>

        {/* page content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
