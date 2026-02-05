import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AssessmentProvider } from "./context/AssessmentContext";
import Navbar from "./components/Navbar";

// Main pages
import LandingPage from "./pages/LandingPage.jsx";
import TalkToSakhi from "./pages/TalkToSakhi";
import Resources from "./pages/Resources.jsx";

// Auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Assessment steps
import AgeStep from "./pages/assessment/AgeStep.jsx";
import MenstrualStep from "./pages/assessment/MenstrualStep.jsx";
import PainStep from "./pages/assessment/PainStep.jsx";
import MoodStep from "./pages/assessment/MoodStep.jsx";
import LifestyleStep from "./pages/assessment/LifestyleStep.jsx";
import SummaryStep from "./pages/assessment/SummaryStep.jsx";
import ResultStep from "./pages/assessment/ResultStep.jsx";
import AssessmentChoice from "./pages/AssessmentChoice.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import FindClinics from "./pages/FindClinics.jsx";
import ImageAssessment from "./pages/assessment/ImageAssessment";

// Dashboard
import Dashboard from "./pages/Dashboard.jsx";
import Community from "./pages/Community.jsx";

export default function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Talk to Sakhi */}
            <Route path="/talk-to-sakhi" element={<TalkToSakhi />} />
            {/* Resources */}
            <Route path="/resources" element={<Resources />} />
            {/* Find Clinics */}
            <Route path="/find-clinics" element={<FindClinics />} />

            <Route path="/community" element={<Community />} />
            {/* Redirect /assessment to first step */}
            <Route path="/assessment" element={<AssessmentChoice />} />
            {/* Assessment flow */}
            <Route path="/assessment/age" element={<AgeStep />} />
            <Route path="/assessment/menstrual" element={<MenstrualStep />} />
            <Route path="/assessment/pain" element={<PainStep />} />
            <Route path="/assessment/mood" element={<MoodStep />} />
            <Route path="/assessment/lifestyle" element={<LifestyleStep />} />
            <Route path="/assessment/summary" element={<SummaryStep />} />
            <Route path="/assessment/result" element={<ResultStep />} />
            <Route path="/assessment/image" element={<ImageAssessment />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AssessmentProvider>
    </AuthProvider>
  );
}
