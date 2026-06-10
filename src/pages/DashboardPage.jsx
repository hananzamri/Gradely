// src/pages/DashboardPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import AssignmentCard from "../components/dashboard/AssignmentCard";

import { curriculumData } from "../data/curriculumData";
import { assignments } from "../data/assignmentData";
import { profileData } from "../data/profileData";

// Helper: compute GPA from localStorage for a subject code
function getStoredGPA(code) {
  try {
    const savedData = localStorage.getItem(`subject-${code}`);
    if (!savedData) return null;
    const assessments = JSON.parse(savedData);
    const weightedScore = assessments.reduce(
      (total, item) => total + (item.score * item.weight) / 100,
      0
    );
    if (weightedScore >= 95) return 4.5;
    if (weightedScore >= 90) return 4.0;
    if (weightedScore >= 85) return 3.5;
    if (weightedScore >= 80) return 3.0;
    if (weightedScore >= 75) return 2.5;
    if (weightedScore >= 70) return 2.0;
    if (weightedScore >= 65) return 1.5;
    if (weightedScore >= 60) return 1.0;
    return 0.0;
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const navigate = useNavigate();

  // Flatten all subjects, resolving live GPA from localStorage
  const curriculumSubjects = curriculumData.flatMap((semester) =>
    semester.subjects.map((subject) => ({
      ...subject,
      grade: getStoredGPA(subject.code) ?? subject.grade,
    }))
  );

  const [assignmentList, setAssignmentList] = useState(() => {
    try {
      const saved = localStorage.getItem("assignments");
      return saved ? JSON.parse(saved) : assignments;
    } catch {
      return assignments;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    dueDate: "",
    progress: 0,
    status: "IN PROGRESS",
  });

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignmentList));
  }, [assignmentList]);

  // --- GPA Calculation (live, synced from localStorage) ---
  const totalCredits = curriculumSubjects.reduce(
    (total, s) => total + s.credits,
    0
  );
  const weightedGradePoints = curriculumSubjects.reduce(
    (total, s) => total + s.grade * s.credits,
    0
  );
  const currentGPA = totalCredits > 0 ? weightedGradePoints / totalCredits : 0;

  // Completed credits
  const completedCredits = curriculumSubjects
    .filter((s) => s.status === "COMPLETED")
    .reduce((total, s) => total + s.credits, 0);

  // Semester progress
  const semesterProgress = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;

  // Assignments
  const completedAssignments = assignmentList.filter(
    (a) => a.status === "COMPLETED"
  ).length;

  const overdueAssignments = assignmentList.filter((a) => {
    const due = new Date(a.dueDate);
    return due < new Date() && a.status !== "COMPLETED";
  }).length;

  // GPA trend — one bar per semester, using live localStorage grades
  const gpaTrend = curriculumData.map((semester) => {
    const semSubjects = semester.subjects.map((s) => ({
      ...s,
      grade: getStoredGPA(s.code) ?? s.grade,
    }));
    const semCredits = semSubjects.reduce((t, s) => t + s.credits, 0);
    const semPoints  = semSubjects.reduce((t, s) => t + s.grade * s.credits, 0);
    const semGPA     = semCredits > 0 ? semPoints / semCredits : 0;
    return {
      semester: semester.semester,
      gpa: parseFloat(semGPA.toFixed(2)),
    };
  });

  // Academic target from localStorage
  const savedGoal = (() => {
    try { return JSON.parse(localStorage.getItem("selectedGoal")); } catch { return null; }
  })();
  const academicTarget = savedGoal?.name || "Cum Laude";

  // Handle assignment form
  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  }

  function handleAddAssignment() {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate) return;
    setAssignmentList([...assignmentList, { ...newAssignment, progress: 0, status: "IN PROGRESS" }]);
    setNewAssignment({ title: "", subject: "", dueDate: "", progress: 0, status: "IN PROGRESS" });
    setShowModal(false);
  }

  function handleToggleStatus(index) {
    const updated = assignmentList.map((a, i) =>
      i === index
        ? { ...a, status: a.status === "COMPLETED" ? "IN PROGRESS" : "COMPLETED", progress: a.status === "COMPLETED" ? 50 : 100 }
        : a
    );
    setAssignmentList(updated);
  }

  function handleDeleteAssignment(index) {
    setAssignmentList(assignmentList.filter((_, i) => i !== index));
  }

  // All subjects for assignment subject dropdown
  const allSubjectNames = curriculumData.flatMap((sem) =>
    sem.subjects.map((s) => s.title)
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      <Header />

      <main className="max-w-[1120px] mx-auto px-6 py-10">

        {/* PAGE HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-[#5E7A8C]">Academic Dashboard</h1>
          <p className="text-gray-500 mt-3 max-w-2xl">
            Track your semester performance, GPA, and assignments.
          </p>
        </div>

        {/* KPI GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">
            <p className="text-xs uppercase tracking-widest text-gray-400">Current GPA</p>
            <h2 className="text-5xl font-bold mt-6 text-[#5E7A8C]">{profileData.cgpa.toFixed(2)}</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">
            <p className="text-xs uppercase tracking-widest text-gray-400">Credits Done</p>
            <h2 className="text-5xl font-bold mt-6 text-[#1F2933]">{completedCredits}</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">
            <p className="text-xs uppercase tracking-widest text-gray-400">Semester</p>
            <h2 className="text-5xl font-bold mt-6 text-[#1F2933]">{semesterProgress.toFixed(0)}%</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">
            <p className="text-xs uppercase tracking-widest text-gray-400">Completed</p>
            <h2 className="text-5xl font-bold mt-6 text-green-600">{completedAssignments}</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">
            <p className="text-xs uppercase tracking-widest text-gray-400">Overdue</p>
            <h2 className="text-5xl font-bold mt-6 text-red-500">{overdueAssignments}</h2>
          </div>
        </div>

        {/* ANALYTICS */}
        <section className="mb-14">
          <div className="grid lg:grid-cols-2 gap-6">

            {/* GPA TREND */}
            <div className="bg-[#2D3748] text-white rounded-3xl p-8">
              <p className="uppercase tracking-widest text-sm text-white/60">GPA Analytics</p>
              <h2 className="text-3xl font-bold mt-3 mb-8">GPA Trend</h2>
              <div className="space-y-6">
                {gpaTrend.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm truncate max-w-[70%]">{item.semester}</span>
                      <span className="font-semibold shrink-0 ml-2">{item.gpa}</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ width: `${(item.gpa / 4.5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-6">
                Overall CGPA: {profileData.cgpa} / {profileData.maxGpa} ({profileData.creditsEarned} credits earned)
              </p>
            </div>

            {/* TARGET */}
            <div className="bg-[#2D3748] text-white rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <p className="uppercase tracking-widest text-sm text-white/60">Academic Goal</p>
                <h2 className="text-4xl font-bold mt-4">{academicTarget}</h2>
                <p className="text-white/70 mt-4">
                  You are currently on track for {academicTarget}.
                </p>
                <div className="mt-6 bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Current CGPA</span>
                    <span className="font-semibold">{profileData.cgpa.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Target</span>
                    <span className="font-semibold">{savedGoal?.targetGPA?.toFixed(2) ?? "3.75"}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/target-model")}
                className="mt-10 bg-white text-[#1F2933] px-6 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
              >
                View Path
              </button>
            </div>

          </div>
        </section>

        {/* ASSIGNMENTS */}
        <section>
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#1F2933]">Upcoming Assignments</h2>
              <p className="text-gray-500 mt-2">Track deadlines and progress.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#5E7A8C] text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
            >
              Add Assignment
            </button>
          </div>

          {assignmentList.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#D9E3E8] p-12 text-center">
              <p className="text-2xl font-semibold text-[#1F2933]">No assignments yet</p>
              <p className="text-gray-500 mt-2">Add your first assignment above.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignmentList.map((assignment, index) => (
                <AssignmentCard
                  key={index}
                  title={assignment.title}
                  subject={assignment.subject}
                  dueDate={assignment.dueDate}
                  progress={assignment.progress}
                  status={assignment.status}
                  onToggleStatus={() => handleToggleStatus(index)}
                  onDelete={() => handleDeleteAssignment(index)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ADD ASSIGNMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-[#1F2933] mb-6">Add Assignment</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newAssignment.title}
                  onChange={handleInputChange}
                  placeholder="Assignment title"
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Subject</label>
                <select
                  name="subject"
                  value={newAssignment.subject}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C] bg-white"
                >
                  <option value="">Select a subject</option>
                  {allSubjectNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newAssignment.dueDate}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-[#D9E3E8] text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAssignment}
                disabled={!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate}
                className="flex-1 bg-[#5E7A8C] text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
