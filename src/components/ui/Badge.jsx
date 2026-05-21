export default function Badge({
  children,
  color = "bg-gray-100",
  text = "text-gray-700",
}) {
  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${color}
        ${text}
      `}
    >
      {children}
    </span>
  );
}