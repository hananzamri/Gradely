import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import GPACard from "../components/dashboard/GPACard";

<GPACard />

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">

      <Header />

      <main className="max-w-[1120px] mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* GPA CARD */}
          <div className="md:col-span-4 bg-white rounded-xl p-6 border border-[#D9E3E8]">

            <div className="flex justify-between mb-6">
              <span className="uppercase text-xs tracking-widest text-gray-500">
                Current GPA
              </span>

              <span className="material-symbols-outlined text-[#5E7A8C]">
                stars
              </span>
            </div>

            <div className="flex items-end gap-2">
              <h2 className="text-6xl font-bold text-[#5E7A8C]">
                3.85
              </h2>

              <span className="text-gray-500 mb-2">/4.0</span>
            </div>

          </div>

          {/* TREND CARD */}
          <div className="md:col-span-8 bg-white rounded-xl p-6 border border-[#D9E3E8]">

            <h3 className="text-xl font-semibold mb-6">
              GPA Trend
            </h3>

            <div className="h-32 bg-[#F3F4F5] rounded-xl"></div>

          </div>

        </div>

      </main>

      <BottomNav />

    </div>
  );
}