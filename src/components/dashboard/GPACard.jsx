import Card from "../ui/Card";
import { dashboardData } from "../../data/dashboard";

export default function GPACard() {
  return (
    <Card>

      <div className="flex justify-between mb-6">

        <span className="uppercase text-xs tracking-widest text-gray-500">
          Current GPA
        </span>

        <span className="material-symbols-outlined text-[#5E7A8C]">
          stars
        </span>

      </div>

      <div className="flex items-end gap-2">

        <h2 className="text-6xl font-bold text-[#5E7A8C]">
          {dashboardData.currentGPA}
        </h2>

        <span className="text-gray-500 mb-2">
          /4.0
        </span>

      </div>

    </Card>
  );
}