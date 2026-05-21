import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import SubjectCard from "../components/curriculum/SubjectCard";

import { curriculumSubjects }
  from "../data/curriculumData";

export default function CurriculumPage() {

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">

      <Header />

      <main className="max-w-[1120px] mx-auto p-6">

        {/* PAGE HEADER */}
        <div className="flex justify-between items-end mb-10">

          <div>

            <h1 className="text-5xl font-bold text-[#5E7A8C]">
              Curriculum Overview
            </h1>

            <p className="text-gray-500 mt-3 max-w-2xl">
              Manage your academic journey across semesters.
            </p>

          </div>

          <div className="flex gap-3">

            <button className="border border-gray-300 px-5 py-3 rounded-xl bg-white">

              Add Semester

            </button>

            <button className="bg-[#5E7A8C] text-white px-5 py-3 rounded-xl">

              Add Subject

            </button>

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
              18 Credits Total
            </span>

          </div>

          {/* SUBJECT GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {curriculumSubjects.map((subject, index) => (
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

        </section>

      </main>

      <BottomNav />

    </div>
  );
}