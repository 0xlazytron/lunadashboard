import React from 'react';
import { Star, DollarSign, Award, Crown, Diamond } from 'lucide-react';

const affiliateSystem = [
    { level: 1, commission: 12 },
    { level: 2, commission: 6 },
    { level: 3, commission: 4 },
    { level: 4, commission: 2 },
    { level: 5, commission: 2 },
    { level: 6, commission: 1 },
    { level: 7, commission: 1 },
    { level: 8, commission: 1 },
    { level: 9, commission: 0.5 },
    { level: 10, commission: 0.5 },
];

const rankSystem = [
    { rank: 'Lucky Star', sales: 50000, bonus: 1000, icon: Star },
    { rank: 'High Roller', sales: 100000, bonus: 2500, icon: DollarSign },
    { rank: 'Jackpot Master', sales: 250000, bonus: 5000, icon: Award },
    { rank: 'Royal Ace', sales: 500000, bonus: 10000, icon: Crown },
    { rank: 'Casino Tycoon', sales: 1000000, bonus: 25000, icon: Diamond },
];

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        {children}
    </div>
);

export default function ReferralRules() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white mb-6">Referral Rules</h1>

            <Card title="10-Level Affiliate System">
                <p className="text-green-800 bg-green-100 p-4 rounded-lg mb-4">
                    Our affiliate system allows partners to earn commissions for selling LunaFounder NFTs.
                    The revenue is distributed across 10 levels, based on the price of the purchased NFT.
                </p>
                <table className="w-full text-white">
                    <thead>
                        <tr className="border-b border-white/20">
                            <th className="text-left py-2">Level</th>
                            <th className="text-right py-2">Commission (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {affiliateSystem.map(({ level, commission }) => (
                            <tr key={level} className="border-b border-white/10">
                                <td className="py-2">{level}</td>
                                <td className="text-right py-2">{commission}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul className="list-disc list-inside text-white mt-4 space-y-2">
                    <li>Commissions are paid instantly after NFT purchase.</li>
                    <li>Smart contract verifies the connection between buyer and affiliates.</li>
                    <li>Each wallet must own at least one LunaFounder NFT to qualify for commissions.</li>
                    <li>Revenue is distributed among eligible wallets within 10 levels above the buyer.</li>
                </ul>
            </Card>

            <Card title="Rank System">
                <p className="text-green-800 bg-green-100 p-4 rounded-lg mb-4">
                    The rank system rewards affiliates based on their generated team sales.
                    Higher ranks unlock bonuses and additional earnings.
                </p>
                <table className="w-full text-white">
                    <thead>
                        <tr className="border-b border-white/20">
                            <th className="text-left py-2">Rank</th>
                            <th className="text-right py-2">Team Sales (USD)</th>
                            <th className="text-right py-2">Bonus (USD)</th>
                            <th className="text-right py-2">Badge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankSystem.map(({ rank, sales, bonus, icon: Icon }) => (
                            <tr key={rank} className="border-b border-white/10">
                                <td className="py-2">{rank}</td>
                                <td className="text-right py-2">${sales.toLocaleString()}</td>
                                <td className="text-right py-2">${bonus.toLocaleString()}</td>
                                <td className="text-right py-2">
                                    <Icon className="inline-block h-6 w-6 text-yellow-400" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul className="list-disc list-inside text-white mt-4 space-y-2">
                    <li>Team sales are calculated based on NFT purchases across the entire structure.</li>
                    <li>Ranks are cumulative; affiliates hold the highest rank they qualify for.</li>
                    <li>A maximum of 50% of sales from a single structure counts toward rank advancement (50/50 rule).</li>
                    <li>Affiliates must own at least one LunaFounder NFT to receive rank bonuses.</li>
                </ul>
            </Card>

            <Card title="IMPORTANT INFO">
                <ul className="list-disc list-inside text-white space-y-2">
                    <li>Automatic calculation and payout of commissions.</li>
                    <li>Real-time or regularly updated team sales calculations.</li>
                    <li>Rank bonus distribution (can be manually triggered by admin).</li>
                    <li>All transactions and payouts are transparent and publicly visible on the blockchain.</li>
                </ul>
            </Card>
        </div>
    );
}

