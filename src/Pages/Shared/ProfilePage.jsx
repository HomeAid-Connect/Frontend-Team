import {
  ArrowLeftIcon,
  CameraIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  XMarkIcon, 
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Link } from "react-router";

const MAX_PROFILE_IMAGE_SIZE = 2 * 1024 * 1024;
const PROFILE_IMAGE_KEY = "homeaid-profile-image";

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    () => localStorage.getItem(PROFILE_IMAGE_KEY) || "",
  );
  const [imageError, setImageError] = useState("");
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    username: "Nehhy",
    phone: "0807100354",
    email: "zaramuomelite@gmail.com",
    gender: "Not set",
    dateOfBirth: "Not set",
    location: "Lagos",
  });
  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue] = useState("");
  const user = { name: profileInfo.username };
  const profileInitial = user.name?.trim().charAt(0).toUpperCase() || "U";
  const personalInformation = [
    { label: "Username", key: "username", type: "text" },
    { label: "Phone Number", key: "phone", type: "tel" },
    { label: "Email", key: "email", type: "email" },
    { label: "Gender", key: "gender", type: "text" },
    { label: "Date of Birth", key: "dateOfBirth", type: "date" },
    { label: "Location", key: "location", type: "text" },
  ];

  function notifySettingsPage() {
    window.dispatchEvent(new Event("profile-image-changed"));
  }

  function handleProfileImageChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file.");
      return;
    }

    if (file.size > MAX_PROFILE_IMAGE_SIZE) {
      setImageError("Please choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = typeof reader.result === "string" ? reader.result : "";
      if (!imageData) {
        setImageError("Unable to read this image. Please try another one.");
        return;
      }

      localStorage.setItem(PROFILE_IMAGE_KEY, imageData);
      setProfileImage(imageData);
      setImageError("");
      setIsImageMenuOpen(false);
      notifySettingsPage();
    };
    reader.onerror = () => setImageError("Unable to read this image.");
    reader.readAsDataURL(file);
  }

  function handleAvatarClick() {
    if (profileImage) {
      setIsImageMenuOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  }

  function handleRemoveProfileImage() {
    localStorage.removeItem(PROFILE_IMAGE_KEY);
    setProfileImage("");
    setIsImageMenuOpen(false);
    setImageError("");
    notifySettingsPage();
  }

  function handleViewProfileImage() {
    window.open(profileImage, "_blank", "noopener,noreferrer");
    setIsImageMenuOpen(false);
  }

  function startEditing(field) {
    setEditingField(field.key);
    setDraftValue(
      field.type === "date" && profileInfo[field.key] === "Not set"
        ? ""
        : profileInfo[field.key],
    );
  }

  function saveField(field) {
    const value =
      field.type === "date" && !draftValue ? "Not set" : draftValue.trim();

    if (!value) return;

    setProfileInfo((currentProfile) => ({
      ...currentProfile,
      [field.key]: value,
    }));
    setEditingField(null);
    setDraftValue("");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-1 py-2 sm:px-3 sm:py-4">
      <header className="mb-6 flex items-center justify-between">
        <Link
          to="/Settings"
          aria-label="Back to settings"
          className="rounded-full p-1 text-purple-700 hover:bg-purple-100"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          My Profile
        </h1>
        <span className="w-8" />
      </header>

      <section className="relative flex min-h-44 items-center justify-center rounded-3xl border border-purple-200 bg-purple-50 p-6">
        <div className="relative h-28 w-28 sm:h-32 sm:w-32">
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label={profileImage ? "Manage profile picture" : "Upload profile picture"}
            className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-white bg-purple-200 text-4xl font-bold text-purple-800 shadow-sm"
          >
            {profileImage ? (
              <img src={profileImage} alt="Your profile" className="h-full w-full object-cover" />
            ) : (
              profileInitial
            )}
          </button>
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label="Manage profile picture"
            className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-purple-700 p-2 text-white shadow-md hover:bg-purple-900"
          >
            <CameraIcon className="h-5 w-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </div>
       
      </section>

      {imageError && (
        <p className="mt-2 text-xs font-medium text-red-600" role="alert">
          {imageError}
        </p>
      )}

      <section className="mt-12 rounded-3xl border border-purple-200 bg-purple-50 p-5 sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-purple-900">
          Personal Information
        </h2>
        {personalInformation.map((field) => {
          const isEditing = editingField === field.key;
          const value = profileInfo[field.key];

          return (
            <div
              key={field.key}
              className="border-b border-purple-100 py-4 last:border-b-0"
            >
              {isEditing ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    saveField(field);
                  }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <label
                    htmlFor={`profile-${field.key}`}
                    className="text-sm font-semibold text-slate-500"
                  >
                    {field.label}
                  </label>
                  <div className="flex min-w-0 flex-1 gap-2">
                    <input
                      id={`profile-${field.key}`}
                      type={field.type}
                      value={draftValue}
                      onChange={(event) => setDraftValue(event.target.value)}
                      autoFocus
                      className="min-w-0 flex-1 rounded-lg border border-purple-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-purple-700"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-purple-700 px-3 py-2 text-xs font-semibold text-white hover:bg-purple-900"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingField(null)}
                      className="rounded-lg border border-purple-200 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => startEditing(field)}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <span className="text-sm font-semibold text-slate-500">
                    {field.label}
                  </span>
                  <span className="ml-auto truncate text-right text-sm text-slate-700 sm:text-base">
                    {value}
                  </span>
                  <ChevronRightIcon className="h-5 w-5 shrink-0 text-slate-500" />
                </button>
              )}
            </div>
          );
        })}
      </section>

      {isImageMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsImageMenuOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-purple-950">Profile picture</h2>
              <button
                type="button"
                aria-label="Close profile picture menu"
                onClick={() => setIsImageMenuOpen(false)}
                className="rounded-full p-1 text-slate-500 hover:bg-purple-50"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={handleViewProfileImage}
                className="rounded-lg border border-purple-200 px-4 py-2 text-left text-sm font-semibold text-purple-800 hover:bg-purple-50"
              >
                View photo
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-purple-200 px-4 py-2 text-left text-sm font-semibold text-purple-800 hover:bg-purple-50"
              >
                Upload new photo
              </button>
              <button
                type="button"
                onClick={handleRemoveProfileImage}
                className="rounded-lg px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Remove photo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
