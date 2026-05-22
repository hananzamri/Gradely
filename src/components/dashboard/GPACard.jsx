import Card from "../ui/Card";

import { curriculumSubjects }
  from "../../data/curriculumData";

export default function GPACard() {

  // GPA CALCULATION
  const totalPoints =
    curriculumSubjects.reduce((total, subject) => {

      return total + (subject.grade * subject.credits);

    }, 0);

  const totalCredits =
    curriculumSubjects.reduce((total, subject) => {

      return total + subject.credits;

    }, 0);

  const currentGPA =
    (totalPoints / totalCredits).toFixed(2);

  // GPA PROGRESS
  const gpaPercentage =
    (currentGPA / 4.5) * 100;

  return (
    <Card>

      {/* TOP */}
      <div className="flex justify-between items-start mb-8">

        <div>

          <p className="uppercase text-xs tracking-[0.3em] text-gray-400">
            Current GPA
          </p>

          <h2 className="text-6xl font-bold text-[#5E7A8C] mt-4">
            {currentGPA}
          </h2>

          <p className="text-gray-400 mt-2">
            out of 4.5
          </p>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#EEF4F7] flex items-center justify-center">

          <span className="material-symbols-outlined text-[#5E7A8C] text-3xl">
            school
          </span>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="pt-6 border-t border-gray-100">

        <div className="flex justify-between text-sm mb-3">

          <span className="text-gray-500">
            GPA Progress
          </span>

          <span className="font-medium">
            {gpaPercentage.toFixed(0)}%
          </span>

        </div>

        <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">

          <div
            className="h-full rounded-full bg-[#5E7A8C] transition-all duration-500"
            style={{ width: `${gpaPercentage}%` }}
          />

        </div>

      </div>

    </Card>
  );
}