import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssessmentProvider } from "./context/AssessmentContext";

import LandingPage from "./pages/LandingPage.jsx";
import AgeStep from "./pages/assessment/AgeStep.jsx";
import MenstrualStep from "./pages/assessment/MenstrualStep.jsx";
import TalkToSakhi from "./pages/TalkToSakhi";
import AssessmentLayout from "./pages/assessment/AssessmentLayout.jsx";

/**
 * App.jsx - full route list for assessment flow (start with step1 & step2)
 * You'll add subsequent step components (pain, discharge, urinary, mood, lifestyle, summary)
 * as we proceed.
 */

export default function App() {
  return (
    <AssessmentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/talk-to-sakhi" element={<TalkToSakhi />} />
          <Route path="/assessment" element={<AssessmentLayout />} />
          {/* Assessment flow */}
          <Route path="/assessment/age" element={<AgeStep />} />
          <Route path="/assessment/menstrual" element={<MenstrualStep />} />

          {/* Placeholders for remaining steps (add real components later) */}
          <Route path="/assessment/pain" element={<div className="p-6">Pain step (coming)</div>} />
          <Route path="/assessment/discharge" element={<div className="p-6">Discharge step (coming)</div>} />
          <Route path="/assessment/urinary" element={<div className="p-6">Urinary step (coming)</div>} />
          <Route path="/assessment/mood" element={<div className="p-6">Mood step (coming)</div>} />
          <Route path="/assessment/lifestyle" element={<div className="p-6">Lifestyle step (coming)</div>} />
          <Route path="/assessment/summary" element={<div className="p-6">Summary step (coming)</div>} />
        </Routes>
      </BrowserRouter>
    </AssessmentProvider>
  );
}
