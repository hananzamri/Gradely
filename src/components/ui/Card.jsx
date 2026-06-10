export default function Card({ children }) {

  return (
    <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:shadow-lg transition duration-300">

      {children}

    </div>
  );
}