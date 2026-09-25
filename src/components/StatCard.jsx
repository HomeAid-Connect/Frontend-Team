export default function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="flex min-h-20 flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_20px_rgba(148,163,184,0.16)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xl text-purple-700">
        <Icon />
      </div>
      <div>
        <p className="text-lg font-extrabold leading-none text-purple-800">
          {value}
        </p>
        <p className="mt-1 text-[11px] text-gray-500">{label}</p>
      </div>
    </div>
  );
}
