// src/components/dashboard/GPACard.jsx

import Card from "../ui/Card";
import { profileData } from "../../data/profileData";

export default function GPACard() {
  const currentGPA = profileData.cgpa;
  const gpaPercentage = (currentGPA / profileData.maxGpa) * 100;

  const gradeLabel =
    currentGPA >= 4.2 ? "Summa Cum Laude track"
    : currentGPA >= 4.0 ? "Magna Cum Laude track"
    : currentGPA >= 3.75 ? "Cum Laude track"
    : currentGPA >= 3.5 ? "Graduation Prize track"
    : "Keep pushing!";

  return (
    <Card>
      {/* TOP */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="uppercase text-xs tracking-[0.3em] text-gray-400">
            Current GPA
          </p>
          <h2 className="text-6xl font-bold text-[#5E7A8C] mt-4">
            {currentGPA.toFixed(2)}
          </h2>
          <p className="text-gray-400 mt-2">out of {profileData.maxGpa}</p>
          <p className="text-xs text-[#5E7A8C] mt-1 font-medium">{gradeLabel}</p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#EEF4F7] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#5E7A8C] text-3xl">school</span>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-500">GPA Progress</span>
          <span className="font-medium">{gpaPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#5E7A8C] transition-all duration-500"
            style={{ width: `${gpaPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Based on {profileData.creditsEarned} credits earned
        </p>
      </div>
    </Card>
  );
}
