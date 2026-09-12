import { ChatBubbleLeftRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

const conversations = [
  {
    id: 1,
    name: "David Okafor",
    avatar: "",
    lastMessage: "I can help with your electrical repair tomorrow.",
    time: "10:42 AM",
  },
  {
    id: 2,
    name: "David Okafor",
    avatar: "",
    lastMessage: "I can help with your electrical repair tomorrow.",
    time: "10:42 AM",
  },
];

export default function MessagesPage() {
  const hasMessages = conversations.length > 0;

  return (
    <main className="mx-auto w-full max-w-3xl px-1 py-2 sm:px-3 sm:py-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-purple-950 sm:text-3xl">
          Messages
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Keep up with your conversations.
        </p>
      </header>

      {hasMessages ? (
        <section className="overflow-hidden rounded-2xl border border-purple-100 bg-white">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              to={`/Messages/artisan/${conversation.id}`}
              className="flex items-center gap-3 border-b border-slate-100 p-4 transition-colors last:border-b-0 hover:bg-purple-50 sm:gap-4"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-purple-100">
                {conversation.avatar ? (
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center font-bold text-purple-700">
                    {conversation.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-bold text-purple-950">
                    {conversation.name}
                  </span>
                  <span className="shrink-0 text-xs text-slate-400">
                    {conversation.time}
                  </span>
                </span>
                <span className="mt-1 block truncate text-xs text-slate-500">
                  {conversation.lastMessage}
                </span>
              </span>
              <ChevronRightIcon className="h-5 w-5 shrink-0 text-slate-400" />
            </Link>
          ))}
        </section>
      ) : (
        <section className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center rounded-2xl border border-purple-100 bg-white px-5 py-12 text-center">
          <span className="rounded-full bg-purple-100 p-5 text-purple-700">
            <ChatBubbleLeftRightIcon className="h-12 w-12" />
          </span>
          <h2 className="mt-5 text-xl font-bold text-purple-900 sm:text-2xl">
            No messages yet
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-5 text-slate-500">
            Start a conversation with a professional to ask questions or
            discuss your service needs.
          </p>
          <Link
            to="/professional"
            className="mt-6 rounded-lg bg-purple-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-900"
          >
            Find a professional
          </Link>
        </section>
      )}
    </main>
  );
}