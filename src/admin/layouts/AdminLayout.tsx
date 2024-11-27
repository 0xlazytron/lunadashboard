import "../index.css";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4 md:p-8">
      <div className="flex min-h-screen flex-col gap-4 md:gap-8">
        <Navbar />
        <div className="flex flex-1 gap-4 md:gap-8 z-10">
          <Sidebar callBack={() => {}} className="hidden lg:block" />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
