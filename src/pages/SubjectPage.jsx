// src/pages/SubjectPage.jsx

import { useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

import subjectAssessments
  from "../data/subjectData";

import { curriculumData }
  from "../data/curriculumData";

export default function SubjectPage() {

  const { code } = useParams();

  // FLATTEN SUBJECTS
  const allSubjects =
    curriculumData.flatMap(
      (semester) => semester.subjects
    );

  // FIND CURRENT SUBJECT
  const subject =
    allSubjects.find(
      (s) => s.code === code
    );

  // LOAD SAVED DATA
  const [assessmentData, setAssessmentData] =
    useState(() => {

      const savedData =
        localStorage.getItem(
          `subject-${code}`
        );

      return savedData
        ? JSON.parse(savedData)
        : subjectAssessments[code] || [];

    });

  // CALCULATE SCORE
  const weightedScore =
    assessmentData.reduce(
      (total, item) => {

        return total + (
          item.score * item.weight
        ) / 100;

      },
      0
    );

  // KOREAN 4.5 GPA SYSTEM
  let predictedGrade = "F";
  let predictedGPA = 0.0;

  if (weightedScore >= 95) {
    predictedGrade = "A+";
    predictedGPA = 4.5;
  }
  else if (weightedScore >= 90) {
    predictedGrade = "A0";
    predictedGPA = 4.0;
  }
  else if (weightedScore >= 85) {
    predictedGrade = "B+";
    predictedGPA = 3.5;
  }
  else if (weightedScore >= 80) {
    predictedGrade = "B0";
    predictedGPA = 3.0;
  }
  else if (weightedScore >= 75) {
    predictedGrade = "C+";
    predictedGPA = 2.5;
  }
  else if (weightedScore >= 70) {
    predictedGrade = "C0";
    predictedGPA = 2.0;
  }
  else if (weightedScore >= 65) {
    predictedGrade = "D+";
    predictedGPA = 1.5;
  }
  else if (weightedScore >= 60) {
    predictedGrade = "D0";
    predictedGPA = 1.0;
  }

  // EDIT FIELD
  function handleFieldChange(
    index,
    field,
    value
  ) {

    const updatedData =
      [...assessmentData];

    updatedData[index][field] =
      field === "title" ||
      field === "subtitle"
        ? value
        : Number(value);

    setAssessmentData(updatedData);
  }

  // DELETE
  function handleDelete(index) {

    const updatedData =
      assessmentData.filter(
        (_, i) => i !== index
      );

    setAssessmentData(updatedData);
  }

  // ADD
  function handleAddAssessment() {

    setAssessmentData([
      ...assessmentData,

      {
        title: "New Assessment",
        subtitle: "Description",
        weight: 0,
        score: 0,
      },
    ]);
  }

  // SAVE
  function handleSaveProgress() {

    localStorage.setItem(
      `subject-${code}`,
      JSON.stringify(assessmentData)
    );

    alert("Progress saved!");
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">

      <Header />

      <main className="max-w-[1120px] mx-auto p-6">

        {/* HEADER */}
        <div className="mb-10">

          <span className="uppercase tracking-widest text-sm text-[#5E7A8C]">
            Course Details
          </span>

          <h1 className="text-5xl font-bold mt-3">

            {subject?.title || "Subject"}

          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl">

            {subject?.type}
            {" • "}
            {subject?.code}

          </p>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-semibold">
                  Weightage Breakdown
                </h2>

                <button
                  onClick={handleAddAssessment}
                  className="bg-[#5E7A8C] text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
                >

                  Add Assessment

                </button>

              </div>

              {/* ASSESSMENT LIST */}
              <div className="space-y-6">

                {assessmentData.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="border border-[#D9E3E8] rounded-2xl p-5"
                    >

                      <div className="grid md:grid-cols-2 gap-4">

                        {/* TITLE */}
                        <input
                          type="text"
                          value={item.title}
                          onChange={(event) =>
                            handleFieldChange(
                              index,
                              "title",
                              event.target.value
                            )
                          }
                          className="border border-[#D9E3E8] rounded-xl px-4 py-3"
                        />

                        {/* SUBTITLE */}
                        <input
                          type="text"
                          value={item.subtitle}
                          onChange={(event) =>
                            handleFieldChange(
                              index,
                              "subtitle",
                              event.target.value
                            )
                          }
                          className="border border-[#D9E3E8] rounded-xl px-4 py-3"
                        />

                        {/* WEIGHT */}
                        <input
                          type="number"
                          value={item.weight}
                          onChange={(event) =>
                            handleFieldChange(
                              index,
                              "weight",
                              event.target.value
                            )
                          }
                          placeholder="Weight %"
                          className="border border-[#D9E3E8] rounded-xl px-4 py-3"
                        />

                        {/* SCORE */}
                        <input
                          type="number"
                          value={item.score}
                          onChange={(event) =>
                            handleFieldChange(
                              index,
                              "score",
                              event.target.value
                            )
                          }
                          placeholder="Score %"
                          className="border border-[#D9E3E8] rounded-xl px-4 py-3"
                        />

                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(index)
                        }
                        className="mt-4 text-red-500 text-sm hover:underline"
                      >

                        Remove Assessment

                      </button>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-[#5E7A8C] text-white rounded-2xl p-6 sticky top-24">

              <p className="uppercase tracking-widest text-sm text-white/70">
                Current Standing
              </p>

              {/* PERCENTAGE */}
              <h2 className="text-5xl font-bold mt-4">

                {weightedScore.toFixed(1)}%

              </h2>

              {/* LETTER GRADE */}
              <p className="mt-4 text-2xl font-semibold">

                {predictedGrade}

              </p>

              {/* GPA */}
              <p className="mt-2 text-white/80">

                GPA:
                {" "}
                {predictedGPA.toFixed(1)}
                {" / 4.5"}

              </p>

              {/* TOTAL WEIGHT */}
              <div className="mt-8">

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-white/70">
                    Total Weightage
                  </span>

                  <span>

                    {assessmentData.reduce(
                      (total, item) =>
                        total + item.weight,
                      0
                    )}%

                  </span>

                </div>

                {/* BAR */}
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">

                  <div
                    className="bg-white h-full rounded-full"
                    style={{
                      width: `${assessmentData.reduce(
                        (total, item) =>
                          total + item.weight,
                        0
                      )}%`,
                    }}
                  />

                </div>

              </div>

              {/* SAVE */}
              <button
                onClick={handleSaveProgress}
                className="w-full mt-8 bg-white text-[#5E7A8C] py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >

                Save Progress

              </button>

            </div>

          </div>

        </div>

      </main>

      <BottomNav />

    </div>
  );
}