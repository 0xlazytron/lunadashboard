import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";

// Mock data for NFTs and tokens
const nfts = [
  { id: 1, name: "Luna Founders #1000", video: "/assets/nfts/1000.webm" },
  { id: 2, name: "Luna Founders #50000", video: "./assets/nfts/50000.webm" },
  { id: 3, name: "Luna Ticket #25000", video: "/assets/nfts/25000.webm" },
  { id: 3, name: "Luna Ticket #500", video: "/assets/nfts/500.webm" },
  // Add more NFTs as needed
];

const tokens = [
  { id: 1, name: "Ethereum", symbol: "ETH", balance: "2.5" },
  { id: 2, name: "USD Coin", symbol: "USDC", balance: "1000" },
  // Add more tokens as needed
];

export function ProfilePage() {
  const wallet = useWallet();
  const { connection } = useConnection();
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
    <div className="space-y-6">
      <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
        <h1 className="mb-4 text-2xl font-bold text-white">Your Profile</h1>
        <div className="text-lg text-white">
          Total Wallet Balance:{balance.toFixed(2)} SOL
        </div>
      </div>

      <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
        <h2 className="mb-4 text-xl font-bold text-white">Your NFTs</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {nfts.map((nft) => (
            <div key={nft.id} className="rounded-lg bg-white/5 p-3">
              <video src={nft.video} className="mb-2 rounded-md" />
              <p className="text-sm text-white">{nft.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
        <h2 className="mb-4 text-xl font-bold text-white">Your Tokens</h2>
        <div className="space-y-4">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between rounded-lg bg-white/5 p-3"
            >
              <div>
                <p className="font-medium text-white">{token.name}</p>
                <p className="text-sm text-gray-300">{token.symbol}</p>
              </div>
              <p className="text-white">{token.balance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
