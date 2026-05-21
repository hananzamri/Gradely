import { Link } from "react-router-dom";

export default function SubjectCard({
  title,
  code,
  type,
  credits,
  grade,
  status,
}) {
  return (
    <Link to={`/subject/${code}`}>
      <div className="bg-white rounded-xl border border-[#D9E3E8] p-6 hover:shadow-md transition">

        <div className="flex justify-between items-start mb-4">

          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm tracking-widest text-gray-500 mt-1">
              {code} • {type}
            </p>
          </div>

          <span className="bg-[#EAF4EC] text-[#4A654E] text-xs font-bold px-3 py-1 rounded">
            {status}
          </span>

        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-500">{credits} Credits</span>
          <span className="font-bold text-[#5E7A8C]">{grade}</span>
        </div>

      </div>
    </Link>
  );
}