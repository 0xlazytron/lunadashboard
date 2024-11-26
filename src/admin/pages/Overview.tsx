import { Users, GitBranch, Image, Ticket, LucideIcon } from 'lucide-react';

// Mock data (replace with actual data fetching in a real application)
const adminData = {
    totalUsers: 1000,
    totalReferrals: 500,
    totalNFTsMinted: 250,
    totalTicketsSold: 5000,
};

// Mock referral data
const referralData = Array(10).fill({
    name: "Lars",
    referralCount: 12
});

const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: LucideIcon }) => (
    <div className="bg-white/10 rounded-xl p-6 flex items-center">
        <Icon className="h-12 w-12 text-green-400 mr-4" />
        <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-2xl font-bold text-green-400">{value}</p>
        </div>
    </div>
);

const ReferralTree = () => (
    <div className="bg-white/10 rounded-xl p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Referral Tree</h3>
        <div className="text-white">
            <div className="flex flex-wrap gap-4">
                {referralData.map((user, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <a
                            href="#"
                            className="text-blue-400 hover:text-blue-300 hover:underline"
                            aria-label={`View ${user.name}'s referrals`}
                        >
                            {user.name}
                        </a>
                        <span
                            className="inline-flex items-center justify-center w-6 h-6 bg-green-500 rounded-full text-xs font-medium text-white"
                            aria-label={`${user.referralCount} referrals`}
                        >
                            {user.referralCount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default function AdminOverview() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white mb-6">Admin Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={adminData.totalUsers} icon={Users} />
                <StatCard title="Total Referrals" value={adminData.totalReferrals} icon={GitBranch} />
                <StatCard title="NFTs Minted" value={adminData.totalNFTsMinted} icon={Image} />
                <StatCard title="Tickets Sold" value={adminData.totalTicketsSold} icon={Ticket} />
            </div>
            <ReferralTree />
        </div>
    );
}

