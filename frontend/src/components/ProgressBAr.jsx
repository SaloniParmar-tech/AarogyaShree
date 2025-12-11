import React from "react";

/**
 * ProgressBar
 * Props:
 *  - step (number)
 *  - total (number)
 */
export default function ProgressBar({ step = 1, total = 8 }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
        <div>Step {step} of {total}</div>
        <div className="font-semibold">{pct}%</div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
