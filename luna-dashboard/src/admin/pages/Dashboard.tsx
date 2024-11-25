// import { useEffect } from "react";
// import { ReferralService } from "../services/referral";
import { ReferralSummary } from "../components/ReferralSummary";
import { ReferralTable } from "../components/ReferralTable";

export default function DashboardPage() {
  // async function fetchCommisions() {
  //   const commissions = await ReferralService.calculateNftCommissions(
  //     "(Tkc2U}qO,",
  //     1000
  //   );
  //   console.log("commissions", JSON.stringify(commissions));
  // }
  // useEffect(() => {
  //   fetchCommisions();
  //   return () => {};
  // }, []);

  return (
    <>
      <div className="mb-8 rounded-xl bg-white/10 p-6 backdrop-blur-lg">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="mb-6 md:mb-0 flex-1">
            <h1 className="mb-2 text-3xl font-bold text-green-400">
              REFER FRIENDS. EARN BY EACH FRIENDS TRADES.
            </h1>
            <p className="mb-4 text-white">
              Earn Up To 30% Commission On Every Trade Across Spot.
            </p>
            <p className="text-sm text-gray-300">
              Data update time refers to UTC + 0 time zone. the calculation of
              today&apos;s data is based on the assets of previous day
            </p>
            <button className="mt-4 text-sm text-green-400 hover:underline">
              Referral Rules
            </button>
          </div>
          <div className="md:w-80">
            <pre></pre>
            <ReferralSummary />
          </div>
        </div>
      </div>
      <ReferralTable />
    </>
  );
}
