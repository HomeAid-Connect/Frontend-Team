import { Outlet } from "react-router";
import Header from "./Header";
import NavMobile from "./NavMobile";
export default function HomeLayout() {
  return (
      <section className="relative overflow-hidden font-manrope">
        <div className="flex min-h-screen m-1 overflow-hidden">

    <div className="tablet:flex overflow-hidden">
      <Header />
      <NavMobile/>
      <div className="flex-1 mb-15 tablet:mb-0 w-screen p-4 md:p-6 min-h-screen overflow-hidden bg-purple-50">
        <Outlet />
      </div>
    </div>

        </div>
    </section>
  );
}
