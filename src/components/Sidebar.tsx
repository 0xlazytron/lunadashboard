"use client";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, Users, User, Settings, LogOut } from "lucide-react";

const routes = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/transactions",
    icon: Receipt,
    label: "Transactions",
  },
  {
    href: "/referrals",
    icon: Users,
    label: "Referrals",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profile",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

export function Sidebar() {
  const location = useLocation(); // Replacing usePathname with useLocation
  const pathname = location.pathname;

  return (
    <aside className="hidden w-64 shrink-0 rounded-xl bg-white/10 p-4 backdrop-blur-lg md:block">
      <nav className="space-y-2">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.href;

          return (
            <NavLink
              key={route.href}
              to={route.href}
              className={`flex items-center rounded-lg px-4 py-2 transition-colors ${isActive
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {route.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto pt-4">
        <button className="flex w-full items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white">
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </button>
      </div>
    </aside>
  );
}
