import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  function handleProfileClick() {

    if (isLoggedIn) {
      navigate("/profile");
    }
    else {
      navigate("/login");
    }
  }

  return (
    <header className="bg-white border-b border-[#D9E3E8] px-6 py-4 sticky top-0 z-50">

      <div className="flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">

          {/* PROFILE BUTTON */}
          <button
            onClick={handleProfileClick}
            className="w-10 h-10 rounded-full bg-[#E8F0F5] flex items-center justify-center hover:bg-[#D9E3E8] transition"
          >

            <span className="text-sm font-semibold text-[#5E7A8C]">
              H
            </span>

          </button>

          {/* APP NAME */}
          <h1 className="text-lg font-bold text-[#5E7A8C] font-lexend">
            Gradely
          </h1>

        </div>

        {/* RIGHT SIDE */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition text-[#5E7A8C]">

          <FiBell size={22} />

        </button>

      </div>

    </header>
  );
}