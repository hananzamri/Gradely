import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";

export default function TargetModelPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      <Header />

      <main className="max-w-[1120px] mx-auto p-6">
        <h1 className="text-4xl font-bold text-[#5E7A8C]">
          Target Model
        </h1>

        <p className="text-gray-500 mt-3">
          This page is under development.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}