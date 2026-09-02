import logoDark from "../assets/logo.jpeg";
import logoLight from "../assets/logo.png";
import { nav } from "../data/nav.js";
import { createElement, useState, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoLocationOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsFilterRight } from "react-icons/bs";
import { ArtisanLists } from "../data/ArtisanLists.js";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { ArtisansDetails } from "../data/ArtisansDetails.js";
import pics1 from "../assets/electrician.jpg";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const search = useRef();

  let Notifications = [1, "bola"];
  const timeOfDay = (() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Morning";
    if (currentHour < 17) return "Afternoon";
    return "Evening";
  })();

  return (
    <section className="relative overflow-hidden font-manrope">
      <div className="flex min-h-screen m-1 overflow-hidden">
        <div className="tablet:flex overflow-hidden">
          <div className="hidden w-[17%] bg-linear-to-br from-purple-900 via-violet-900 to-fuchsia-800 px-4 py-8 text-white tablet:flex tablet:flex-col">
            <div>
              <img
                src={logoLight}
                alt="HomeAid Logo"
                className="mb-12  mx-auto rounded-xl "
              />
            </div>

            <nav>
              <ul className="space-y-2">
                {nav.map((i) => (
                  <li
                    key={i.title}
                    className={`flex items-center gap-4 border border-none hover:border-2 hover:bg-purple-700 p-2 rounded-lg active cursor-pointer transition-all duration-300 ${activeTab === i.title ? "bg-purple-700 text-purple-300" : ""}`}
                    onClick={() => {
                      setActiveTab(i.title);
                    }}
                  >
                    {createElement(i.icon, { className: "w-5 h-5" })}
                    <span className="text-sm font-semibold">{i.title}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/*FOR MOBILE SCREEN ONLY  */}
          <nav className="fixed bottom-0 backdrop-blur-lg tablet:hidden px-4 py-2 w-screen overflow-hidden">
            <ul className="flex justify-between xs:justify-center xs:gap-6 gap-1 object-contain  overflow-scroll">
              {nav.map((i) => (
                <li
                  key={i.title}
                  className={`flex items-center flex-col gap-1 object-center text-gray-500  hover:text-purple-700 p-1 rounded-lg active cursor-pointer transition-all duration-300 ${activeTab === i.title ? "text-purple-700" : ""}`}
                  onClick={() => {
                    setActiveTab(i.title);
                  }}
                >
                  {createElement(i.icon, { className: "w-5 h-5" })}
                  <span className="text-[10px] font-bold">{i.title}</span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-1 p-4 md:p-6 min-h-screen overflow-hidden bg-purple-50">
            <div className="flex justify-between ">
              <img
                src={logoDark}
                alt="HomeAid Logo"
                className="rounded-xl w-16 tablet:hidden"
              />

              <div className="bg-white p-2 m-2 rounded-full h-fit relative">
                <IoNotificationsOutline />
                {Notifications.length >= 1 && (
                  <div className="absolute text-[9px] bg-red-600 top-0 -right-1 w-4 h-4 flex items-center justify-center text-white rounded-full font-semibold">
                    {Notifications.length}
                  </div>
                )}
              </div>
            </div>

            <div className="xs:flex  xs:gap-5 items-center">
              <div className="mt-3">
                <p className="text-sm font-medium text-purple-950">
                  Good {timeOfDay},
                </p>
                <h2 className="text-xl font-bold text-purple-800">
                  Nehemiah👋
                </h2>
                <div className="flex items-center gap-2">
                  <FaLocationDot className="w-2 text-purple-800" />
                  <span className="text-gray-500 text-xs">Lagos, Nigeria</span>
                </div>
              </div>

              <div className="flex text-[14px] flex-1 items-center justify-between gap-2 mt-6 bg-white rounded-md p-2 text-purple-700 max-w-148">
                <BiSearchAlt />
                <input
                  type="text"
                  className="flex-1 focus:outline-none"
                  name="search"
                  id="search"
                  value={search.value}
                  placeholder="Search for an artisan"
                />
                <button className="p-1 shadow-sm cursor-pointer rounded-full hover:bg-purple-50">
                  <BsFilterRight />
                </button>
              </div>
            </div>

            {/* Popular Services */}
            <div className="mt-8">
              <div className="flex  justify-between">
                <h3 className="text-purple-900 font-bold">Popular Services</h3>
                <div className="group text-purple-800 flex items-center gap-1 mr-2 whitespace-nowrap">
                  <span className="text-[10px] font-bold group-hover:text-purple-700">See all</span>
                  <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 group-hover:transform transition-all"/>
                </div>
              </div>

              <div className="flex gap-4 mt-2 items-start overflow-scroll">
                {ArtisanLists.map((i) => (
                  <div className="bg-white p-3 xs:w-48  flex-none flex flex-col items-center gap-2 rounded-xl shadow-[0_10px_30px_rgba(148,163,184,0.1)] ">
                    <div className="rounded-lg bg-purple-100 text-purple-800 p-2">
                      {createElement(i.icon)}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-center">
                      {i.title}
                    </span>
                    <span className="hidden sm:block text-gray-400 text-xs text-center">
                      {i.services}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Professionals */}
            <div className="mt-8">
             <div className="flex  justify-between">
                <h3 className="text-purple-900 font-bold">Top Professionals</h3>
                <div className="group text-purple-800 flex items-center gap-1 mr-2 whitespace-nowrap">
                  <span className="text-[10px] font-bold group-hover:text-purple-700">See all</span>
                  <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 group-hover:transform transition-all"/>
                </div>
              </div>

              <div className=" grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">

                {
                  ArtisansDetails.map(i => <div key={i.id} className="bg-white flex md:max-w-68 md:flex-col md:gap-4 justify-between items-center rounded-lg p-3 ">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={i.pics}
                        alt="Artisan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col ">
                      <p className="font-bold text-">{i.name}</p>
                      <p className="text-gray-500 text-sm">{i.skill}</p>
                      <div className="flex items-center gap-1 text-xs mt-1.5">
                        ⭐
                        <span aria-label="rating" className=" text-gray-400">
                          {i.ratings}
                        </span>
                        <span
                          aria-label="completed projects"
                          className=" text-gray-400 md:hidden"
                        >
                          ({i.projectsCompleted})
                        </span>
                        <span
                          aria-label="distance"
                          className=" text-gray-400 ml-2"
                        >
                          <IoLocationOutline className="inline" />
                          1.8 km
                        </span>
                      </div>

                       <span
                          aria-label="completed projects"
                          className=" text-gray-400 text-xs mt-3 hidden md:block"
                        >
                          {i.projectsCompleted} Projects completed
                        </span>
                    </div>
                  </div>
                  <div className='md:w-full'>
                    <button className="btn primary-btn">Book</button>
                  </div>
                </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
