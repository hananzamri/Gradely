import { useState } from "react";
import { calculateGPA } from "../utils/gpaCalculator";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

import { calculatorData, pastGPA, getGPAstatus, gradeOptions, creditOptions } from "../data/calculatorData";

export default function CalculatorPage() {

  const [showForm, setShowForm] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [credits, setCredits] = useState(3);
  const [grade, setGrade] = useState("A+");
  const [subjects, setSubjects] = useState(calculatorData);
  const [error, setError] = useState("");

  const semesterGPA = calculateGPA(subjects);
  const pastCredits = pastGPA.reduce((sum, s) => sum + s.credits, 0);
  const pastPoints = pastGPA.reduce(
    (sum, s) => sum + s.gpa * s.credits, 0
  );
  const currentCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const currentPoints = semesterGPA * currentCredits;

  const cumulativeGPA = (pastPoints + currentPoints) / (pastCredits + currentCredits);
  const safeCGPA = isNaN(cumulativeGPA) ? 0 : cumulativeGPA;

  function handleAddSubjects() {

    if(!subjectName.trim()){
      setError("Subject name cannot be empty!");
      return ;
    }

    const newSubject = {
      name: subjectName,
      credits: credits,
      grade: grade,
    };
    const updatedSubjects = [
      ...subjects,
      newSubject
    ];

    setSubjects(updatedSubjects);

    setSubjectName("");
    setCredits(3);
    setGrade("A+");
    setShowForm(false);
  }

  function handleCancel() {
    setSubjectName("");
    setCredits(3);
    setGrade("A+");
    setShowForm(false);
  }

  function clearError () {
    if (error) setError("");
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">

      <Header />

      <main className="max-w-[1120px] mx-auto px-6 py-10">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-[#5E7A8C]">
            GPA Calculator
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl">
            Estimate your semester performance by adding your course credits and expected grades
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main left container*/}
          <div className="bg-white border border-[#D9E3E8] rounded-xl p-6 lg:col-span-2">

            {/* Header row*/}
            <div className="grid grid-cols-[2fr_1fr_1fr_auto] font-semibold text-gray-500 mb-4">
              <span>Subject Name</span>
              <span>Credits</span>
              <span>Grade</span>
              <span></span>
            </div>

            {subjects.map((subject, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr_auto] py-3 border-t border-gray-200"
              >
                <span>{subject.name}</span>
                <span>{subject.credits}</span>
                <span>{subject.grade}</span>

                <button
                  onClick={() => {
                    const updated=subjects.filter((_, i) => i !== index);
                    setSubjects(updated);
                  }}
                  className="text-red-500 font-semibold px-2 py-1 hover:bg-red-600 rounded transition"
                >
                  X
                </button>
              </div>
            ))}

            { showForm && (
              <div className="p-4 bg-[#D9E3E8] rounded-lg mb-4 space-y-4">

                {/* Error message */}
                { error && (
                  <p className="text-red-500 text-sm mb-2">
                    {error}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Subject Name"
                  value={subjectName}
                  onChange={(e) => {
                    setSubjectName(e.target.value);
                    clearError();
                  }}
                  className="w-full px-4 py-2 border border-[#5E7A8C] rounded-lg"
                />
              
                <select
                  value={credits}
                  onChange={(e) => 
                    setCredits(Number(e.target.value)
                  )} 
                  className="w-full px-4 py-2 border border-[#5E7A8C] rounded-lg"
                >
                  {creditOptions.map((credit => (
                    <option key={credit}>
                      {credit}
                    </option>
                  )))}
                </select>
            
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2 border border-[#5E7A8C] rounded-lg"
                >
                  {gradeOptions.map((grade => (
                    <option key={grade}>
                      {grade}
                    </option>
                  )))}
                </select>
                
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={handleAddSubjects}
                    className="flex-1 bg-[#5E7A8C] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                  >
                    Save Subject
                  </button>
                  <button
                    onClick={handleCancel}
                    className=" flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <button 
              onClick={() => setShowForm(true)}
              className="mt-4 text-[#5E7A8C] font-semibold"
            >
              + Add another subject
            </button>
          </div>

          {/* Right containers */}
          <div className="space-y-6">

            {/* Semester GPA card */}
            <div className="bg-[#5E7A8C] text-white rounded-xl p-6 text-center">
              <p className="text-sm uppercase tracking-wide">
                Semester GPA
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {semesterGPA.toFixed(2)}
              </h2>

              <p className="mt-3 text-sm">
                {getGPAstatus(semesterGPA)}
              </p>
            </div>

            {/* Cumulative GPA card */}
            <div className="bg-white border border-[#D9E3E8] rounded-xl p-6">

              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Cumulative GPA
              </p>
              
              {/* connect cumulative gpa to academic history */}
              <div className="flex items-end mt-4">
                <span className="text-5xl font-bold text-[#5E7A8C]">
                  {safeCGPA.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 ml-2 mb-1">
                  / 4.50
                </span>

              </div>
            </div>

            {/* Motivation (?) card */}
            <div>

            </div>
          </div>
        </div>
      </main>
      <BottomNav />

    </div>
  );
}