import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

import AssignmentCard
  from "../components/dashboard/AssignmentCard";

import { curriculumSubjects }
  from "../data/curriculumData";

import { assignments }
  from "../data/assignmentData";

export default function DashboardPage() {

  const navigate = useNavigate();

  const [assignmentList, setAssignmentList] =
    useState(() => {

      const savedAssignments =
        localStorage.getItem("assignments");

      return savedAssignments
        ? JSON.parse(savedAssignments)
        : assignments;
    });

  const [showModal, setShowModal] =
    useState(false);

  const [newAssignment, setNewAssignment] =
    useState({
      title: "",
      subject: "",
      dueDate: "",
      progress: 0,
      status: "IN PROGRESS",
    });

  useEffect(() => {

    localStorage.setItem(
      "assignments",
      JSON.stringify(assignmentList)
    );

  }, [assignmentList]);

  const totalCredits =
    curriculumSubjects.reduce(
      (total, subject) => total + subject.credits,
      0
    );

  const weightedGradePoints =
    curriculumSubjects.reduce(
      (total, subject) => {
        return total + (
          subject.grade * subject.credits
        );
      },
      0
    );

  const currentGPA =
    weightedGradePoints / totalCredits;

  const completedCredits =
    curriculumSubjects
      .filter(
        (subject) =>
          subject.status === "COMPLETED"
      )
      .reduce(
        (total, subject) => total + subject.credits,
        0
      );

  const semesterProgress =
    (completedCredits / totalCredits) * 100;

  const completedAssignments =
    assignmentList.filter(
      (assignment) =>
        assignment.status === "COMPLETED"
    ).length;

  const overdueAssignments =
    assignmentList.filter((assignment) => {

      const today = new Date();

      const due =
        new Date(assignment.dueDate);

      return (
        due < today &&
        assignment.status !== "COMPLETED"
      );

    }).length;

  const gpaTrend = [
    {
      semester: "Sem 1",
      gpa: 3.72,
    },

    {
      semester: "Sem 2",
      gpa: 3.95,
    },

    {
      semester: "Sem 3",
      gpa: currentGPA.toFixed(2),
    },
  ];

  let academicTarget =
    "Cum Laude";

  if (currentGPA >= 4.30) {
    academicTarget =
      "Summa Cum Laude";
  }
  else if (currentGPA >= 4.00) {
    academicTarget =
      "Magna Cum Laude";
  }

  function handleInputChange(event) {

    const { name, value } = event.target;

    setNewAssignment({
      ...newAssignment,
      [name]: value,
    });
  }

  function handleAddAssignment() {

    if (
      !newAssignment.title ||
      !newAssignment.subject ||
      !newAssignment.dueDate
    ) {
      return;
    }

    setAssignmentList([
      ...assignmentList,
      newAssignment,
    ]);

    setNewAssignment({
      title: "",
      subject: "",
      dueDate: "",
      progress: 0,
      status: "IN PROGRESS",
    });

    setShowModal(false);
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">

      <Header />

      <main className="max-w-[1120px] mx-auto px-6 py-10">

        {/* PAGE HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-[#5E7A8C]">
            Academic Dashboard
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl">
            Track your semester performance,
            GPA, and assignments.
          </p>

        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

          {/* GPA CARD */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:-translate-y-1 hover:shadow-lg transition duration-300">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Current GPA
            </p>

            <h2 className="text-5xl font-bold mt-6 text-[#5E7A8C]">
              {currentGPA.toFixed(2)}
            </h2>

            <p className="text-gray-500 mt-4">
              Based on weighted 4.5 grading system
            </p>

          </div>

          {/* CREDIT CARD */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:-translate-y-1 hover:shadow-lg transition duration-300">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Credits Completed
            </p>

            <h2 className="text-5xl font-bold mt-6 text-[#1F2933]">
              {completedCredits}
            </h2>

            <p className="text-gray-500 mt-4">
              Out of {totalCredits} total credits
            </p>

          </div>

          {/* SEMESTER PROGRESS */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:-translate-y-1 hover:shadow-lg transition duration-300">

            <div className="flex justify-between items-center mb-6">

              <div>

                <p className="text-sm uppercase tracking-widest text-gray-400">
                  Semester Progress
                </p>

                <h2 className="text-4xl font-bold mt-4 text-[#1F2933]">
                  {semesterProgress.toFixed(0)}%
                </h2>

              </div>

            </div>

            <div className="w-full h-4 bg-[#EEF4F7] rounded-full overflow-hidden">

              <div
                className="h-full bg-[#5E7A8C] rounded-full transition-all duration-500"
                style={{ width: `${semesterProgress}%` }}
              />

            </div>

          </div>

          {/* COMPLETED TASKS */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:-translate-y-1 hover:shadow-lg transition duration-300">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Completed Tasks
            </p>

            <h2 className="text-5xl font-bold mt-6 text-green-600">
              {completedAssignments}
            </h2>

            <p className="text-gray-500 mt-4">
              Assignments submitted
            </p>

          </div>

          {/* OVERDUE */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:-translate-y-1 hover:shadow-lg transition duration-300">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Overdue Tasks
            </p>

            <h2 className="text-5xl font-bold mt-6 text-red-500">
              {overdueAssignments}
            </h2>

            <p className="text-gray-500 mt-4">
              Require immediate attention
            </p>

          </div>

        </div>

        {/* ADVANCED ANALYTICS */}
        <section className="mb-14">

          <div className="grid lg:grid-cols-2 gap-6">

            {/* GPA TREND */}
            <div className="bg-[#2D3748] text-white rounded-3xl p-8 shadow-xl">

              <div className="flex justify-between items-center mb-8">

                <div>

                  <p className="uppercase tracking-widest text-sm text-white/60">
                    GPA Analytics
                  </p>

                  <h2 className="text-3xl font-bold mt-3">
                    GPA Trend
                  </h2>

                </div>

                <div className="bg-white/10 px-4 py-2 rounded-full text-sm">

                  Last 3 Semesters

                </div>

              </div>

              <div className="space-y-6">

                {gpaTrend.map((item, index) => (

                  <div key={index}>

                    <div className="flex justify-between mb-2">

                      <span className="text-white/70">
                        {item.semester}
                      </span>

                      <span className="font-semibold">
                        {item.gpa}
                      </span>

                    </div>

                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-white rounded-full"
                        style={{
                          width: `${(item.gpa / 4.5) * 100}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* TARGET CARD */}
            <div className="bg-[#1F2933] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">

              <div>

                <p className="uppercase tracking-widest text-sm text-white/60">
                  Academic Goal
                </p>

                <h2 className="text-4xl font-bold mt-4">
                  {academicTarget}
                </h2>

                <p className="text-white/70 mt-4 leading-relaxed">

                  Based on your current GPA
                  performance, you are currently
                  on track for
                  <span className="font-semibold text-white">
                    {" "} {academicTarget}
                  </span> graduation standing.

                </p>

              </div>

              <div className="mt-10">

                <button
                  onClick={() => navigate("/target-model")}
                  className="bg-white text-[#1F2933] px-6 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
                >

                  View Path

                </button>

              </div>

            </div>

          </div>

        </section>

        {/* ASSIGNMENT SECTION */}
        <section>

          <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">

            <div>

              <h2 className="text-3xl font-bold text-[#1F2933]">
                Upcoming Assignments
              </h2>

              <p className="text-gray-500 mt-2">
                Monitor deadlines and progress.
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => setShowModal(true)}
                className="bg-[#5E7A8C] text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
              >

                Add Assignment

              </button>

              <button
                onClick={() => {

                  localStorage.removeItem(
                    "assignments"
                  );

                  setAssignmentList([]);

                }}
                className="border border-red-300 text-red-500 px-5 py-3 rounded-xl hover:bg-red-50 transition"
              >

                Clear All

              </button>

            </div>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {assignmentList.map((assignment, index) => (
              <AssignmentCard
                key={index}
                title={assignment.title}
                subject={assignment.subject}
                dueDate={assignment.dueDate}
                progress={assignment.progress}
                status={assignment.status}
              />
            ))}

          </div>

        </section>

        {/* MODAL */}
        {showModal && (

          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">

            <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold text-[#1F2933]">
                  Add Assignment
                </h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-black text-2xl"
                >
                  ×
                </button>

              </div>

              <div className="space-y-5">

                <input
                  type="text"
                  name="title"
                  placeholder="Assignment title"
                  value={newAssignment.title}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject name"
                  value={newAssignment.subject}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                />

                <input
                  type="date"
                  name="dueDate"
                  value={newAssignment.dueDate}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                />

                <input
                  type="number"
                  name="progress"
                  placeholder="Progress %"
                  value={newAssignment.progress}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                />

                <select
                  name="status"
                  value={newAssignment.status}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9E3E8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
                >

                  <option value="IN PROGRESS">
                    In Progress
                  </option>

                  <option value="COMPLETED">
                    Completed
                  </option>

                </select>

              </div>

              <button
                onClick={handleAddAssignment}
                className="w-full mt-8 bg-[#5E7A8C] text-white py-4 rounded-xl hover:opacity-90 transition"
              >

                Save Assignment

              </button>

            </div>

          </div>

        )}

      </main>

      <BottomNav />

    </div>
  );
}