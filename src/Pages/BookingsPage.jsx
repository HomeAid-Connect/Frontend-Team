import { UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

export default function BookingsPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[calc(100vh-2rem)] items-center justify-center px-4 py-10 sm:px-6">
      <section className="flex w-full max-w-md flex-col items-center text-center">
        <UserIcon className="h-12 w-12 text-purple-700 sm:h-14 sm:w-14" />

        <h1 className="mt-5 text-2xl font-bold text-purple-700 sm:text-3xl">
          No Professional Selected
        </h1>

        <p className="mt-2 max-w-xs text-base leading-5 text-slate-500 sm:max-w-md sm:text-lg">
          Please select a professional before booking a service.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 rounded-lg bg-purple-700 px-9 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        >
          Go Back
        </button>
      </section>
    </main>
  );
}