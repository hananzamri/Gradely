export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-white
        border
        border-[#D9E3E8]
        rounded-xl
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}