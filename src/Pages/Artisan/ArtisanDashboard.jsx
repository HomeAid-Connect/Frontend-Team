import { useState } from "react";
import { Link } from "react-router";
import logoDark from "../../assets/logo.jpeg";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaLocationDot } from "react-icons/fa6";
import StatCard from '../../components/StatCard.jsx'

import {
  FiAlertTriangle,
  FiBell,
  FiBriefcase,
  FiChevronRight,
  FiFileText,
  FiUser,
} from "react-icons/fi";
import NotificationBell from "../../components/NotificationBell.jsx";


export default function ArtisanDashboard() {
  const { user } = useAuth();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const artisanName = user?.username || "Artisan";
  const location = user?.location || "Lagos";
  const profileInitial = artisanName.charAt(0).toUpperCase();
  const profileImage = null;
  const timeOfDay = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  })();

  let Notifications = ["bola", 78];

  return (
    <div className="mx-auto w-full  pb-8">
      <div className="flex justify-between tablet:justify-end">
        <img
          src={logoDark}
          alt="HomeAid Logo"
          className="rounded-xl w-16 tablet:hidden"
        />

        <div className="flex items-center gap-2">
          <NotificationBell Notifications={Notifications} />

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

        <div className="mt-3">
         <div className="tablet:flex items-center gap-2">
             <p className="text-sm font-medium text-purple-950">
            Good {timeOfDay},
          </p>
          <h2 className="text-xl font-bold text-purple-800">{artisanName}👋</h2>
         </div>
          <div className="flex items-center gap-2">
            <FaLocationDot className="w-2 text-purple-800" />
            <span className="text-gray-500 text-xs">Lagos, Nigeria</span>
          </div>
        </div>
      <main className="mt-10 space-y-6">

        {!user.isAuthenticated &&  <section className="rounded-3xl border border-pink-300 bg-pink-100 px-5 py-3 shadow-sm sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-xl text-pink-700">
              <FiAlertTriangle />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold leading-tight text-purple-900 sm:text-lg">
                Finish setting up your Account
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-gray-600">
                Complete your professional verification to start receiving jobs.
              </p>
              <Link
                to="/Settings/profile"
                className="mt-1 inline-flex items-center gap-2 text-sm font-extrabold text-purple-800 hover:text-purple-950"
              >
                Complete your profile
                <FiChevronRight />
              </Link>
            </div>
          </div>
        </section>}

       {!user.isAuth && <section className="flex items-center gap-4 rounded-3xl bg-purple-50 px-5 py-6 sm:px-7">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-100">
            <div
              className={`h-7 w-7 rounded-full ${
                isProfileComplete ? "bg-purple-700" : "bg-gray-300"
              }`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-extrabold text-purple-900 sm:text-lg">
              Switch on Visibility
            </h2>
            <p className=" max-w-xl text-sm leading-6 text-gray-600">
             Let customer's know you are available for work
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isProfileComplete}
            aria-label="Mark professional profile as complete"
            onClick={() => setIsProfileComplete((current) => !current)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              isProfileComplete ? "bg-purple-700" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                isProfileComplete ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </section> }

        <section className="">
          <h2 className="text-base font-extrabold text-gray-900 sm:text-lg">
            Job Overview
          </h2>
          <div className="mt-4 grid grid-cols-2 tablet:grid-cols-4 gap-3">
            <StatCard icon={FiBriefcase} value="0" label="Job Completed" />
            <StatCard icon={FiFileText} value="0" label="New Requests" />

          </div>
        </section>

        <section>
          <h2 className="text-base font-extrabold text-gray-900 sm:text-lg">
            Your Services
          </h2>
          <div className="mt-4 flex min-h-48 flex-col items-center justify-center rounded-3xl bg-white px-6 py-8 text-center shadow-[0_8px_20px_rgba(148,163,184,0.16)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700">
              <FiBriefcase />
            </div>
            <h3 className="mt-4 text-sm font-extrabold text-gray-900 sm:text-base">
              No profession selected
            </h3>
            <p className="mt-2 max-w-xs text-xs leading-5 text-gray-500 sm:text-sm">
              Complete your professional profile to add your service.
            </p>
            <Link
              to="/Settings/profile"
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-purple-800 hover:underline"
            >
              Add a service
              <FiChevronRight />
            </Link>
          </div>
        </section>
      </main>

      <Link
        to="/Settings/profile"
        aria-label="Open profile"
        className="fixed bottom-20 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-purple-700 text-xl text-white shadow-lg transition hover:bg-purple-900 tablet:hidden"
      >
        <FiUser />
      </Link>
    </div>
  );
}
