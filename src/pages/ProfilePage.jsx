export default function ProfilePage() {

  function handleLogout() {

    localStorage.removeItem(
      "isLoggedIn"
    );

    window.location.href =
      "/dashboard";
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex justify-center items-center px-6">

      <div className="bg-white rounded-3xl p-10 border border-[#D9E3E8] w-full max-w-md shadow-lg">

        <h1 className="text-4xl font-bold text-[#1F2933]">
          Profile Page
        </h1>

        <p className="text-gray-500 mt-4 leading-relaxed">

          Temporary placeholder page.
          Your teammate can customize this later.

        </p>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
        >

          Logout

        </button>

      </div>

    </div>
  );
}