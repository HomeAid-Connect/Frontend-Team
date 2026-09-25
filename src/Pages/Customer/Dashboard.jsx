import logoDark from "../../assets/logo.jpeg";

import { createElement, useRef, useState } from "react";
import { Link } from "react-router";
import { BiSearchAlt } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsFilterRight } from "react-icons/bs";
import { ArtisanLists } from "../../data/ArtisanLists.js";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { ArtisansDetails } from "../../data/ArtisansDetails.js";
import { useAuth } from "../../context/AuthContext.jsx";
import NotificationBell from "../../components/NotificationBell.jsx";

export default function Dashboard() {
  const search = useRef();
  const { user } = useAuth();
  const [isServicesPaused, setIsServicesPaused] = useState(false);
  // const profileImage = localStorage.getItem("homeaid-profile-image");
  const profileImage = null;
  const profileName = user?.username || "User"
  const profileInitial = profileName.charAt(0).toUpperCase();

  let Notifications = [1, "bola", 78];
  const timeOfDay = (() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Morning";
    if (currentHour < 17) return "Afternoon";
    return "Evening";
  })();

  return (
    <>
      <div className="flex justify-between tablet:justify-end">
        <img
          src={logoDark}
          alt="HomeAid Logo"
          className="rounded-xl w-16 tablet:hidden"
        />

        <div className="flex items-center gap-2">
         
          <NotificationBell Notifications={Notifications}/>

          <Link
            to="/Settings/profile"
            aria-label="Open your profile"
            className="mr-2 h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-purple-200 text-center text-sm font-bold leading-9 text-purple-800 shadow-sm transition-transform hover:scale-105"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Your profile"
                className="h-full w-full object-cover"
              />
            ) : (
              profileInitial
            )}
          </Link>
        </div>
      </div>

      <div className="xs:flex  xs:gap-5 items-center">
        <div className="mt-3">
          <p className="text-sm font-medium text-purple-950">
            Good {timeOfDay},
          </p>
          <h2 className="text-xl font-bold text-purple-800">{profileName}👋</h2>
          <div className="flex items-center gap-2">
            <FaLocationDot className="w-2 text-purple-800" />
            <span className="text-gray-500 text-xs">Lagos, Nigeria</span>
          </div>
        </div>

        <div className="relative flex text-[14px] flex-1 items-center justify-between gap-2 mt-6 bg-white rounded-md p-2 text-purple-700 max-w-148">
          <BiSearchAlt />
          <input
            type="text"
            className="flex-1 focus:outline-none"
            name="search"
            id="search"
            value={search.value}
            placeholder="Search for a service or an artisan"
          />
          <button className="p-1 shadow-sm cursor-pointer rounded-full hover:bg-purple-50">
            <BsFilterRight />
          </button>

          {/* search bar comes on focus */}
          {/* <div className="absolute -bottom-[] -right-[0] w-6 h-40 bg-amber-200"></div> */}
        </div>
      </div>

      {/* Popular Services */}
      <div className="mt-8">
        <div className="flex  justify-between">
          <h3 className="text-purple-900 font-bold">Popular Services</h3>
          <Link
            to="../services"
            className="group text-purple-800 flex items-center gap-1 mr-2 whitespace-nowrap"
          >
            <span className="text-[10px] font-bold group-hover:text-purple-700">
              See all
            </span>
            <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 group-hover:transform transition-all" />
          </Link>
        </div>

        <div
          className="service-carousel hide-scrollbar mt-2 overflow-x-auto"
          onMouseEnter={() => setIsServicesPaused(true)}
          onMouseLeave={() => setIsServicesPaused(false)}
          onTouchStart={() => setIsServicesPaused(true)}
          onTouchEnd={() => setIsServicesPaused(false)}
        >
          <div
            className={`service-track ${isServicesPaused ? "is-paused" : ""}`}
          >
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                className="service-group flex shrink-0 gap-4"
                aria-hidden={groupIndex === 1}
              >
                {ArtisanLists.map((i) => (
                  <div
                    key={`${groupIndex}-${i.title}`}
                    className="flex w-36 flex-none flex-col items-center gap-2 rounded-xl bg-white p-3 shadow-[0_10px_30px_rgba(148,163,184,0.1)] xs:w-48"
                  >
                    <div className="rounded-lg bg-purple-100 p-2 text-purple-800">
                      {createElement(i.icon)}
                    </div>
                    <span className="text-center text-xs font-bold sm:text-sm">
                      {i.title}
                    </span>
                    <span className="hidden text-center text-xs text-gray-400 sm:block">
                      {i.services}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Professionals */}
      <div className="mt-8">
        <div className="flex  justify-between">
          <h3 className="text-purple-900 font-bold">Top Professionals</h3>
          <Link to="/professionals" className="group text-purple-800 flex items-center gap-1 mr-2 whitespace-nowrap">
            <span className="text-[10px] font-bold group-hover:text-purple-700">
              See all
            </span>
            <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 group-hover:transform transition-all" />
          </Link>
        </div>

        <div className=" grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
          {ArtisansDetails.map((i) => (
            <div
              key={i.id}
              className="bg-white flex md:max-w-68 md:flex-col md:gap-4 justify-between items-center rounded-lg p-3 "
            >
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
                    <span aria-label="distance" className=" text-gray-400 ml-2">
                      <IoLocationOutline className="inline" />
                      {i.location}
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
              <div className="md:w-full">
                <button className="btn primary-btn">Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
