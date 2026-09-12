import { nav } from "../data/nav.js";
import { createElement } from "react";
import { NavLink } from "react-router";


export default function NavMobile() {
  return (
    <nav className="fixed bottom-2 backdrop-blur-lg  tablet:hidden px-4 py-2 w-screen overflow-hidden">
      <ul className="flex justify-between xs:justify-center xs:gap-6 gap-1 object-contain  overflow-scroll">
        {nav.map((item) => {
          return (
            <li key={item.title}>
              <NavLink
                to={item.title === "Home" ? "/dashboard" : `/${item.title}`}
                className={({ isActive }) =>
                  `flex items-center flex-col gap-1 object-center rounded-lg p-1 text-gray-500 transition-all duration-300 hover:text-purple-700 ${
                    isActive ? "text-purple-700" : ""
                  }`
                }
              >
                {createElement(item.icon, { className: "h-5 w-5" })}
                <span className="text-[10px] font-bold">{item.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
