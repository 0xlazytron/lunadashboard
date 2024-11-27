import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { MenuIcon } from "lucide-react";
import { NetworkSwitcher } from "../../components/web3/NetworkSwitcher";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Navbar() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetch() {
      const _balance = await connection.getBalance(
        wallet.publicKey!,
        "confirmed"
      );
      setBalance((_prev) => _balance / LAMPORTS_PER_SOL);
    }
    if (wallet && connection && wallet.connected) {
      fetch();
    }
  }, [wallet, connection]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center z-30 justify-between rounded-xl bg-white/10 p-4 backdrop-blur-lg">
      <Link to={"/"} className="flex items-center gap-4">
        <img src={"/assets/logo.svg"} alt="Logo" className="h-10 w-10" />
        <h1 className="krona text-2xl font-bold text-white">Lunalotto</h1>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex bg-transparent">
          <NetworkSwitcher />
          <div className="hidden lg:flex justify-center items-center w-fit bg-[#86C248]  duration-300 text-white font-bold px-4 rounded-full">
            <span>{balance.toFixed(2)} SOL</span>
          </div>
        </div>
        <img
          src={"/assets/avatars/rabbit.png"}
          alt="User"
          className="h-8 w-8 rounded-full"
        />
        <Button
          variant="ghost"
          className="block lg:hidden px-0 py-0 bg-transparent w-fit h-fit hover:bg-transparent outline-none border-0"
          onClick={toggleSidebar}
        >
          <MenuIcon className="h-6 w-6 text-white p-0" />
        </Button>
        {isSidebarOpen && (
          <div className="absolute top-24 left-0 right-0 bg-[#2f3647] rounded-lg shadow-lg">
            <Sidebar
              callBack={toggleSidebar}
              className="block lg:hidden w-full"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
