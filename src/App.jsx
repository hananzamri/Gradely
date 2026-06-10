import { Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import CurriculumPage from "./pages/CurriculumPage";
import SubjectPage from "./pages/SubjectPage";
import TargetModelPage from "./pages/TargetModelPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CalculatorPage from "./pages/CalculatorPage";

export default function App() {

  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/curriculum" element={<CurriculumPage />} />
      <Route path="/subject/:code" element={<SubjectPage />}/>
      <Route path="/target-model" element={<TargetModelPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/calculator" element={<CalculatorPage />} />

    </Routes>
  );
}