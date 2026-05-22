import { Link } from "react-router-dom";

export default function SubjectCard({
  title,
  code,
  type,
  credits,
  grade,
  status,
}) {

  function getStatusStyles() {

    if (status === "COMPLETED") {
      return "bg-[#EAF4EC] text-[#4A654E]";
    }

    if (status === "IN PROGRESS") {
      return "bg-[#E8F1F8] text-[#4A6A7D]";
    }

    return "bg-gray-100 text-gray-500";
  }

  function getGradeColor() {

    if (grade >= 4.0) {
      return "text-green-600";
    }

    if (grade >= 3.0) {
      return "text-yellow-600";
    }

    return "text-red-500";
  }

  return (
    <Link to={`/subject/${code}`}>

      <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">

        <div className="flex justify-between items-start mb-5">

          <div>

            <h3 className="text-xl font-semibold text-[#1F2933]">
              {title}
            </h3>

            <p className="text-sm tracking-widest text-gray-500 mt-1">
              {code} • {type}
            </p>

          </div>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusStyles()}`}
          >
            {status}
          </span>

        </div>

        <div className="flex justify-between items-center mt-8">

          <span className="text-gray-500">
            {credits} Credits
          </span>

          <span className={`font-bold text-2xl ${getGradeColor()}`}>
            {grade.toFixed(1)}
          </span>

        </div>

      </div>

    </Link>
  );
}