import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { GrMailOption } from "react-icons/gr";
import { ImSpinner2 } from "react-icons/im";
import { MdSecurity } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import logoDark from "../../assets/logo.jpeg";
import { API_BASE_URL } from "../../config/api";

const emailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

const resetPasswordSchema = z
  .object({
    otp: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit OTP"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirm: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ["password_confirm"],
    message: "Passwords do not match",
  });

function formatApiError(errorData) {
  if (typeof errorData === "string") return errorData;
  if (errorData?.message) return errorData.message;
  if (errorData?.detail) return errorData.detail;

  if (errorData && typeof errorData === "object") {
    return Object.entries(errorData)
      .map(([field, messages]) => {
        const value = Array.isArray(messages) ? messages.join(", ") : String(messages);
        return `${field.replaceAll("_", " ")}: ${value}`;
      })
      .join(" | ");
  }

  return "Unable to reset your password.";
}

async function readResponse(response) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(
    () => sessionStorage.getItem("password_reset_email") || "",
  );
  const [formState, setFormState] = useState({
    loading: false,
    error: false,
    success: false,
    message: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function showError(message) {
    setFormState({ loading: false, error: true, success: false, message });
  }

  function startLoading() {
    setFormState({ loading: true, error: false, success: false, message: "" });
  }

  async function handleRequestReset(event) {
    event.preventDefault();
    startLoading();

    const validation = emailSchema.safeParse({
      email: new FormData(event.currentTarget).get("email"),
    });

    if (!validation.success) {
      showError(validation.error.issues[0].message);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const responseData = await readResponse(response);

      if (!response.ok) throw new Error(formatApiError(responseData));

      sessionStorage.setItem("password_reset_email", validation.data.email);
      setEmail(validation.data.email);
      setFormState({
        loading: false,
        error: false,
        success: true,
        message: responseData.message || "OTP sent successfully.",
      });
      setStep(2);
    } catch (error) {
      showError(error instanceof Error ? error.message : "Unable to send the OTP.");
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    startLoading();

    const formData = new FormData(event.currentTarget);
    const validation = resetPasswordSchema.safeParse({
      otp: formData.get("otp"),
      password: formData.get("password"),
      password_confirm: formData.get("password_confirm"),
    });

    if (!validation.success) {
      showError(validation.error.issues[0].message);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...validation.data }),
      });
      const responseData = await readResponse(response);

      if (!response.ok) throw new Error(formatApiError(responseData));

      setFormState({
        loading: false,
        error: false,
        success: true,
        message: responseData.message || "Password updated successfully.",
      });
      
      sessionStorage.removeItem("password_reset_email");
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (error) {
      showError(error instanceof Error ? error.message : "Unable to update your password.");
    }
  }

  const message = formState.message && (
    <div
      role={formState.error ? "alert" : "status"}
      className={`rounded-md border p-3 text-sm ${
        formState.success
          ? "border-green-200 bg-green-100 text-green-700"
          : "border-red-200 bg-red-100 text-red-600"
      }`}
    >
      {formState.message}
    </div>
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-purple-50 px-4 py-8 font-manrope">
      <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(76,29,149,0.12)] sm:p-8">
        <div className="mb-6 flex justify-center">
          <img src={logoDark} alt="HomeAid Logo" width={170} />
        </div>
        <h1 className="text-center text-2xl font-extrabold text-purple-900">
          {step === 1 ? "Forgot Password?" : "Reset Password"}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          {step === 1
            ? "Enter your email and we will send you a password reset OTP."
            : `Enter the OTP sent to ${email} and choose a new password.`}
        </p>

        {step === 1 ? (
          <form onSubmit={handleRequestReset} className="mt-6 space-y-4">
            <label className="label" htmlFor="reset-email">Email Address</label>
            <div className="input-field">
              <GrMailOption className="text-purple-500" />
              <input
                id="reset-email"
                name="email"
                type="email"
                required
                className="w-full bg-transparent focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            {message}
            <button type="submit" disabled={formState.loading} className="primary-btn btn">
              {formState.loading ? <><ImSpinner2 className="mr-2 inline h-4 w-4 animate-spin" />Sending OTP...</> : "Reset Password"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="reset-otp">OTP</label>
              <input id="reset-otp" name="otp" inputMode="numeric" maxLength={6} required className="mt-1 w-full rounded-lg border-2 border-purple-200 px-4 py-2 text-purple-900 focus:outline-none" placeholder="Enter 6-digit OTP" />
            </div>
            <div>
              <label className="label" htmlFor="reset-password">New Password</label>
              <div className="input-field">
                <MdSecurity className="text-purple-500" />
                <input id="reset-password" name="password" type={passwordVisible ? "text" : "password"} required className="w-full bg-transparent focus:outline-none" placeholder="Create a new password" />
                <button type="button" aria-label="Toggle password visibility" onClick={() => setPasswordVisible((visible) => !visible)}>
                  {passwordVisible ? <BiHide /> : <BiShow />}
                </button>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="reset-password-confirm">Confirm Password</label>
              <div className="input-field">
                <MdSecurity className="text-purple-500" />
                <input id="reset-password-confirm" name="password_confirm" type={confirmPasswordVisible ? "text" : "password"} required className="w-full bg-transparent focus:outline-none" placeholder="Confirm your new password" />
                <button type="button" aria-label="Toggle confirm password visibility" onClick={() => setConfirmPasswordVisible((visible) => !visible)}>
                  {confirmPasswordVisible ? <BiHide /> : <BiShow />}
                </button>
              </div>
            </div>
            {message}
            <button type="submit" disabled={formState.loading} className="primary-btn btn">
              {formState.loading ? <><ImSpinner2 className="mr-2 inline h-4 w-4 animate-spin" />Updating password...</> : "Update password"}
            </button>
          </form>
        )}

        <Link to="/login" className="mt-6 block text-center text-sm font-semibold text-purple-700 hover:underline">
          Back to login
        </Link>
      </section>
    </main>
  );
}
