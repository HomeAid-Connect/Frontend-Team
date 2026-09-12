import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArtisansDetails } from "../../data/ArtisansDetails";

export default function MessageArtisan() {
  const { artisanId } = useParams();
  const artisan =
    ArtisansDetails.find((item) => String(item.id) === artisanId) ||
    ArtisansDetails[0];
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Good morning! 🌞\nThanks for reaching out.\nHow may I help you today?",
      time: "10:16 AM",
      sender: "artisan",
    },
     {
      id: 17,
      text: "Good morning! 🌞\nThanks for reaching out.\nHow may I help you today?",
      time: "10:16 AM",
      sender: "user",
    },
  ]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        text: trimmedMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        sender: "user",
      },
    ]);
    setMessage("");
  }

  return (
    <main className="flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden">
      <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-1 py-3 sm:px-3">
        <Link
          to="/Messages"
          aria-label="Back to messages"
          className="rounded-full p-1 text-purple-700 hover:bg-purple-100"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>

        <img
          src={artisan.pics}
          alt={artisan.name}
          className="h-11 w-11 rounded-full border-2 border-purple-700 object-cover"
        />

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-bold text-slate-900 sm:text-base">
            {artisan.name}
          </h1>
          <p className="flex items-center gap-1 truncate text-xs text-slate-500">
            {artisan.skill} ·
            <StarIcon className="h-3 w-3 text-purple-700" />
            {artisan.ratings}
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Online
          </p>
        </div>

        <a
          href="tel:+2348000000000"
          aria-label={`Call ${artisan.name}`}
          className="rounded-full p-2 text-purple-700 hover:bg-purple-100"
        >
          <PhoneIcon className="h-5 w-5" />
        </a>
        <button
          type="button"
          aria-label="More conversation options"
          className="rounded-full p-2 text-purple-700 hover:bg-purple-100"
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </header>

      <div className="flex flex-1 flex-col overflow-y-auto bg-purple-50 px-3 py-5 sm:px-8">
        <div className="mb-5 flex items-center justify-center gap-3 text-[10px] font-bold text-slate-500">
          <span className="h-px w-10 bg-slate-200" />
          TODAY
          <span className="h-px w-10 bg-slate-200" />
        </div>

        <div className="space-y-4">
          {messages.map((chatMessage) => (
            <div
              key={chatMessage.id}
              className={`flex items-end gap-2 ${
                chatMessage.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {chatMessage.sender === "artisan" && (
                <img
                  src={artisan.pics}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs shadow-sm sm:max-w-md sm:text-sm ${
                  chatMessage.sender === "user"
                    ? "rounded-br-sm bg-purple-700 text-white"
                    : "rounded-bl-sm border border-slate-100 bg-white text-slate-700"
                }`}
              >
                <p className="whitespace-pre-line">{chatMessage.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    chatMessage.sender === "user"
                      ? "text-purple-200"
                      : "text-slate-400"
                  }`}
                >
                  {chatMessage.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_4px_20px_rgba(15,23,42,0.12)]"
      >
        <button
          type="button"
          aria-label="Add attachment"
          className="rounded-full bg-purple-700 p-2 text-white hover:bg-purple-900"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message..."
          aria-label="Message"
          className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="rounded-full bg-purple-700 p-2 text-white hover:bg-purple-900"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>
    </main>
  );
}
