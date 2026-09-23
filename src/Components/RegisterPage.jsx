import { useState } from "react";
import logoDark from "../assets/logo.jpeg";
import logoLight from "../assets/logo.png";
import artisans from "../assets/workers-login.png";
import { MdCancel, MdSecurity } from "react-icons/md";
import { GrMailOption, GrUserWorker } from "react-icons/gr";
import { BiCalendar, BiHide, BiShow } from "react-icons/bi";
import { FaUser, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { ArtisanLists } from "../data/ArtisanLists";
import { Link, useNavigate } from "react-router";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";
import { API_BASE_URL } from "../config/api";

const registrationSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirm: z.string().min(1, "Confirm your password"),
    first_name: z.string().trim().min(1, "First name is required"),
    last_name: z.string().trim().min(1, "Last name is required"),
    phone_number: z.string().trim().min(7, "Enter a valid phone number"),
    role: z.enum(["CUSTOMER", "ARTISAN"]),
    gender: z.enum(["MALE", "FEMALE"]),
    location: z.string().trim().min(1, "Location is required"),
    date_of_birth: z.string().min(1, "Date of birth is required"),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ["password_confirm"],
    message: "Passwords do not match",
  });

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
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [formState, setFormState] = useState({
    loading: false,
    error: false,
    success: false,
    message: "",
  });
  const navigate = useNavigate();

  const availableStatesJSX = states.map((state, index) => (
    <option key={index} value={state}>
      {state}
    </option>
  ));

  function formatApiError(errorData) {
    if (typeof errorData === "string") return errorData;
    if (errorData?.message) return errorData.message;

    if (errorData && typeof errorData === "object") {
      return Object.entries(errorData)
        .map(([field, messages]) => {
          const formattedMessages = Array.isArray(messages)
            ? messages.join(", ")
            : String(messages);
          return `${field.replaceAll("_", " ")}: ${formattedMessages}`;
        })
        .join(" | ");
    }

    return "Unable to create your account";
  }

  async function handleRegister(event) {
    event.preventDefault();
    setFormState({
      loading: true,
      error: false,
      success: false,
      message: "",
    });

    const formInputs = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      username: formInputs.username,
      email: formInputs.email,
      password: formInputs.password,
      password_confirm: formInputs.password_confirm,
      first_name: formInputs.first_name,
      last_name: formInputs.last_name,
      phone_number: formInputs.phone_number,
      role: isCustomer ? "CUSTOMER" : "ARTISAN",
      gender: formInputs.gender,
      location: formInputs.location || formInputs.state,
      date_of_birth: formInputs.date_of_birth,
    };

    const validation = registrationSchema.safeParse(payload);
    if (!validation.success) {
      const message = Object.values(validation.error.flatten().fieldErrors)
        .flat()
        .join(" ");
      setFormState({
        loading: false,
        error: true,
        success: false,
        message,
      });
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validation.data),
        },
      );
      const responseText = await response.text();
      let responseData = {};
      console.log(response);
      console.log(responseText);
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
        } catch {
          if (!response.ok) {
            throw new Error("The server returned an invalid response");
          }
        }
      }

      if (!response.ok) {
        throw new Error(formatApiError(responseData));
      }

      setFormState({
        loading: false,
        error: false,
        success: true,
        message: responseData.message || "Account created successfully",
      });

      sessionStorage.setItem("verification_email", validation.data.email);

      setTimeout(() => navigate("/register/otp"), 2000);
    } catch (error) {
      setFormState({
        loading: false,
        error: true,
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create your account. Check your network.",
      });
    }
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

            <form
              onSubmit={handleRegister}
              className="space-y-4 transition-all ease-in duration-300"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="firstName">
                      First Name
                    </label>
                    <div className="input-field">
                      <FaUser className="text-purple-500" />
                      <input
                        type="text"
                        name="first_name"
                        id="firstName"
                        required
                        className="w-full bg-transparent focus:outline-none"
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="lastName">
                      Last Name
                    </label>
                    <div className="input-field">
                      <FaUser className="text-purple-500" />
                      <input
                        type="text"
                        name="last_name"
                        id="lastName"
                        required
                        className="w-full bg-transparent focus:outline-none"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-2 flex gap-3 sm:flex-row flex-col">
                  <div className="grow">
                    <label className="label" htmlFor="username">
                      Username
                    </label>
                    <div className="input-field">
                      <FaUser className="text-purple-500" />
                      <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        className="w-full bg-transparent focus:outline-none"
                        placeholder="Enter a unique username"
                      />
                    </div>
                  </div>

                  <div className="">
                    <label className="label" htmlFor="gender">
                      Select Gender
                    </label>
                    <div className="input-field">
                      <GrUserWorker className="text-purple-500" />
                      <select
                        name="gender"
                        id="gender"
                        defaultValue=""
                        className="w-full bg-transparent focus:outline-none"
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>
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
                      name="phone_number"
                      id="phone_number"
                      required
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="+234 800 000 0000"
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

                <div>
                  <label className="label" htmlFor="date_of_birth">
                    Date of Birth
                  </label>
                  <div className="input-field">
                    <BiCalendar className="text-purple-500" />
                    <input
                      type="date"
                      name="date_of_birth"
                      id="date_of_birth"
                      required
                      className="w-full bg-transparent focus:outline-none"
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
                    {isPasswordVisible ? (
                      <BiHide
                        onClick={() => setIsPasswordVisible((i) => !i)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <BiShow
                        onClick={() => setIsPasswordVisible((i) => !i)}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="label" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <div className="input-field">
                    <MdSecurity className="text-purple-500" />
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      name="password_confirm"
                      id="confirm-password"
                      required
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="Create a strong password"
                    />
                    {isConfirmPasswordVisible ? (
                      <BiHide
                        onClick={() => setIsConfirmPasswordVisible((i) => !i)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <BiShow
                        onClick={() => setIsConfirmPasswordVisible((i) => !i)}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>

              {isCustomer ? (
                <div>
                  <label className="label" htmlFor="location">
                    Location
                  </label>
                  <textarea
                    id="location"
                    name="location"
                    rows="3"
                    className="mt-1 w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-3 text-purple-800 placeholder:text-purple-400 focus:border-purple-400 focus:outline-none"
                    placeholder="Enter your home address"
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
                </div>
              )}

              {formState.message && (
                <div
                  role="alert"
                  className={`rounded-md border p-3 text-sm ${
                    formState.success
                      ? "border-green-200 bg-green-100 text-green-700"
                      : "border-red-200 bg-red-100 text-red-600"
                  }`}
                >
                  {formState.message}
                </div>
              )}

              <button
                type="submit"
                disabled={formState.loading}
                className="primary-btn btn mt-2 disabled:cursor-not-allowed"
              >
                {formState.loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <ImSpinner2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </span>
                ) : isCustomer ? (
                  "Create Customer Account"
                ) : (
                  "Create Artisan Account"
                )}
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
