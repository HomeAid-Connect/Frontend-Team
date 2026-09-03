import logo from "../assets/logo.png";
import logoDark from "../assets/logo.jpeg";
import artisans from "../assets/workers-login.png";
import { MdAccountBalanceWallet, MdSecurity } from "react-icons/md";
import { GrMailOption, GrUserWorker } from "react-icons/gr";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router";
import {useState} from 'react'
import { ImSpinner2 } from "react-icons/im";

export default function LoginPage() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [emailError, setEmailError] = useState({value: false, message: ""})
  const [passwordError, setPasswordError] = useState({value: false, message: "Welcome back"})
  const [formState, setFormState] = useState({
    loading: false,
    error: false,
    success: false,
  })
  return (
    <section className="overflow-hidden relative font-manrope">
      <div className="flex justify-center  items-center sm:p-1 lg:p-8">
        <div className="flex max-w-4xl md:m-3 bg-amber-300 w-full rounded-4xl overflow-hidden ">
          <div className="bg-linear-to-r w-full grow-2 hidden md:flex  from-purple-950 from  items-center justify-between flex-col to-purple-800">
            <div className="justify-self-center mt-5">
              <img src={logo} alt="HomeAid Logo" width={300} />
            </div>
            <img
              src={artisans}
              width={320}
              alt="Different Artisans holding their toolkits"
            />
          </div>

          <div className="w-full p-4 my-auto md:p-7 sm:p-10 bg-purple-50  flex justify-center flex-col">
            <div className="self-center md:hidden">
              <img src={logoDark} alt="HomeAid Logo" width={180} />
            </div>

            <div className="self-center md:self-start text-center md:text-start">
              {" "}
              <h2 className="text-purple-900 font-extrabold text-xl">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm">
                Log in to your account to continue
              </p>
            </div>

            <form action="" className="mt-6 mb-2">
              {/* form-control */}
              <div className="mb-4">
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <div className="input-field">
                  <GrMailOption />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full focus:outline-none"
                    placeholder="Enter your mail"
                    required
                  />
                </div>
               {emailError.value && <p className="text-red-600 mt-2 text-xs">
                  {emailError.message}
                </p>}
              </div>

              {/* form-control */}
              <div className="mb-4">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <div className="input-field">
                  <MdSecurity />
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    className="w-full focus:outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  {isPasswordVisible ? <BiHide onClick={() => setIsPasswordVisible(i => !i)} className="cursor-pointer"/> : <BiShow onClick={() => setIsPasswordVisible(i => !i)} className="cursor-pointer"/>}
                </div>
                {passwordError.value && <p className="text-red-600 mt-2 text-xs">
                  {passwordError.message}
                </p>}
              </div>
              <a
                href="#"
                className="hover:underline text-sm text-right text-purple-900 block my-4"
              >
                Forgot Password?
              </a>

              <button type="submit" disabled={formState.loading} className="primary-btn btn disabled:bg-red-800/40 disabled:cursor-not-allowed">
                
                 {formState.loading ? <span className="flex items-center justify-center gap-2">< ImSpinner2 className="animate-spin w-4 h-4"/>
                <span> Logging in </span></span> : <span>Log in</span>}
              </button>
            </form>
            {/* This shows the error state of the form */}
            
            {formState.success | formState.error ? <div className={`${formState.success && 'bg-green-100/80 border-green-800/20'} ${formState.error && 'bg-red-100 border-red-800/20'} rounded-md p-1.5 border`}>

           
              <p className={`text-sm ${formState.success && 'text-green-700'} ${formState.error && 'text-red-500'}`}>{formState.success ? "Welcome back" : "Try Again"}</p>
            </div>: null}

            <div className="flex gap-3  mt-8 items-center">
              <span className="h-px bg-purple-300 w-full"></span>
              <span className="text-sm ">or</span>
              <span className="h-px bg-purple-300 w-full"></span>
            </div>
            <p className="text-gray-500 text-center mt-6 text-sm">
              Don't have an Account?
            </p>

            <div className="w-full mt-4">
              <Link
                to="/register/customer"
                className="secondary-btn btn w-full flex items-center justify-center gap-2"
              >
                <MdAccountBalanceWallet />
                <span>Sign up as a Customer</span>
              </Link>

              <Link
                to="/register/artisan"
                className="secondary-btn mt-2 w-full btn flex items-center justify-center gap-2"
              >
                <GrUserWorker />
                <span>Register as an Artisan</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
