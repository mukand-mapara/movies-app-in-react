import React from "react";
import { mobileNavigation } from "../contants/navigation";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <nav className="lg:hidden h-14 bg-neutral-900/90 fixed bottom-0 w-full z-40">
      <div className="flex justify-around items-center h-full text-neutral-400">
        {mobileNavigation.map((nav) => (
          <NavLink
            key={nav.label}
            to={nav.href}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-white" : "text-neutral-400"
              }`
            }
          >
            <div className="text-2xl">{nav.icon}</div>
            <span className="capitalize">{nav.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
