import { ShieldCheckIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";

export default function OtpScreen() {
  const [timer, setTimer] = useState(59);
  const [activeTab, setActiveTab] = useState("phone");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) return undefined;

    const timeoutId = setTimeout(() => {
      setTimer((currentTimer) => currentTimer - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleResend = () => {
    // Trigger the resend OTP request here before restarting the countdown.
    setTimer(59);
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    setError("");

    if (digit && index < nextOtp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (nextOtp.every(Boolean)) {
      verifyOTP(nextOtp);
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  function verifyOTP(currentOtp = otp) {
    if (currentOtp.some((digit) => !digit)) {
      setError("Please enter all six digits of the OTP.");
      return;
    }

    setError("");
    // Submit the complete OTP here.
  }

  return (
    <section className="relative overflow-hidden font-manrope">
      <div className="flex min-h-screen items-center justify-center px-3 py-6 ">
        <div className="md:bg-purple-100/30 p-8 flex flex-col gap-10 items-center text-center md:rounded-4xl md:w-120">
          <div>
            <div className="bg-purple-50 w-fit mx-auto rounded-full p-3">
              <ShieldCheckIcon className="w-16 h-16 text-purple-800" />
            </div>
            <div>
              <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                Verify Your Account
              </h1>
              <p className="text-gray-400 mt-1">
                Help us to set up your account
              </p>
            </div>
          </div>

          <div className=" space-x-4">
            <a
              href="#"
              onClick={() => setActiveTab("phone")}
              className={`btn ${activeTab === "phone" ? "bg-purple-800 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              Phone
            </a>

            <a
              href="#"
              onClick={() => setActiveTab("email")}
              className={`btn ${activeTab === "email" ? "bg-purple-800 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              Email
            </a>
          </div>

          <div>
            <p className="font-semibold text-gray-600">
              Enter the 6-digit code sent to
            </p>
            <p className="font-bold">+234 {}XX XXX XXXX</p>
          </div>

          {/* OTP BOX */}
          <div className="gap-2 flex">
            {otp.map((digit, index) => (
              <div
                key={index}
                className="w-10 h-10 border-2 flex justify-center items-center p-1 rounded-xl border-purple-200"
              >
                <input
                  ref={(input) => {
                    inputRefs.current[index] = input;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleOtpChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  aria-label={`OTP digit ${index + 1}`}
                  className="w-full text-center focus:outline-none"
                />
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {timer === 0 ? (
            <button
              type="button"
              onClick={handleResend}
              className="cursor-pointer hover:underline text-sm font-semibold text-gray-500"
            >
              Resend code
            </button>
          ) : (
            <span className="text-sm font-semibold text-gray-500">
              Resend code in 00:{String(timer).padStart(2, "0")}
            </span>
          )}
          <div>
            <button className="btn primary-btn" onClick={verifyOTP}>
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
