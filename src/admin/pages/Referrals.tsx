import { useEffect, useState } from "react";
import { ReferralService } from "../../lib/referral";
import { useWallet } from "@solana/wallet-adapter-react";

function ReferralNode({
  node,
  isRoot = false,
}: {
  node: ReferralNode;
  isRoot?: boolean;
}) {
  return (
    <div className={`${isRoot ? "" : "ml-8"} mb-4`}>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isRoot ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          <span className="text-sm font-medium text-white">
            {node.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <p className="font-medium text-white">
            {node.name} - {node.id}
          </p>
          <p className="text-sm text-gray-300">
            {node.children.length} direct referral
            {node.children.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className="mt-4 border-l border-gray-700 pl-4">
          {node.children.map((child) => (
            <ReferralNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ReferralsPage() {
  const [referrals, setReferrals] = useState<ReferralNode>();
  const wallet = useWallet();
  const handleGetReferrals = async () => {
    const pubkey = wallet.publicKey?.toBase58();
    if (pubkey) {
      const referralsList = await ReferralService.getReferrals(pubkey);
      setReferrals(referralsList);
    }
  };
  useEffect(() => {
    handleGetReferrals();
    fetchCommisions();
  }, [wallet]);

  async function fetchCommisions() {
    const commissions = await ReferralService.calculateNftCommissions(
      wallet.publicKey?.toBase58()!,
      1000
    );
    console.log("commissions", JSON.stringify(commissions));
  }

  return (
    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Your Referral Network
      </h1>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {referrals && <ReferralNode node={referrals} isRoot={true} />}
        </div>
      </div>
    </div>
  );
}
