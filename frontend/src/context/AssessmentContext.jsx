import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * AssessmentContext
 * - Holds the answers across steps
 * - Persists to localStorage key "aarogya_assessment"
 */

const AssessmentContext = createContext();

export function useAssessment() {
  return useContext(AssessmentContext);
}

const STORAGE_KEY = "aarogya_assessment_v1";

export function AssessmentProvider({ children }) {
  const [state, setState] = useState({
    step: 1,
    totalSteps: 8,
    answers: {
      ageGroup: "",
      menstrual: {},
      pain: {},
      discharge: {},
      urinary: {},
      mood: {},
      lifestyle: {},
    },
  });

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState((s) => ({ ...s, ...parsed }));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state]);

  const setAnswer = (pathKey, value) => {
    setState((s) => {
      const newAnswers = { ...s.answers, [pathKey]: value };
      return { ...s, answers: newAnswers };
    });
  };

  const setMultipleAnswers = (updates) => {
    setState((s) => {
      const newAnswers = { ...s.answers, ...updates };
      return { ...s, answers: newAnswers };
    });
  };

  const setStep = (step) => setState((s) => ({ ...s, step }));
  const nextStep = () => setState((s) => ({ ...s, step: Math.min(s.step + 1, s.totalSteps) }));
  const prevStep = () => setState((s) => ({ ...s, step: Math.max(s.step - 1, 1) }));

  const value = {
    state,
    setAnswer,
    setMultipleAnswers,
    setStep,
    nextStep,
    prevStep,
  };

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}
