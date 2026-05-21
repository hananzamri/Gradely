import { Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import CurriculumPage from "./pages/CurriculumPage";
import SubjectPage from "./pages/SubjectPage";
import TargetModelPage from "./pages/TargetModelPage";

export default function App() {
  return (
    <Routes>

      {/* default route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* pages */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/curriculum" element={<CurriculumPage />} />

      {/* subject page (FIXED) */}
      <Route path="/subject" element={<SubjectPage />} />

      {/* optional future page */}
      <Route path="/target-model" element={<TargetModelPage />} />

      {/* fallback route (optional but good practice) */}
      <Route path="*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
}