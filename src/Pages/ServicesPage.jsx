import { ArrowLeftIcon, AdjustmentsHorizontalIcon, Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArtisanLists } from "../data/ArtisanLists";

export default function ServicesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return ArtisanLists;

    return ArtisanLists.filter((service) =>
      service.title.toLowerCase().includes(query),
    );
  }, [searchTerm]);

  return (
    <main className="mx-auto min-h-[calc(100vh-2rem)] w-full max-w-5xl px-1 py-2 sm:px-3 sm:py-4">
      <header className="relative flex items-start ">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="rounded-full p-1 text-purple-700 transition-colors hover:bg-purple-100"
        >
          <ArrowLeftIcon className="h-7 w-7" />
        </button>

        <div className="text-center justify-se">
          <h1 className="text-2xl font-extrabold text-purple-950 sm:text-3xl">
            All Services
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Find the service you need
          </p>
        </div>

        
      </header>

      <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_4px_12px_rgba(15,23,42,0.1)]">
        <MagnifyingGlassIcon className="h-6 w-6 shrink-0 text-purple-700" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for a service..."
          aria-label="Search for a service"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 sm:text-base"
        />
        <button
          type="button"
          aria-label="Filter services"
          className="rounded-full p-1 text-purple-700 transition-colors hover:bg-purple-100"
        >
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
        </button>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-purple-950">Services</h2>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredServices.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.id}
                  to={`/Services/${service.title.toLowerCase().replaceAll(" ", "-")}`}
                  className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-[0_6px_12px_rgba(15,23,42,0.12)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(15,23,42,0.16)]"
                >
                  <span className="rounded-2xl bg-purple-100 p-4 text-purple-700">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="text-sm font-bold text-slate-700 sm:text-base">
                    {service.title}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-purple-100 bg-white p-8 text-center">
            <p className="font-semibold text-purple-900">
              No services found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try searching for another service.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
