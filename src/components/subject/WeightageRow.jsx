export default function WeightageRow({
  title,
  subtitle,
  weight,
  initialScore,
  onChange,
}) {

  return (
    <div className="grid md:grid-cols-12 gap-4 items-center">

      <div className="md:col-span-5">

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {subtitle}
        </p>

      </div>

      <div className="md:col-span-2">

        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {weight}%
        </span>

      </div>

      <div className="md:col-span-5">

        <input
          type="number"
          value={initialScore}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-b-2 border-gray-300 p-2 outline-none"
        />

      </div>

    </div>
  );
}