// src/pages/DashboardPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

import AssignmentCard
  from "../components/dashboard/AssignmentCard";

import { curriculumData }
  from "../data/curriculumData";

import { assignments }
  from "../data/assignmentData";

export default function DashboardPage() {

  const navigate = useNavigate();

  // FLATTEN ALL SUBJECTS
  const curriculumSubjects =
    curriculumData.flatMap(
      (semester) => semester.subjects
    );

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

  // GPA CALCULATION
  const totalCredits =
    curriculumSubjects.reduce(
      (total, subject) =>
        total + subject.credits,
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

  // COMPLETED CREDITS
  const completedCredits =
    curriculumSubjects
      .filter(
        (subject) =>
          subject.status === "COMPLETED"
      )
      .reduce(
        (total, subject) =>
          total + subject.credits,
        0
      );

  // SEMESTER PROGRESS
  const semesterProgress =
    (completedCredits / totalCredits) * 100;

  // COMPLETED ASSIGNMENTS
  const completedAssignments =
    assignmentList.filter(
      (assignment) =>
        assignment.status === "COMPLETED"
    ).length;

  // OVERDUE ASSIGNMENTS
  const overdueAssignments =
    assignmentList.filter(
      (assignment) => {

        const today =
          new Date();

        const due =
          new Date(
            assignment.dueDate
          );

        return (
          due < today &&
          assignment.status !==
            "COMPLETED"
        );

      }
    ).length;

  // GPA TREND
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

  // TARGET
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

    const { name, value } =
      event.target;

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

        {/* KPI GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

          {/* GPA */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Current GPA
            </p>

            <h2 className="text-5xl font-bold mt-6 text-[#5E7A8C]">
              {currentGPA.toFixed(2)}
            </h2>

          </div>

          {/* CREDITS */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Credits
            </p>

            <h2 className="text-5xl font-bold mt-6 text-[#1F2933]">
              {completedCredits}
            </h2>

          </div>

          {/* PROGRESS */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Semester
            </p>

            <h2 className="text-5xl font-bold mt-6 text-[#1F2933]">
              {semesterProgress.toFixed(0)}%
            </h2>

          </div>

          {/* COMPLETED */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Completed
            </p>

            <h2 className="text-5xl font-bold mt-6 text-green-600">
              {completedAssignments}
            </h2>

          </div>

          {/* OVERDUE */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Overdue
            </p>

            <h2 className="text-5xl font-bold mt-6 text-red-500">
              {overdueAssignments}
            </h2>

          </div>

        </div>

        {/* ANALYTICS */}
        <section className="mb-14">

          <div className="grid lg:grid-cols-2 gap-6">

            {/* GPA TREND */}
            <div className="bg-[#2D3748] text-white rounded-3xl p-8">

              <p className="uppercase tracking-widest text-sm text-white/60">
                GPA Analytics
              </p>

              <h2 className="text-3xl font-bold mt-3 mb-8">
                GPA Trend
              </h2>

              <div className="space-y-6">

                {gpaTrend.map(
                  (item, index) => (

                    <div key={index}>

                      <div className="flex justify-between mb-2">

                        <span>
                          {item.semester}
                        </span>

                        <span>
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

                  )
                )}

              </div>

            </div>

            {/* TARGET */}
            <div className="bg-[#1F2933] text-white rounded-3xl p-8 flex flex-col justify-between">

              <div>

                <p className="uppercase tracking-widest text-sm text-white/60">
                  Academic Goal
                </p>

                <h2 className="text-4xl font-bold mt-4">
                  {academicTarget}
                </h2>

                <p className="text-white/70 mt-4">

                  You are currently on track
                  for
                  {" "}
                  {academicTarget}.

                </p>

              </div>

              <button
                onClick={() =>
                  navigate("/target-model")
                }
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

              <h2 className="text-3xl font-bold text-[#1F2933]">
                Upcoming Assignments
              </h2>

              <p className="text-gray-500 mt-2">
                Track deadlines and progress.
              </p>

            </div>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="bg-[#5E7A8C] text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
            >

              Add Assignment

            </button>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {assignmentList.map(
              (assignment, index) => (

                <AssignmentCard
                  key={index}
                  title={assignment.title}
                  subject={assignment.subject}
                  dueDate={assignment.dueDate}
                  progress={assignment.progress}
                  status={assignment.status}
                />

              )
            )}

          </div>

        </section>

      </main>

      <BottomNav />

    </div>
  );
}