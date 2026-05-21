import { FiBell } from "react-icons/fi";

export default function Header() {
  return (
    <header className="bg-white border-b border-[#D9E3E8] px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-3">

          {/* Profile Circle */}
          <button className="w-10 h-10 rounded-full bg-[#E8F0F5] flex items-center justify-center hover:bg-[#D9E3E8] transition">
          </button>

          {/* App Name */}
          <h1 className="text-lg font-bold text-[#5E7A8C] font-lexend">
            Gradely
          </h1>
        </div>

        {/* Notification Icon */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition text-[#5E7A8C]">
          <FiBell size={22} />
        </button>

      </div>
    </header>
  );
}