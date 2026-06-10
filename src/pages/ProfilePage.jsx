import { useNavigate } from "react-router-dom";

import { profileData }
  from "../data/profileData";

import BottomNav from "../components/layout/BottomNav";

export default function ProfilePage() {

  function handleLogout() {

    localStorage.removeItem(
      "isLoggedIn"
    );

    window.location.href =
      "/login";
  }

  const navigate = useNavigate();
  function handleBack() {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex justify-center items-center px-6">

      <button
        onClick={handleBack}
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center
         font-semibold bg-[#5E7A8C] text-white rounded-full"
      >
        ←
      </button>

      <div className="w-full max-w-xl">

        <h1 className="text-center text-4xl font-bold text-[#1F2933]">
          Profile
        </h1>

        <div className="text-center mt-6">
          <div className="w-24 h-24 rounded-full bg-[#5E7A8C] flex items-center justify-center mx-auto">
            <span className="text-white text-3xl font-bold">
              H
            </span>
          </div>
            <h2 className="text-2xl font-semibold mt-4">
              {profileData.name}
            </h2>
            <p className="text-gray-500">
              Student ID: {profileData.studentId}
            </p>
            <p className="text-gray-500">
              Major: {profileData.major}
            </p>
            <p className="text-gray-500">
              {profileData.uni}
            </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 shadow-sm rounded-xl border border-[#D9E3E8] flex-1">
            <p className="text-l text-gray-500">
              Cumulative GPA
            </p>
            
            <div className="flex items-end mt-2">
              <span className="text-4xl font-bold text-[#5E7A8C]">
                {profileData.cgpa}
              </span>
              <span className="text-xl text-gray-500 ml-2 mb-1">
                / {profileData.maxGpa}
              </span>
            </div>
          </div>

          <div className="bg-white p-5 shadow-sm rounded-xl border border-[#D9E3E8] flex-1">
            <p className="text-l text-gray-500">
              Credits earned
            </p>
            <div className="flex items-end mt-2">
              <span className="text-4xl font-bold text-[#5E7A8C]">
                {profileData.creditsEarned}
              </span>
              <span className="text-xl text-gray-500 ml-2 mb-1">
                / {profileData.totalCredits}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div 
                className="h-3 rounded-full bg-[#5E7A8C]"
                style={{ width: `${(profileData.creditsEarned / profileData.totalCredits) * 100}%`, }}
              ></div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition">
        
          Logout

        </button>

      </div>

      <BottomNav />

    </div>
  );
}

/*
src/
  assets/
    hero.png
    react.svg
    vite.svg
  components/
    curriculum/
      subjectcard.jsx
    dashboard/
      assignmentcard.jsx
      gpacard.jsx
      statscard.jsx
    layout/
      bottomnav.jsx
      header.jsx
    subject/
      weightagerow.jsx
    ui/
      badge.jsx
      card.jsx
      progressbar.jsx
    data/
    assignmentdata.js
    curriculumdata.js
    dashboard.js
    profiledata.js
    subjectdata.js
    subjects.js
  pages/
    calculatorpage.jsx
    curriculumpage.jsx
    dashboardpage.jsx
    loginpage.jsx
    profile.jsx
    subjectpage.jsx
    targetmodelpage.jsx
  utils/
    gpaCalculator.js
  app.jsx
  index.css
  main.jsx
*/