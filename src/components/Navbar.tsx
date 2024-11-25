"use client";

import { Button } from "./ui/Button";
import { MenuIcon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-xl bg-white/10 p-4 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <img src={"/assets/logo.svg"} alt="Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold text-white">Lunalotto</h1>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={"/assets/avatars/rabbit.png"}
          alt="User"
          className="h-8 w-8 rounded-full"
        />
        <Button variant="ghost" className="text-white">
          Connect Wallet
        </Button>
        <Button variant="ghost" className="md:hidden">
          <MenuIcon className="h-6 w-6 text-white" />
        </Button>
      </div>
    </nav>
  );
}
