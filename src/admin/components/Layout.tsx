import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4 md:p-8">
      <div className="flex min-h-screen flex-col gap-4 md:gap-8">
        {location.pathname !== "/" &&
          location.pathname !== "/rf" &&
          location.pathname !== "/pf" && <Navbar />}
        <div className="flex flex-1 gap-4 md:gap-8 z-10">
          {location.pathname !== "/" &&
            location.pathname !== "/rf" &&
            location.pathname !== "/pf" && (
              <Sidebar callBack={() => {}} className="hidden lg:block" />
            )}
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
