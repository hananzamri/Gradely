export default function StatsCard({
  title,
  value,
  subtitle,
}) {

  return (
    <div className="bg-white rounded-xl border border-[#D9E3E8] p-6">

      <p className="uppercase tracking-widest text-xs text-gray-500">

        {title}

      </p>

      <h2 className="text-4xl font-bold text-[#5E7A8C] mt-4">

        {value}

      </h2>

      <p className="text-gray-500 mt-2 text-sm">

        {subtitle}

      </p>

    </div>
  );
}