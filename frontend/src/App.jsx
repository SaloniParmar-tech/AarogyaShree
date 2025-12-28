import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssessmentProvider } from "./context/AssessmentContext";

import LandingPage from "./pages/LandingPage";
import TalkToSakhi from "./pages/TalkToSakhi";

import AssessmentLayout from "./pages/assessment/AssessmentLayout";
import AgeStep from "./pages/assessment/AgeStep";
import MenstrualStep from "./pages/assessment/MenstrualStep";
import PainStep from "./pages/assessment/PainStep";
import MoodStep from "./pages/assessment/MoodStep";
import LifestyleStep from "./pages/assessment/LifestyleStep";
import SummaryStep from "./pages/assessment/SummaryStep";
import ResultStep from "./pages/assessment/ResultStep";

export default function App() {
  return (
    <AssessmentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/talk-to-sakhi" element={<TalkToSakhi />} />

          {/* ✅ NESTED ASSESSMENT FLOW */}
          <Route path="/assessment" element={<AssessmentLayout />}>
            <Route path="age" element={<AgeStep />} />
            <Route path="menstrual" element={<MenstrualStep />} />
            <Route path="pain" element={<PainStep />} />
            <Route path="mood" element={<MoodStep />} />
            <Route path="lifestyle" element={<LifestyleStep />} />
            <Route path="summary" element={<SummaryStep />} />
            <Route path="result" element={<ResultStep />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AssessmentProvider>
  );
}
