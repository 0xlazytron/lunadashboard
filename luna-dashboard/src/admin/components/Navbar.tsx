import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { MenuIcon } from "lucide-react";
import { NetworkSwitcher } from "../components/web3/NetworkSwitcher";

import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

export function Navbar() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);

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

  return (
    <nav className="flex items-center z-30 justify-between rounded-xl bg-white/10 p-4 backdrop-blur-lg">
      <Link to={"/"} className="flex items-center gap-4">
        <img src={"/assets/logo.svg"} alt="Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold text-white">Lunalotto</h1>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex  bg-transparent">
          <NetworkSwitcher />
          <div className="flex justify-center items-center gap-[2rem] lg:flex-row flex-col w-max   rounded-[10px] ">
            <span>{balance.toFixed(2)} SOL</span>
          </div>
        </div>

        <img
          src={"/assets/avatars/rabbit.png"}
          alt="User"
          className="h-8 w-8 rounded-full"
        />
        <Button variant="ghost" className="md:hidden">
          <MenuIcon className="h-6 w-6 text-white" />
        </Button>
      </div>
    </nav>
  );
}