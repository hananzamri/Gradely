import Header from "../components/layout/Header";

export default function LoginPage() {

  function handleDemoLogin() {

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    window.location.href =
      "/profile";
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex justify-center items-center px-6">

      <div className="bg-white rounded-3xl p-10 border border-[#D9E3E8] w-full max-w-md shadow-lg">

        <h1 className="text-center text-4xl font-bold text-[#1F2933]">
          Welcome
        </h1>
        <p className="text-center text-gray-500, mt-2">
          Log in to track your academic journey
        </p>

        <div className="mt-8">
          <label className="block text-sm font medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font medium text-gray-700 mb-2">
            Password
          </label>
          <input
          type="password"
          placeholder="Input password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
          />
        </div>

        {/* add forgot password pop up? add sign up page?*/}

        <button
          onClick={handleDemoLogin}
          className="w-full mt-8 bg-[#5E7A8C] text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
        >

          Sign In

        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">
            OR
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleDemoLogin}
          className="w-full bg-[#5E7A8C] text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
        >

          Sign in with University Portal

        </button>

      </div>

    </div>
  );
}