import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiBookOpen, FiPlusSquare } from "react-icons/fi";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiGrid size={20} />,
    },
    {
      name: "Subjects",
      path: "/curriculum",
      icon: <FiBookOpen size={20} />,
    },
    {
      name: "Calculator",
      path: "/calculator",
      icon: <FiPlusSquare size={20} />,
    },
    {
      name: "Target",
      path: "/target-model",
      icon: <FiPlusSquare size={20} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around bg-white border-t py-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-[#5E7A8C]" : "text-gray-400"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}