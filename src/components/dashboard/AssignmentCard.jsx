// src/components/dashboard/AssignmentCard.jsx

export default function AssignmentCard({
  title,
  subject,
  dueDate,
  progress,
  status,
  onToggleStatus,
  onDelete,
}) {
  const isCompleted = status === "COMPLETED";

  // Due date formatting + overdue check
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = due < today && !isCompleted;
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  function dueDateLabel() {
    if (isCompleted) return "Completed";
    if (isOverdue) return `Overdue by ${Math.abs(diffDays)}d`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays}d`;
  }

  const dueLabelColor = isCompleted
    ? "text-green-600 bg-green-50"
    : isOverdue
    ? "text-red-500 bg-red-50"
    : diffDays <= 2
    ? "text-orange-500 bg-orange-50"
    : "text-gray-500 bg-gray-100";

  return (
    <div
      className={`bg-white rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 ${
        isCompleted ? "border-green-200 opacity-80" : "border-[#D9E3E8]"
      }`}
    >
      {/* TOP ROW */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-widest text-[#5E7A8C] truncate">
            {subject}
          </p>
          <h3
            className={`text-lg font-bold mt-1 leading-snug ${
              isCompleted ? "line-through text-gray-400" : "text-[#1F2933]"
            }`}
          >
            {title}
          </h3>
        </div>

        {/* Delete button */}
        <button
          onClick={onDelete}
          className="text-gray-300 hover:text-red-400 transition shrink-0 mt-0.5"
          title="Delete assignment"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Progress</span>
          <span>{isCompleted ? 100 : progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted ? "bg-green-400" : "bg-[#5E7A8C]"
            }`}
            style={{ width: `${isCompleted ? 100 : progress}%` }}
          />
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex justify-between items-center">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${dueLabelColor}`}>
          {dueDateLabel()}
        </span>

        {/* Toggle done button */}
        <button
          onClick={onToggleStatus}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-200 ${
            isCompleted
              ? "border-green-300 bg-green-50 text-green-600 hover:bg-green-100"
              : "border-[#D9E3E8] text-gray-500 hover:border-[#5E7A8C] hover:text-[#5E7A8C] hover:bg-[#EEF4F7]"
          }`}
        >
          {isCompleted ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Done
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="9" />
              </svg>
              Mark done
            </>
          )}
        </button>
      </div>
    </div>
  );
}
