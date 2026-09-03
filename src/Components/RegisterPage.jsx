import { useState } from "react";
import logoDark from "../assets/logo.jpeg";
import logoLight from "../assets/logo.png";
import artisans from "../assets/workers-login.png";
import { MdCancel, MdSecurity } from "react-icons/md";
import { GrMailOption, GrUserWorker } from "react-icons/gr";
import { BiCalendar, BiHide, BiShow } from "react-icons/bi";
import { FaUser, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { ArtisanLists } from "../data/ArtisanLists";
import { Link } from "react-router";

export default function RegisterPage({ role }) {
  const states = [
    "Abia",
    "Abuja",
    "Adamawa",
    "Akwa-Ibom",
    "Lagos",
    "Ondo",
    "Ogun",
    "Oyo",
    "Osun",
  ];

  const [activeRole, setActiveRole] = useState(role);
  const isCustomer = activeRole === "customer";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [workLocations, setWorkLocations] = useState(["Aba"])

  const availableStatesJSX = states.map((state, index) => (
    <option key={index} value={state}>
      {state}
    </option>
  ));

  function addLocation() {
setWorkLocations(prev => {
  if(prev.some(i => i.toLowerCase() === locationInput.toLowerCase())) {
    setLocationInput("")
    alert("Location already exists")
    return prev
  }
  if(locationInput.length < 2) {
    setLocationInput("")
    alert("Enter a valid location")
    return prev 
  }
  else {
    setLocationInput("")
    const formattedLocation = locationInput
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
    return [...prev, formattedLocation]
  }
})
  }

  function deleteLocation(i) {
    setWorkLocations(prev => prev.filter(prevv => prevv !== i))
    console.log(workLocations)
  }

  return (
    <section className="relative overflow-hidden font-manrope">
      <div className="flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 lg:p-8">
        <div className="flex w-full max-w-6xl overflow-hidden rounded-4xl shadow-[0_20px_60px_rgba(76,29,149,0.12)]">
          <div className="hidden w-[38%] bg-linear-to-br from-purple-900 via-violet-900 to-fuchsia-800 p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <img
                src={logoLight}
                alt="HomeAid Logo"
                className="mb-10 h-25 rounded-xl "
              />

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-200">
                  Welcome onboard
                </p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight">
                  Find trusted help or book services with ease.
                </h2>
              </div>
            </div>

            <div className="rounded-3xl bg-white/20  backdrop-blur-sm">
              <img
                src={artisans}
                alt="HomeAid artisans"
                className=" w-full rounded-2xl object-cover"
              />
            </div>

            <p className="text-sm text-purple-100">
              Join as a customer to request services or as an artisan to
              showcase your skills and get hired.
            </p>
          </div>

          <div className="w-full bg-purple-50 p-5 sm:p-6 lg:p-8">
            <div className="mb-6 flex justify-center lg:hidden lg:justify-start">
              <img src={logoDark} alt="HomeAid Logo" width={170} />
            </div>

            <div className="mb-6 text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
                Create an account
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-purple-900 sm:text-3xl">
                Join HomeAid
              </h2>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-purple-100 p-1.5">
              {[
                { key: "customer", label: "Customer" },
                { key: "artisan", label: "Artisan" },
              ].map((role) => (
                <Link
                  key={role.key}
                  type="button"
                  onClick={() => setActiveRole(role.key)}
                  to={`/register/${role.key}`}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold text-center transition-all ${
                    activeRole === role.key
                      ? "bg-purple-700 text-white shadow-md"
                      : "text-purple-800 hover:bg-purple-200"
                  }`}
                >
                  {role.label}
                </Link>
              ))}
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="fullName">
                    Full Name
                  </label>
                  <div className="input-field">
                    <FaUser className="text-purple-500" />
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      className="w-full bg-transparent focus:outline-none"
                      placeholder={
                        isCustomer ? "e.g. Ada Johnson" : "e.g. Daniel Ikpe"
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="label" htmlFor="phone">
                    Phone Number
                  </label>
                  <div className="input-field">
                    <FaPhoneAlt className="text-purple-500" />
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="e.g. +234 800 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="label" htmlFor="state">
                    State
                  </label>
                  <div className="input-field">
                    <FaMapMarkerAlt className="text-purple-500" />
                    <select
                      name="state"
                      id="state"
                      required
                      defaultValue=""
                      className="w-full bg-transparent focus:outline-none"
                    >
                      <option value="" disabled>
                        Select your state
                      </option>
                      {availableStatesJSX}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="label" htmlFor="email">
                    Email Address
                  </label>
                  <div className="input-field">
                    <GrMailOption className="text-purple-500" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="input-field">
                    <MdSecurity className="text-purple-500" />
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="Create a strong password"
                    />
                    {isPasswordVisible ? <BiHide onClick={() => setIsPasswordVisible(i => !i)} className="cursor-pointer"/> : <BiShow onClick={() => setIsPasswordVisible(i => !i)} className="cursor-pointer"/>}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="label" htmlFor="password">
                    Confirm Password
                  </label>
                  <div className="input-field">
                    <MdSecurity className="text-purple-500" />
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      name="confirm-password"
                      id="password"
                      required
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="Create a strong password"
                    />
                     {isConfirmPasswordVisible ? <BiHide onClick={() => setIsConfirmPasswordVisible(i => !i)} className="cursor-pointer"/> : <BiShow onClick={() => setIsConfirmPasswordVisible(i => !i)} className="cursor-pointer"/>}
                  </div>
                </div>
              </div>

              {isCustomer ? (
                <div>
                  <label className="label" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="mt-1 w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-3 text-purple-800 placeholder:text-purple-400 focus:border-purple-400 focus:outline-none"
                    placeholder="Enter your delivery or home address"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="">
                    <label className="label" htmlFor="serviceCategory">
                      Service Category
                    </label>
                    <div className="input-field">
                      <GrUserWorker className="text-purple-500" />
                      <select
                        name="serviceCategory"
                        id="serviceCategory"
                        defaultValue=""
                        className="w-full bg-transparent focus:outline-none"
                      >
                        <option value="" disabled>
                          Select your craft
                        </option>
                        {ArtisanLists.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="">
                    <label className="label" htmlFor="experience">
                      Years of Professional Experience
                    </label>
                    <div className="input-field">
                      <BiCalendar className="text-purple-500" />
                      <select
                        name="experience"
                        id="experience"
                        defaultValue=""
                        className="w-full bg-transparent focus:outline-none"
                      >
                        <option value="" disabled>
                          Select year
                        </option>
                        <option value="<1">Less than 1 year</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10 years and above</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="workLocations">
                      Locations You Can Work (Multiple)
                    </label>
                    <div className="input-field px-0! py-0!">
                    <input  
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      required
                      className="w-full bg-transparent ml-4 focus:outline-none"
                      placeholder="Click 'Add' to add each loaction"
                    />
                     <button className="btn primary-btn w-fit!" onClick={addLocation} type="button">Add</button>
                  </div>
                  <div className="mt-2 p-2 border-t border-b border-purple-200 min-h-4 flex items-center gap-2">
                    {workLocations.map(i => <span className={"bg-purple-400 rounded-sm p-1 flex gap-1 text-white text-xs"}>
                      {i} <button onClick={() => deleteLocation(i)}  type='button'><MdCancel/></button>
                    </span>)}
                  </div>
                  </div>
                </div>
              )}

              <button type="submit" className="primary-btn btn mt-2">
                {isCustomer
                  ? "Create Customer Account"
                  : "Create Artisan Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-purple-800">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple-700 hover:underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
