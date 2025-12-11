import React, { useEffect, useState } from "react";
import AssessmentLayout from "./AssessmentLayout";
import { useAssessment } from "../../context/AssessmentContext";
import { useNavigate } from "react-router-dom";

export default function MenstrualStep() {
  const { state, setMultipleAnswers, setStep, nextStep } = useAssessment();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(state.answers.menstrual || {
    regularCycle: "",
    lastPeriod: "",
    heavyBleeding: "",
    severePain: "",
  });

  useEffect(() => {
    setStep(2);
    // eslint-disable-next-line
  }, []);

  const onChange = (key, val) => setAnswers((s) => ({ ...s, [key]: val }));

  const onNext = () => {
    setMultipleAnswers({ menstrual: answers });
    nextStep();
    navigate("/assessment/pain");
  };

  return (
    <AssessmentLayout title="Menstrual Health" subtitle="A few questions about your menstrual cycle">
      <div className="py-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Is your menstrual cycle regular?</label>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => onChange("regularCycle", "yes")}
              className={`px-4 py-2 rounded-md ${answers.regularCycle === "yes" ? "bg-pink-600 text-white" : "bg-white border"}`}
            >
              Yes
            </button>
            <button
              onClick={() => onChange("regularCycle", "no")}
              className={`px-4 py-2 rounded-md ${answers.regularCycle === "no" ? "bg-pink-600 text-white" : "bg-white border"}`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">When was your last period?</label>
          <input
            type="text"
            value={answers.lastPeriod || ""}
            onChange={(e) => onChange("lastPeriod", e.target.value)}
            placeholder="e.g., 2025-11-20 or '2 weeks ago'"
            className="mt-2 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Do you experience heavy bleeding?</label>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => onChange("heavyBleeding", "yes")}
              className={`px-4 py-2 rounded-md ${answers.heavyBleeding === "yes" ? "bg-pink-600 text-white" : "bg-white border"}`}
            >
              Yes
            </button>
            <button
              onClick={() => onChange("heavyBleeding", "no")}
              className={`px-4 py-2 rounded-md ${answers.heavyBleeding === "no" ? "bg-pink-600 text-white" : "bg-white border"}`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Any severe pain during periods?</label>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => onChange("severePain", "yes")}
              className={`px-4 py-2 rounded-md ${answers.severePain === "yes" ? "bg-pink-600 text-white" : "bg-white border"}`}
            >
              Yes
            </button>
            <button
              onClick={() => onChange("severePain", "no")}
              className={`px-4 py-2 rounded-md ${answers.severePain === "no" ? "bg-pink-600 text-white" : "bg-white border"}`}
            >
              No
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={() => navigate("/assessment/age")} className="px-4 py-2 rounded-md bg-white border">Back</button>
          <button onClick={onNext} className="px-6 py-3 rounded-full bg-pink-600 text-white">Next</button>
        </div>
      </div>
    </AssessmentLayout>
  );
}
