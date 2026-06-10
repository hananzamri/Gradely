// src/pages/SubjectPage.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

import subjectAssessments from "../data/subjectData";
import { curriculumData } from "../data/curriculumData";

// GPA scale helper
function scoreToGrade(score) {
  if (score >= 95) return { grade: "A+", gpa: 4.5 };
  if (score >= 90) return { grade: "A0", gpa: 4.0 };
  if (score >= 85) return { grade: "B+", gpa: 3.5 };
  if (score >= 80) return { grade: "B0", gpa: 3.0 };
  if (score >= 75) return { grade: "C+", gpa: 2.5 };
  if (score >= 70) return { grade: "C0", gpa: 2.0 };
  if (score >= 65) return { grade: "D+", gpa: 1.5 };
  if (score >= 60) return { grade: "D0", gpa: 1.0 };
  return { grade: "F", gpa: 0.0 };
}

export default function SubjectPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  // Find subject from curriculum
  const allSubjects = curriculumData.flatMap((semester) => semester.subjects);
  const subject = allSubjects.find((s) => s.code === code);

  const [assessmentData, setAssessmentData] = useState(() => {
    try {
      const savedData = localStorage.getItem(`subject-${code}`);
      return savedData ? JSON.parse(savedData) : subjectAssessments[code] || [];
    } catch {
      return subjectAssessments[code] || [];
    }
  });

  const [savedFlag, setSavedFlag] = useState(false);

  // Auto-save whenever assessmentData changes
  useEffect(() => {
    localStorage.setItem(`subject-${code}`, JSON.stringify(assessmentData));
  }, [assessmentData, code]);

  // Calculated values
  const totalWeight = assessmentData.reduce((total, item) => total + item.weight, 0);
  const weightedScore = assessmentData.reduce(
    (total, item) => total + (item.score * item.weight) / 100,
    0
  );
  const { grade: predictedGrade, gpa: predictedGPA } = scoreToGrade(weightedScore);

  // What score is needed in remaining assessments to get a target grade
  const remainingWeight = 100 - totalWeight;

  function handleFieldChange(index, field, value) {
    const updatedData = assessmentData.map((item, i) => {
      if (i !== index) return item;
      return {
        ...item,
        [field]:
          field === "title" || field === "subtitle" ? value : Math.min(100, Math.max(0, Number(value))),
      };
    });
    setAssessmentData(updatedData);
  }

  function handleDelete(index) {
    setAssessmentData(assessmentData.filter((_, i) => i !== index));
  }

  function handleAddAssessment() {
    setAssessmentData([
      ...assessmentData,
      { title: "New Assessment", subtitle: "Description", weight: 10, score: 0 },
    ]);
  }

  function handleSaveProgress() {
    localStorage.setItem(`subject-${code}`, JSON.stringify(assessmentData));
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 2000);
  }

  // Grade bar color
  const gradeColor =
    predictedGPA >= 4.0
      ? "bg-green-400"
      : predictedGPA >= 3.0
      ? "bg-blue-400"
      : predictedGPA >= 2.0
      ? "bg-yellow-400"
      : "bg-red-400";

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      <Header />

      <main className="max-w-[1120px] mx-auto p-6">

        {/* HEADER */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-[#5E7A8C] hover:text-black transition"
          >
            ← Back
          </button>
          <span className="uppercase tracking-widest text-sm text-[#5E7A8C]">Course Details</span>
          <h1 className="text-5xl font-bold mt-2">{subject?.title || "Subject"}</h1>
          <p className="text-gray-500 mt-3">
            {subject?.type} • {subject?.code} • {subject?.credits} Credits
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT — Assessment List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Weightage Breakdown</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Total weight: {totalWeight}% {totalWeight !== 100 && (
                      <span className={totalWeight > 100 ? "text-red-500" : "text-yellow-500"}>
                        ({totalWeight > 100 ? "exceeds 100%" : `${100 - totalWeight}% unassigned`})
                      </span>
                    )}
                    {totalWeight === 100 && <span className="text-green-500">✓</span>}
                  </p>
                </div>
                <button
                  onClick={handleAddAssessment}
                  className="bg-[#5E7A8C] text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
                >
                  Add Assessment
                </button>
              </div>

              {assessmentData.length === 0 ? (
                <div className="bg-[#F4F7F9] rounded-2xl p-10 text-center">
                  <p className="text-lg font-semibold text-[#1F2933]">No assessments yet</p>
                  <p className="text-gray-500 mt-2">Add your first assessment above.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assessmentData.map((item, index) => {
                    const contribution = (item.score * item.weight) / 100;
                    return (
                      <div key={index} className="border border-[#D9E3E8] rounded-2xl p-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Assessment Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                              className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Description</label>
                            <input
                              type="text"
                              value={item.subtitle}
                              onChange={(e) => handleFieldChange(index, "subtitle", e.target.value)}
                              className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Weight (%)</label>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={item.weight}
                              onChange={(e) => handleFieldChange(index, "weight", e.target.value)}
                              className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Score (%)</label>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={item.score}
                              onChange={(e) => handleFieldChange(index, "score", e.target.value)}
                              className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                            />
                          </div>
                        </div>

                        {/* Contribution bar */}
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-[#F4F7F9] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#5E7A8C] rounded-full transition-all"
                              style={{ width: `${item.weight}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-24 text-right">
                            +{contribution.toFixed(1)} pts
                          </span>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-red-400 hover:text-red-600 text-sm transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Summary Panel */}
          <div>
            <div className="bg-[#5E7A8C] text-white rounded-2xl p-6 sticky top-24">
              <p className="uppercase tracking-widest text-sm text-white/70">Current Standing</p>

              <h2 className="text-5xl font-bold mt-4">{weightedScore.toFixed(1)}%</h2>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-2xl font-semibold">{predictedGrade}</span>
                <span className="text-white/70">GPA: {predictedGPA.toFixed(1)} / 4.5</span>
              </div>

              {/* Grade progress bar */}
              <div className="mt-4 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${gradeColor}`}
                  style={{ width: `${Math.min(100, weightedScore)}%` }}
                />
              </div>

              {/* Grade thresholds quick ref */}
              <div className="mt-6 space-y-1 text-xs text-white/60">
                {[
                  { label: "A+ (4.5)", threshold: 95 },
                  { label: "A0 (4.0)", threshold: 90 },
                  { label: "B+ (3.5)", threshold: 85 },
                  { label: "B0 (3.0)", threshold: 80 },
                ].map((t) => (
                  <div key={t.label} className="flex justify-between">
                    <span>{t.label}</span>
                    <span className={weightedScore >= t.threshold ? "text-white font-semibold" : ""}>
                      {t.threshold}%+
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Weight */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">Total Weight</span>
                  <span>{totalWeight}%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${totalWeight > 100 ? "bg-red-400" : "bg-white"}`}
                    style={{ width: `${Math.min(100, totalWeight)}%` }}
                  />
                </div>
                {remainingWeight > 0 && totalWeight < 100 && (
                  <p className="text-xs text-white/50 mt-1">{remainingWeight}% weight unassigned</p>
                )}
              </div>

              {/* Save button */}
              <button
                onClick={handleSaveProgress}
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition ${
                  savedFlag
                    ? "bg-green-400 text-white"
                    : "bg-white text-[#5E7A8C] hover:opacity-90"
                }`}
              >
                {savedFlag ? "Saved ✓" : "Save Progress"}
              </button>
            </div>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}
