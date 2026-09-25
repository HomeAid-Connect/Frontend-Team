import {
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const HOLD_DURATION = 3000;

export default function SOSPage() {
  const holdTimerRef = useRef(null);
  const [isHolding, setIsHolding] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);

  useEffect(() => {
    return () => clearTimeout(holdTimerRef.current);
  }, []);

  function startSosHold() {
    setIsHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(false);
      setSosTriggered(true);
    }, HOLD_DURATION);
  }

  function cancelSosHold() {
    clearTimeout(holdTimerRef.current);
    setIsHolding(false);
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col items-center px-1 py-2 text-center sm:px-4 sm:py-5">
     

      <div className="mt-[-0.5rem] flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 sm:mt-1 sm:h-16 sm:w-16">
        <ShieldCheckIcon className="h-8 w-8 text-purple-700 sm:h-9 sm:w-9" />
      </div>

      <h1 className="mt-5 text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Are you in danger?
      </h1>
      <p className="mt-2 max-w-md text-sm leading-5 text-slate-500 sm:text-base">
        We&apos;re here to help you get emergency assistance quickly.
      </p>

      <button
        type="button"
        aria-label="Press and hold for emergency assistance"
        onPointerDown={startSosHold}
        onPointerUp={cancelSosHold}
        onPointerLeave={cancelSosHold}
        onPointerCancel={cancelSosHold}
        className={`mt-8 flex h-36 w-36 select-none flex-col items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 sm:h-44 sm:w-44 ${
          isHolding
            ? "scale-95 bg-red-700 ring-8 ring-red-200"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        <ExclamationTriangleIcon className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="mt-1 text-3xl font-extrabold sm:text-4xl">SOS</span>
      </button>

      <p className="mt-4 text-xs font-semibold text-slate-500 sm:text-sm">
        {sosTriggered
          ? "Emergency assistance request sent"
          : isHolding
            ? "Keep holding..."
            : "Press and hold for 3 seconds"}
      </p>

      {sosTriggered && (
        <p className="mt-2 text-xs font-medium text-red-600" role="status">
          Emergency responders will be notified.
        </p>
      )}

      <section className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left shadow-sm sm:mt-6 sm:px-5">
        <span className="rounded-full bg-purple-100 p-3 text-purple-700">
          <MapPinIcon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-slate-800">
            Location sharing
          </span>
          <span className="block text-xs leading-4 text-slate-500">
            Your location can be shared with emergency responders.
          </span>
        </span>
        <button
          type="button"
          aria-label={`${locationSharing ? "Disable" : "Enable"} location sharing`}
          aria-pressed={locationSharing}
          onClick={() => setLocationSharing((current) => !current)}
          className={`h-3 w-3 rounded-full transition-colors ${
            locationSharing ? "bg-green-500" : "bg-slate-300"
          }`}
        />
      </section>

      <a
        href="tel:+2348000000000"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-purple-700 px-4 py-3 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-700 hover:text-white sm:mt-4"
      >
        <PhoneIcon className="h-5 w-5" />
        HomeAidConnect Support
      </a>
    </main>
  );
}