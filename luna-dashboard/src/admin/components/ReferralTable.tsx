import { Copy, Share2 } from "lucide-react";

export function ReferralTable() {
  const data = [
    { image: "/assets/avatars/bear.png", wallet: "0x1234...5678" },
    { image: "/assets/avatars/rabbit.png", wallet: "0xabcd...1234" },
    { image: "/assets/avatars/panda.png", wallet: "0x9876...5432" },
    { image: "/assets/avatars/astroo.png", wallet: "0x4c88...Fb98" },
    { image: "/assets/avatars/astro.png", wallet: "0x3fD7...EDfA" },
  ]; // Shortened wallet addresses

  return (
    <div className="overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg">
      <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-gray-300">
        <div>Wallet address</div>
        <div>Your Receive</div>
        <div>Friend Receive</div>
        <div>Referred Users</div>
        <div>Friends Who Purchased NFTs</div>
      </div>
      {data.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-5 gap-4 border-t border-gray-700 p-4 text-sm text-white"
        >
          <div className="flex items-center">
            <img
              src={item.image}
              alt={`User ${i + 1}`}
              className="mr-2 h-8 w-8 rounded-full"
            />
            <span>{item.wallet}</span>
          </div>
          <div>30%</div>
          <div>0%</div>
          <div>0</div>
          <div className="flex items-center justify-between">
            <span>0</span>
            <div className="flex gap-2">
              <button className="rounded-lg bg-white/10 p-2 hover:bg-white/20">
                <Copy className="h-4 w-4" />
              </button>
              <button className="rounded-lg bg-white/10 p-2 hover:bg-white/20">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
