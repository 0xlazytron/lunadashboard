import {
  Users,
  GitBranch,
  Image,
  Ticket,
  LucideIcon,
  LoaderCircle,
} from "lucide-react";
import { ReferralService } from "../../lib/referral";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

// Mock data (replace with actual data fetching in a real application)
const adminData = {
  totalUsers: 1000,
  totalReferrals: 500,
  totalNFTsMinted: 250,
  totalTicketsSold: 5000,
};

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: LucideIcon;
}) => (
  <div className="bg-white/10 rounded-xl p-6 flex items-center">
    <Icon className="h-12 w-12 text-green-400 mr-4" />
    <div>
      <h3 className="krona text-lg font-semibold text-white">{title}</h3>
      <p className="poppins-regular text-2xl font-bold text-green-400">{value}</p>
    </div>
  </div>
);

const ReferralTree = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<UserReferralMeta[]>([]);

  const [selectedReferee, setSelectedReferee] = useState<string>("");

  const wallet = useWallet();
  const handleGetReferrals = async () => {
    const pubkey = wallet.publicKey?.toBase58();
    if (pubkey && wallet.connected) {
      const _data = await ReferralService.getAllReferralDataWithCount();

      setData(_data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleGetReferrals();
  }, []);
  return (
    <div className="bg-white/10 rounded-xl p-6 mt-6">
      <h3 className="krona text-lg font-semibold text-white mb-4">Referral Tree</h3>
      <div className="text-white">
        <div className="flex flex-wrap gap-4">
          {data.map((user, index) => (
            <button
              onClick={() => {
                setSelectedReferee(user.pubKey);
              }}
              key={index}
              className="flex items-center gap-2"
            >
              <span
                className="text-blue-400 hover:text-blue-300 hover:underline poppins-regular"
                aria-label={`View ${user.name}'s referrals`}
              >
                {user.name}
              </span>
              <span
                className="poppins-regular inline-flex items-center justify-center w-6 h-6 bg-green-500 rounded-full text-xs font-medium text-white"
                aria-label={`${user.count} referrals`}
              >
                {user.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="my-3">
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          selectedReferee && <ReferralsPage pubKey={selectedReferee} />
        )}
      </div>
    </div>
  );
};

export default function AdminOverview() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  useEffect(() => {
    async function fetchData() {
      const _totalUsers = await ReferralService.getTotalUsers();
      setTotalUsers(_totalUsers);
    }
    fetchData();
    return () => { };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6 krona">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={totalUsers} icon={Users} />
        <StatCard
          title="Total Referrals"
          value={adminData.totalReferrals}
          icon={GitBranch}
        />
        <StatCard
          title="NFTs Minted"
          value={adminData.totalNFTsMinted}
          icon={Image}
        />
        <StatCard
          title="Tickets Sold"
          value={adminData.totalTicketsSold}
          icon={Ticket}
        />
      </div>
      <ReferralTree />
    </div>
  );
}

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
          className={`flex h-10 w-10 items-center justify-center rounded-full ${isRoot ? "bg-green-500" : "bg-blue-500"
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

function ReferralsPage({ pubKey }: { pubKey: string }) {
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<ReferralNode>();
  const handleGetReferrals = async () => {
    if (pubKey) {
      const referralsList = await ReferralService.getReferrals(pubKey);
      setReferrals(referralsList);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    handleGetReferrals();
  }, [pubKey]);

  return (
    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Your Referral Network
      </h1>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            referrals && <ReferralNode node={referrals} isRoot={true} />
          )}
        </div>
      </div>
    </div>
  );
}
