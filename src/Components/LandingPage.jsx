import { FaArrowRight, FaCheckCircle, FaShieldAlt, FaStar } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import workers from "../assets/workers-login.png";
import { ArtisanLists } from "../data/ArtisanLists.js";
import { ArtisansDetails } from "../data/ArtisansDetails.js";

const benefits = [
  {
    icon: FaShieldAlt,
    title: "Trusted professionals",
    text: "Connect with verified home service providers you can feel confident inviting in.",
  },
  {
    icon: IoLocationOutline,
    title: "Help near you",
    text: "Find skilled artisans around your location, whenever you need a hand.",
  },
  {
    icon: FaCheckCircle,
    title: "Simple and reliable",
    text: "Describe what you need, choose your professional, and get your home sorted.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-purple-50 font-manrope text-slate-900">
      <section className="relative bg-linear-to-br from-purple-950 via-violet-900 to-fuchsia-700 px-5 pb-12 pt-5 text-white">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-start justify-between">
            <img
              src={logo}
              alt="HomeAid Connect"
              className="h-18 w-18 rounded-2xl object-cover"
            />
            <Link
              to="/login"
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-bold transition hover:bg-white hover:text-purple-900"
            >
              Log in
            </Link>
          </nav>

          <div className="grid items-center gap-8 pt-10 md:grid-cols-2 md:gap-12 md:pt-16">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-purple-200">
                Trusted help. Connected homes.
              </p>
              <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] sm:text-5xl">
                Your home deserves the right help.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-purple-100 sm:text-base">
                HomeAid Connect makes it easy to find trusted, nearby artisans
                for every job, from a leaking pipe to a home that needs a fresh
                clean.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register/customer"
                  className="btn flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-purple-800 shadow-lg hover:bg-purple-100"
                >
                  Find an artisan <FaArrowRight aria-hidden="true" />
                </Link>
                <Link
                  to="/register/artisan"
                  className="btn flex items-center justify-center gap-2 rounded-xl border border-white/50 py-3 text-sm font-bold text-white hover:bg-white/10"
                >
                  <GrUserWorker aria-hidden="true" /> Join as an artisan
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-purple-100">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-fuchsia-200" /> Verified providers
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-fuchsia-200" /> Local services
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-5 rounded-full bg-fuchsia-400/30 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
                <img
                  src={workers}
                  alt="HomeAid artisans ready to help"
                  className="h-64 w-full rounded-2xl object-cover object-center sm:h-80"
                />
                <div className="absolute bottom-7 left-7 right-7 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Home services made easy</p>
                      <p className="mt-1 font-bold">Help is closer than you think.</p>
                    </div>
                    <FaStar className="text-lg text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
            Everything your home needs
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-purple-950 sm:text-3xl">
            One place for every home service.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Browse skilled professionals who can take care of the jobs on your
            list, big or small.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ArtisanLists.map(({ id, icon: Icon, title, services }) => (
            <div
              key={id}
              className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(76,29,149,0.07)] transition hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-lg text-purple-700">
                <Icon aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-purple-950">{title}</h3>
              <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500">
                {services}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
              Why HomeAid
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-purple-950 sm:text-3xl">
              A better way to care for your home
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl bg-purple-50 p-5">
                <Icon className="text-2xl text-purple-700" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-purple-950">{title}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
              Meet the pros
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-purple-950">
              Skilled hands, nearby
            </h2>
          </div>
          <Link to="/register" className="flex items-center gap-1 text-xs font-bold text-purple-700">
            Get started <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {ArtisansDetails.slice(0, 3).map((artisan) => (
            <article
              key={`${artisan.id}-${artisan.name}`}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_10px_30px_rgba(76,29,149,0.07)]"
            >
              <img
                src={artisan.pics}
                alt={artisan.name}
                className="h-14 w-14 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-purple-950">{artisan.name}</h3>
                <p className="text-xs text-slate-500">{artisan.skill}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-amber-500">
                  <FaStar aria-hidden="true" /> {artisan.ratings}{" "}
                  <span className="font-normal text-slate-400">
                    · {artisan.projectsCompleted} jobs
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-linear-to-r from-purple-900 to-fuchsia-700 px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Ready to get your home sorted?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-5 text-purple-100">
            Join HomeAid Connect today and experience trusted help, connected
            homes, and peace of mind.
          </p>
          <Link
            to="/register"
            className="btn mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-purple-800 hover:bg-purple-100"
          >
            Create your account <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="px-5 pb-8 text-center text-xs text-slate-500">
        <p>Safe <span className="px-2">•</span> Fast <span className="px-2">•</span> Affordable</p>
        <p className="mt-2">© {new Date().getFullYear()} HomeAid Connect</p>
      </footer>
    </main>
  );
}
