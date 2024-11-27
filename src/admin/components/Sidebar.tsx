import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  Settings,
  Shield,
  Book,
  Award,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { HBox, VBox } from "../../components/directional/flex"; // Adjust the import path according to your file structure

const routes = [
  {
    disabled: false,
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    disabled: false,
    href: "/dashboard/referrals",
    icon: Users,
    label: "Referrals",
  },
  {
    disabled: false,
    href: "/dashboard/profile",
    icon: User,
    label: "Profile",
  },
  {
    disabled: false,
    href: "/dashboard/settings",
    icon: Settings,
    label: "Settings",
  },
  {
    href: "/dashboard/rules",
    icon: Book,
    label: "Referral Rules",
  },

  {
    href: "/dashboard/badges",
    icon: Award,
    label: "Badges",
  },
];

export function Sidebar({
  className = "",
  callBack = () => {},
}: {
  className?: string | undefined;
  callBack: () => void;
}) {
  const location = useLocation();
  const { publicKey } = useWallet();
  const pathname = location.pathname;

  return (
    <aside
      className={`w-64 shrink-0 rounded-xl bg-white/10 p-4 backdrop-blur-lg ${className}`}
    >
      <VBox as="nav" className="space-y-2">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.href;
          return (
            <NavLink
              key={route.href}
              to={route.disabled ? "" : route.href}
              onClick={callBack}
              className={`flex items-center rounded-lg px-4 py-2 transition-colors ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <HBox className="items-center">
                <Icon className="mr-3 h-5 w-5" />
                <span>{route.label}</span>
              </HBox>
            </NavLink>
          );
        })}

        {publicKey &&
          publicKey.toBase58() ===
            "Do6xPSZRBbpVjeJqMKtTeUzs9wrYRjLKdb649GacinSY" && (
            <NavLink
              to={"/dashboard/overview"}
              className={`flex items-center rounded-lg px-4 py-2 transition-colors ${
                pathname === "/dashboard/overview"
                  ? "bg-white/20 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <HBox className="items-center">
                <Shield className="mr-3 h-5 w-5" />
                <span>Admin Overview</span>
              </HBox>
            </NavLink>
          )}
      </VBox>
    </aside>
  );
}
