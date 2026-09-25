import {IoNotificationsOutline } from "react-icons/io5";



export default function NotificationBell({Notifications}) {
  return (
    <div className="bg-white p-2 m-2 rounded-full h-fit relative ">
      <IoNotificationsOutline />
      {Notifications.length >= 1 && (
        <div className="absolute text-[9px] bg-red-600 top-0 -right-1 w-4 h-4 flex items-center justify-center text-white rounded-full font-semibold">
          {Notifications.length}
        </div>
      )}
    </div>
  );
}
