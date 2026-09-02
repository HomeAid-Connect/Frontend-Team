import { } from 'react'
import { CiSettings } from "react-icons/ci";
import { CalendarDaysIcon, HomeIcon, UserIcon, WrenchScrewdriverIcon } from "@heroicons/react/16/solid";
import { BiMessageRounded} from "react-icons/bi";
import { IoAlertCircleOutline } from "react-icons/io5";


export const nav = [
    {
        icon: HomeIcon,
        title: 'Home'
    },
    {
        icon: WrenchScrewdriverIcon,
        title: 'Services'
    },
    {
        icon: CalendarDaysIcon,
        title: 'Bookings'
    },
    {
        icon: IoAlertCircleOutline,
        title: 'SOS'
    },
    {
        icon: BiMessageRounded,
        title: 'Messages'
    },
    {
        icon: CiSettings,
        title: 'Settings'
    }

] 