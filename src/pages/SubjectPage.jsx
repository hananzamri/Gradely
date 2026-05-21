import { useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import WeightageRow from "../components/subject/WeightageRow";
import { assessments } from "../data/subjectData";
import { curriculumSubjects } from "../data/curriculumData";

export default function SubjectPage() {
  const { code } = useParams();

  // find subject based on URL
  const subject = curriculumSubjects.find(
    (s) => s.code === code
  );

  const [assessmentData, setAssessmentData] =
    useState(assessments);

  const weightedScore =
    assessmentData.reduce((total, item) => {
      return total + (item.score * item.weight) / 100;
    }, 0);

  let predictedGrade = "F";

  if (weightedScore >= 85) predictedGrade = "A";
  else if (weightedScore >= 75) predictedGrade = "B";
  else if (weightedScore >= 65) predictedGrade = "C";
  else if (weightedScore >= 50) predictedGrade = "D";

  function handleScoreChange(index, value) {
    const updatedData = [...assessmentData];
    updatedData[index].score = Number(value);
    setAssessmentData(updatedData);
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
            {subject?.type} • {subject?.code}
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">

            <div className="bg-white rounded-xl border border-[#D9E3E8] p-6">

              <h2 className="text-2xl font-semibold mb-6">
                Weightage Breakdown
              </h2>

              <div className="space-y-6">

                {assessmentData.map((item, index) => (
                  <WeightageRow
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    weight={item.weight}
                    initialScore={item.score}
                    onChange={(value) =>
                      handleScoreChange(index, value)
                    }
                  />
                ))}

              </div>

            </div>
          </div>

          <div>
            <div className="bg-[#5E7A8C] text-white rounded-xl p-6 sticky top-24">

              <h2 className="text-5xl font-bold mt-4">
                {weightedScore.toFixed(1)}%
              </h2>

              <p className="mt-3 text-white/80">
                Predicted Grade: {predictedGrade}
              </p>

            </div>
          </div>

        </div>

      </main>

      <BottomNav />

    </div>
  );
}