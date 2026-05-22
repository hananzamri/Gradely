export default function AssignmentCard({
  title,
  subject,
  dueDate,
  progress,
  status,
}) {

  const today =
    new Date();

  const due =
    new Date(dueDate);

  const differenceInTime =
    due - today;

  const daysLeft =
    Math.ceil(
      differenceInTime /
      (1000 * 60 * 60 * 24)
    );

  function getStatusColor() {

    if (status === "COMPLETED") {
      return "bg-green-100 text-green-700";
    }

    return "bg-yellow-100 text-yellow-700";
  }

  function getUrgencyColor() {

    if (status === "COMPLETED") {
      return "bg-green-100 text-green-700";
    }

    if (daysLeft < 0) {
      return "bg-red-100 text-red-700";
    }

    if (daysLeft <= 3) {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-blue-100 text-blue-700";
  }

  function getUrgencyText() {

    if (status === "COMPLETED") {
      return "Completed";
    }

    if (daysLeft < 0) {
      return "Overdue";
    }

    if (daysLeft === 0) {
      return "Due Today";
    }

    if (daysLeft <= 3) {
      return `${daysLeft} Days Left`;
    }

    return "On Track";
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D9E3E8] p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300">

      <div className="flex justify-between items-start mb-5">

        <div>

          <h3 className="text-lg font-semibold text-[#1F2933]">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {subject}
          </p>

        </div>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor()}`}
        >

          {status}

        </span>

      </div>

      {/* URGENCY BADGE */}
      <div className="mb-6">

        <span
          className={`text-xs font-bold px-3 py-2 rounded-full ${getUrgencyColor()}`}
        >

          {getUrgencyText()}

        </span>

      </div>

      {/* PROGRESS */}
      <div>

        <div className="flex justify-between text-sm mb-2">

          <span className="text-gray-500">
            Progress
          </span>

          <span className="font-medium text-[#1F2933]">
            {progress}%
          </span>

        </div>

        <div className="w-full h-3 bg-[#EEF4F7] rounded-full overflow-hidden">

          <div
            className="h-full bg-[#5E7A8C] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />

        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-6 flex justify-between items-center">

        <p className="text-sm text-gray-500">
          Due Date
        </p>

        <p className="font-semibold text-[#1F2933]">
          {dueDate}
        </p>

      </div>

    </div>
  );
}