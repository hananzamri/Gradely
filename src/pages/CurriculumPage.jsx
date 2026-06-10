// src/pages/CurriculumPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

import { curriculumData } from "../data/curriculumData";

// Compute GPA from localStorage
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

export default function CurriculumPage() {
  const navigate = useNavigate();

  const [semesterData, setSemesterData] = useState(curriculumData);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state for adding semester
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const [newSemesterName, setNewSemesterName] = useState("");

  // Modal state for adding subject
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [activeSemesterIndex, setActiveSemesterIndex] = useState(null);
  const [newSubject, setNewSubject] = useState({
    title: "", code: "", type: "CORE", credits: 3, grade: 0, status: "IN PROGRESS",
  });

  // ADD SEMESTER
  function handleAddSemester() {
    if (!newSemesterName.trim()) return;
    setSemesterData([
      ...semesterData,
      { semester: newSemesterName.trim(), subjects: [] },
    ]);
    setNewSemesterName("");
    setShowSemesterModal(false);
  }

  // OPEN ADD SUBJECT MODAL
  function openAddSubject(semesterIndex) {
    setActiveSemesterIndex(semesterIndex);
    setNewSubject({ title: "", code: "", type: "CORE", credits: 3, grade: 0, status: "IN PROGRESS" });
    setShowSubjectModal(true);
  }

  // ADD SUBJECT — immutable update
  function handleAddSubject() {
    if (!newSubject.title.trim() || !newSubject.code.trim()) return;
    const updatedData = semesterData.map((semester, idx) =>
      idx === activeSemesterIndex
        ? { ...semester, subjects: [...semester.subjects, { ...newSubject, credits: Number(newSubject.credits) }] }
        : semester
    );
    setSemesterData(updatedData);
    setShowSubjectModal(false);
  }

  // DELETE SEMESTER
  function handleDeleteSemester(semesterIndex) {
    if (!window.confirm("Delete this semester and all its subjects?")) return;
    setSemesterData(semesterData.filter((_, i) => i !== semesterIndex));
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      <Header />

      <main className="max-w-[1120px] mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center gap-4 flex-wrap mb-10">
          <div>
            <h1 className="text-5xl font-bold text-[#5E7A8C]">Curriculum</h1>
            <p className="text-gray-500 mt-3">Organise your semesters and subjects.</p>
          </div>
          <button
            onClick={() => setShowSemesterModal(true)}
            className="bg-[#5E7A8C] text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
          >
            Add Semester
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#D9E3E8] rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
          />
        </div>

        {/* SEMESTERS */}
        <div className="space-y-10">
          {semesterData.map((semester, semesterIndex) => {
            const filteredSubjects = semester.subjects.filter((subject) =>
              subject.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return (
              <section
                key={semesterIndex}
                className="bg-white rounded-3xl border border-[#D9E3E8] p-8"
              >
                {/* SEMESTER HEADER */}
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#1F2933]">{semester.semester}</h2>
                    <p className="text-gray-500 mt-2">{semester.subjects.length} Subjects</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => openAddSubject(semesterIndex)}
                      className="bg-[#EEF4F7] text-[#5E7A8C] px-5 py-3 rounded-xl hover:bg-[#DCE7ED] transition"
                    >
                      Add Subject
                    </button>
                    <button
                      onClick={() => handleDeleteSemester(semesterIndex)}
                      className="text-red-400 hover:text-red-600 px-3 py-3 rounded-xl hover:bg-red-50 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* SUBJECTS */}
                {filteredSubjects.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredSubjects.map((subject, index) => {
                      const liveGPA = getStoredGPA(subject.code);
                      const displayGPA = liveGPA !== null ? liveGPA : subject.grade;

                      return (
                        <div
                          key={index}
                          onClick={() => navigate(`/subject/${subject.code}`)}
                          className="border border-[#D9E3E8] rounded-2xl p-6 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm uppercase tracking-widest text-[#5E7A8C]">
                                {subject.type}
                              </p>
                              <h3 className="text-2xl font-bold mt-3 text-[#1F2933]">
                                {subject.title}
                              </h3>
                              <p className="text-gray-500 mt-3">{subject.code}</p>
                            </div>
                            <div className="text-right">
                              <h2 className="text-3xl font-bold text-[#5E7A8C]">
                                {displayGPA.toFixed(1)}
                              </h2>
                              <p className="text-sm text-gray-400 mt-1">GPA</p>
                              {liveGPA !== null && (
                                <p className="text-xs text-green-500 mt-1">Live</p>
                              )}
                            </div>
                          </div>

                          <div className="mt-6 flex justify-between items-center">
                            <span className="text-sm text-gray-500">{subject.credits} Credits</span>
                            <span className={`text-sm px-3 py-1 rounded-full ${
                              subject.status === "COMPLETED"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {subject.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-[#F4F7F9] rounded-2xl p-10 text-center">
                    <h3 className="text-2xl font-semibold text-[#1F2933]">No subjects found</h3>
                    <p className="text-gray-500 mt-3">
                      {searchTerm ? "Try another keyword." : "Add your first subject above."}
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>

      </main>

      {/* ADD SEMESTER MODAL */}
      {showSemesterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-[#1F2933] mb-6">Add Semester</h2>
            <label className="text-sm text-gray-500 mb-1 block">Semester name</label>
            <input
              type="text"
              value={newSemesterName}
              onChange={(e) => setNewSemesterName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSemester()}
              placeholder="e.g. Year 3 Semester 1"
              className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
              autoFocus
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSemesterModal(false)}
                className="flex-1 border border-[#D9E3E8] text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSemester}
                disabled={!newSemesterName.trim()}
                className="flex-1 bg-[#5E7A8C] text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-40"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD SUBJECT MODAL */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-[#1F2933] mb-6">Add Subject</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Subject title</label>
                <input
                  type="text"
                  value={newSubject.title}
                  onChange={(e) => setNewSubject({ ...newSubject, title: e.target.value })}
                  placeholder="e.g. Machine Learning"
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Subject code</label>
                <input
                  type="text"
                  value={newSubject.code}
                  onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  placeholder="e.g. 012345"
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Type</label>
                  <select
                    value={newSubject.type}
                    onChange={(e) => setNewSubject({ ...newSubject, type: e.target.value })}
                    className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                  >
                    <option value="CORE">CORE</option>
                    <option value="ELECTIVE">ELECTIVE</option>
                    <option value="REQUIRED">REQUIRED</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Credits</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newSubject.credits}
                    onChange={(e) => setNewSubject({ ...newSubject, credits: Number(e.target.value) })}
                    className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Status</label>
                <select
                  value={newSubject.status}
                  onChange={(e) => setNewSubject({ ...newSubject, status: e.target.value })}
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                >
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSubjectModal(false)}
                className="flex-1 border border-[#D9E3E8] text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                disabled={!newSubject.title.trim() || !newSubject.code.trim()}
                className="flex-1 bg-[#5E7A8C] text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-40"
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
