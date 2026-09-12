import { createElement } from "react";
import { NavLink } from "react-router";

import logoLight from "../assets/logo.png";
import { nav } from "../data/nav.js";

export default function Header() {
  return (
    <div className="hidden w-[17%] bg-linear-to-br from-purple-900 via-violet-900 to-fuchsia-800 px-4 py-8 text-white tablet:flex tablet:flex-col">
      <div>
        <img
          src={logoLight}
          alt="HomeAid Logo"
          className="mx-auto mb-12 rounded-xl"
        />
      </div>

      <nav>
        <ul className="space-y-2">
          {nav.map((item) => {
            const path = item.title === "Home" ? "/dashboard" : `/${item.title}`;

            return (
              <li key={item.title}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-lg border border-none p-2 transition-all duration-300 hover:border-2 hover:bg-purple-700 ${
                      isActive ? "bg-purple-700 text-purple-300" : "text-white"
                    }`
                  }
                >
                  {createElement(item.icon, { className: "h-5 w-5" })}
                  <span className="text-sm font-semibold">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}