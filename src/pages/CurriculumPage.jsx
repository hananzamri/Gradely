import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

import { curriculumData }
  from "../data/curriculumData";

export default function CurriculumPage() {

  const navigate = useNavigate();

  const [semesterData, setSemesterData] =
    useState(curriculumData);

  const [searchTerm, setSearchTerm] =
    useState("");

  // ADD SEMESTER
  function handleAddSemester() {

    const semesterName =
      prompt("Enter semester name");

    if (!semesterName) return;

    setSemesterData([
      ...semesterData,

      {
        semester: semesterName,
        subjects: [],
      },
    ]);
  }

  // ADD SUBJECT
  function handleAddSubject(semesterIndex) {

    const title =
      prompt("Subject title");

    if (!title) return;

    const code =
      prompt("Subject code");

    const updatedData =
      [...semesterData];

    updatedData[semesterIndex]
      .subjects
      .push({

        title,
        code,

        type: "CORE",
        credits: 3,
        grade: 0,
        status: "IN PROGRESS",

      });

    setSemesterData(updatedData);
  }

  // CALCULATE SAVED GPA
  function getCalculatedGrade(code) {

    const savedData =
      localStorage.getItem(
        `subject-${code}`
      );

    if (!savedData) return null;

    const assessments =
      JSON.parse(savedData);

    const weightedScore =
      assessments.reduce(
        (total, item) => {

          return total + (
            item.score * item.weight
          ) / 100;

        },
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
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">

      <Header />

      <main className="max-w-[1120px] mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center gap-4 flex-wrap mb-10">

          <div>

            <h1 className="text-5xl font-bold text-[#5E7A8C]">
              Curriculum
            </h1>

            <p className="text-gray-500 mt-3">
              Organize your semesters and subjects.
            </p>

          </div>

          <button
            onClick={handleAddSemester}
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
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            className="w-full bg-white border border-[#D9E3E8] rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#5E7A8C]"
          />

        </div>

        {/* SEMESTERS */}
        <div className="space-y-10">

          {semesterData.map(
            (semester, semesterIndex) => {

              const filteredSubjects =
                semester.subjects.filter(
                  (subject) =>

                    subject.title
                      .toLowerCase()
                      .includes(
                        searchTerm.toLowerCase()
                      )

                );

              return (

                <section
                  key={semesterIndex}
                  className="bg-white rounded-3xl border border-[#D9E3E8] p-8"
                >

                  {/* SEMESTER HEADER */}
                  <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

                    <div>

                      <h2 className="text-3xl font-bold text-[#1F2933]">

                        {semester.semester}

                      </h2>

                      <p className="text-gray-500 mt-2">

                        {semester.subjects.length}
                        {" "}
                        Subjects

                      </p>

                    </div>

                    <button
                      onClick={() =>
                        handleAddSubject(
                          semesterIndex
                        )
                      }
                      className="bg-[#EEF4F7] text-[#5E7A8C] px-5 py-3 rounded-xl hover:bg-[#DCE7ED] transition"
                    >

                      Add Subject

                    </button>

                  </div>

                  {/* SUBJECTS */}
                  {filteredSubjects.length > 0 ? (

                    <div className="grid md:grid-cols-2 gap-6">

                      {filteredSubjects.map(
                        (subject, index) => (

                          <div
                            key={index}
                            onClick={() =>
                              navigate(
                                `/subject/${subject.code}`
                              )
                            }
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

                                <p className="text-gray-500 mt-3">

                                  {subject.code}

                                </p>

                              </div>

                              <div className="text-right">

                                <h2 className="text-3xl font-bold text-[#5E7A8C]">

                                  {
                                    getCalculatedGrade(
                                      subject.code
                                    )
                                    || subject.grade.toFixed(1)
                                  }

                                </h2>

                                <p className="text-sm text-gray-400 mt-1">

                                  GPA

                                </p>

                              </div>

                            </div>

                            <div className="mt-6 flex justify-between items-center">

                              <span className="text-sm text-gray-500">

                                {subject.credits}
                                {" "}
                                Credits

                              </span>

                              <span className={`text-sm px-3 py-1 rounded-full ${
                                subject.status === "COMPLETED"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}>

                                {subject.status}

                              </span>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  ) : (

                    <div className="bg-[#F4F7F9] rounded-2xl p-10 text-center">

                      <h3 className="text-2xl font-semibold text-[#1F2933]">

                        No subjects found

                      </h3>

                      <p className="text-gray-500 mt-3">

                        Try another keyword.

                      </p>

                    </div>

                  )}

                </section>

              );
            }
          )}

        </div>

      </main>

      <BottomNav />

    </div>
  );
}