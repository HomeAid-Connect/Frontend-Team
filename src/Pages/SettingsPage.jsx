import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  HeartIcon,
  PencilIcon,
  MapPinIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const activities = [
  {
    title: "My Bookings",
    description: "View your upcoming and past bookings",
    icon: CalendarDaysIcon,
    iconClass: "bg-purple-100 text-purple-700",
    to: "/Bookings",
  },
  {
    title: "Cashback",
    description: "Check your cashback balance and history",
    icon: WalletIcon,
    iconClass: "bg-green-100 text-green-600",
    to: "#",
  },
  {
    title: "Saved Professionals",
    description: "View professionals you have saved",
    icon: HeartIcon,
    iconClass: "bg-pink-100 text-pink-500",
    to: "#",
  },
  {
    title: "Saved Addresses",
    description: "Manage your saved service addresses",
    icon: MapPinIcon,
    iconClass: "bg-orange-100 text-orange-500",
    to: "#",
  },
];

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState("");
  const user = { name: "Nehhy" };
  const profileInitial = user.name?.trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const loadProfileImage = () =>
      setProfileImage(localStorage.getItem("homeaid-profile-image") || "");

    loadProfileImage();
    window.addEventListener("profile-image-changed", loadProfileImage);
    return () =>
      window.removeEventListener("profile-image-changed", loadProfileImage);
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-1 py-2 sm:px-3 sm:py-4">
      <div className="mb-5 flex items-center gap-4 text-purple-800 sm:mb-6">
        <Link
          to="/dashboard"
          aria-label="Back to dashboard"
          className="rounded-full p-1 transition-colors hover:bg-purple-100"
        >
          <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
        <h1 className="text-xl font-bold sm:text-2xl">Settings</h1>
      </div>

      <section className="relative flex gap-4 rounded-xl border border-purple-100 bg-purple-50/70 p-4 sm:items-center sm:p-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center self-center overflow-hidden rounded-full bg-purple-200 text-2xl font-bold text-purple-800 sm:self-auto">
          {profileImage ? (
            <img src={profileImage} alt="Your profile" className="h-full w-full object-cover" />
          ) : (
            profileInitial
          )}
        </div>

        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center  gap-1 justify-start">
            <h2 className="font-bold text-purple-950">{user.name}</h2>
            <CheckBadgeIcon className="h-4 w-4 text-purple-700" />
          </div>
          <p className="mt-1 truncate text-xs text-slate-500">
            zaramuomelite@gmail.com
          </p>
          <p className="mt-1 text-xs text-slate-500">0807100354</p>
          <p className="mt-1 text-xs text-slate-500">Lagos</p>
          <Link
          to='/settings/profile'
            className="mt-2 inline-flex items-center gap-1 rounded-lg border border-purple-600 px-3 py-1.5 text-xs font-semibold text-purple-700 transition-colors hover:bg-purple-700 hover:text-white"
          >
            Edit Profile
            <PencilIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
      <section className="mt-6 sm:mt-7">
        <h2 className="mb-3 text-lg font-bold text-purple-950 sm:text-xl">
          My Activities
        </h2>
        <div className="rounded-xl border border-purple-100 bg-white px-3 sm:px-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <Link
                key={activity.title}
                to={activity.to}
                className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0 sm:gap-4 sm:py-4"
              >
                <span className={`rounded-lg p-2 ${activity.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-purple-950 sm:text-sm">
                    {activity.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] text-slate-500 sm:text-xs">
                    {activity.description}
                  </span>
                </span>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-600" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-6 sm:mt-7">
        <h2 className="mb-3 text-lg font-bold text-purple-950 sm:text-xl">
          Account
        </h2>
        <Link
          to="#"
          className="flex items-center gap-3 rounded-xl border border-purple-100 bg-white px-3 py-3 sm:gap-4 sm:px-4 sm:py-4"
        >
          <span className="rounded-lg bg-purple-100 p-2 text-purple-700">
            <Cog6ToothIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold text-purple-950 sm:text-sm">
              Settings
            </span>
            <span className="mt-0.5 block text-[10px] text-slate-500 sm:text-xs">
              Manage your account settings
            </span>
          </span>
          <ChevronRightIcon className="h-4 w-4 text-slate-600" />
        </Link>
      </section>
    </main>
  );
}