export function ReferralSummary() {
  return (
    <div className="rounded-xl bg-white/20 p-6 backdrop-blur-lg h-full">
      <h2 className="mb-4 text-xl font-semibold text-white">Referral Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-300">Your earning:</span>
          <span className="text-white">$1000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Friend who started trading:</span>
          <span className="text-white">1</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Friends:</span>
          <span className="text-white">6</span>
        </div>
      </div>
    </div>
  )
}

