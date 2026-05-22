import { useState } from "react";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import SubjectCard from "../components/curriculum/SubjectCard";

import { curriculumSubjects }
  from "../data/curriculumData";

export default function CurriculumPage() {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [sortOption, setSortOption] =
    useState("name-asc");

  const filteredSubjects =
    curriculumSubjects
      .filter((subject) => {

        const matchesSearch =
          subject.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "ALL"
          || subject.status === statusFilter;

        return matchesSearch && matchesStatus;
      })

      .sort((a, b) => {

        if (sortOption === "name-asc") {
          return a.title.localeCompare(b.title);
        }

        if (sortOption === "name-desc") {
          return b.title.localeCompare(a.title);
        }

        if (sortOption === "gpa-high") {
          return b.grade - a.grade;
        }

        if (sortOption === "gpa-low") {
          return a.grade - b.grade;
        }

        if (sortOption === "credits-high") {
          return b.credits - a.credits;
        }

        if (sortOption === "credits-low") {
          return a.credits - b.credits;
        }

        return 0;
      });

  const totalSubjects =
    curriculumSubjects.length;

  const completedSubjects =
    curriculumSubjects.filter(
      (subject) => subject.status === "COMPLETED"
    ).length;

  const activeSubjects =
    curriculumSubjects.filter(
      (subject) => subject.status === "IN PROGRESS"
    ).length;

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

  const semesterGPA =
    weightedGradePoints / totalCredits;

  let academicStanding =
    "Needs Improvement";

  if (semesterGPA >= 4.0) {
    academicStanding = "Excellent";
  }
  else if (semesterGPA >= 3.5) {
    academicStanding = "Very Good";
  }
  else if (semesterGPA >= 3.0) {
    academicStanding = "Good";
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">

      <Header />

      <main className="max-w-[1120px] mx-auto p-6">

        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold text-[#5E7A8C]">
              Curriculum Overview
            </h1>

            <p className="text-gray-500 mt-3 max-w-2xl">
              Manage your academic journey across semesters.
            </p>

          </div>

          <div className="flex gap-3">

            <button className="border border-gray-300 px-5 py-3 rounded-xl bg-white hover:bg-gray-50 transition">

              Add Semester

            </button>

            <button className="bg-[#5E7A8C] text-white px-5 py-3 rounded-xl hover:opacity-90 transition">

              Add Subject

            </button>

          </div>

        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">

          <input
            type="text"
            placeholder="Search by subject name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white border border-[#D9E3E8] rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-[#D9E3E8] rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
          >

            <option value="ALL">
              All Status
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="IN PROGRESS">
              In Progress
            </option>

            <option value="NOT STARTED">
              Not Started
            </option>

          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white border border-[#D9E3E8] rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
          >

            <option value="name-asc">
              Name (A-Z)
            </option>

            <option value="name-desc">
              Name (Z-A)
            </option>

            <option value="gpa-high">
              Highest GPA
            </option>

            <option value="gpa-low">
              Lowest GPA
            </option>

            <option value="credits-high">
              Highest Credits
            </option>

            <option value="credits-low">
              Lowest Credits
            </option>

          </select>

        </div>

        {/* RESULT COUNT */}
        <p className="text-sm text-gray-500 mb-8">

          Showing {filteredSubjects.length} of {totalSubjects} subjects

        </p>

        {/* STATISTICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

          {/* TOTAL SUBJECTS */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:shadow-lg transition">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Total Subjects
            </p>

            <h2 className="text-4xl font-bold mt-4 text-[#1F2933]">
              {totalSubjects}
            </h2>

          </div>

          {/* COMPLETED */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:shadow-lg transition">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Completed
            </p>

            <h2 className="text-4xl font-bold mt-4 text-green-600">
              {completedSubjects}
            </h2>

          </div>

          {/* ACTIVE */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:shadow-lg transition">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Active Subjects
            </p>

            <h2 className="text-4xl font-bold mt-4 text-[#5E7A8C]">
              {activeSubjects}
            </h2>

          </div>

          {/* TOTAL CREDITS */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:shadow-lg transition">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Total Credits
            </p>

            <h2 className="text-4xl font-bold mt-4 text-[#1F2933]">
              {totalCredits}
            </h2>

          </div>

          {/* SEMESTER GPA */}
          <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:shadow-lg transition">

            <p className="text-sm uppercase tracking-widest text-gray-400">
              Semester GPA
            </p>

            <h2 className="text-4xl font-bold mt-4 text-[#5E7A8C]">

              {semesterGPA.toFixed(2)}

            </h2>

            <p className="mt-3 text-sm text-gray-500">

              {academicStanding}

            </p>

          </div>

        </div>

        {/* SEMESTER SECTION */}
        <section>

          <div className="flex items-center gap-4 mb-6">

            <h2 className="text-2xl font-semibold">
              Year 2 - Semester 1
            </h2>

            <div className="flex-1 h-px bg-gray-300" />

            <span className="bg-gray-100 px-4 py-1 rounded-full text-sm">
              {totalCredits} Credits Total
            </span>

          </div>

          {/* SUBJECT GRID */}
          {filteredSubjects.length > 0 ? (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredSubjects.map((subject, index) => (
                <SubjectCard
                  key={index}
                  title={subject.title}
                  code={subject.code}
                  type={subject.type}
                  credits={subject.credits}
                  grade={subject.grade}
                  status={subject.status}
                />
              ))}

            </div>

          ) : (

            <div className="bg-white border border-[#D9E3E8] rounded-2xl p-12 text-center">

              <h2 className="text-3xl font-bold text-[#1F2933]">
                No subjects found
              </h2>

              <p className="text-gray-500 mt-4 max-w-md mx-auto">
                Try changing your search keyword or filter option.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("ALL");
                }}
                className="mt-8 bg-[#5E7A8C] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
              >

                Reset Filters

              </button>

            </div>

          )}

        </section>

      </main>

      <BottomNav />

    </div>
  );
}