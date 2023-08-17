// @ts-nocheck
import { forwardRef } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
const SideBar = forwardRef(({ showNav, setShowNav }, ref) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div ref={ref} className="fixed w-56 h-full bg-white z-50">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img className="w-32 h-auto" src={logo} alt="logo" />
        </picture>
      </div>

      <div className="flex flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames(
              isActive
                ? "pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-[#d5bdaf] text-white"
                : "pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-[#023e8a] hover:bg-[#d5bdaf] hover:text-white "
            )
          }
        >
          <div className="mr-2">
            <UserIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Dashboard</p>
          </div>
        </NavLink>

        <NavLink
          to="/users"
          title={"user"}
          className={({ isActive }) =>
            classNames(
              isActive
                ? "pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-[#d5bdaf] text-white"
                : "pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-[#023e8a] hover:bg-[#d5bdaf] hover:text-white "
            )
          }
        >
          <div className="mr-2">
            <UserIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Users</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
