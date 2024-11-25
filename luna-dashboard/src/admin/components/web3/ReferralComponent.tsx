export const ReferralLinkComponent = ({ code }: { code: string }) => {
  // const referralLink = `https://lunalotto.io/referral/${code ?? ""}`;
  const referralLink = `${window.location.origin}/referral/${code ?? ""}`;

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        alert("Referral link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="wallet-address"
        className="block text-sm font-medium text-gray-300"
      >
        Your Referral Link
      </label>
      <div className="mt-2 flex items-center space-x-2">
        <a
          href={referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {referralLink}
        </a>
        <button
          onClick={handleCopyToClipboard}
          className="px-3 py-1 bg-blue-600 text-white rounded-md"
        >
          Copy
        </button>
      </div>
    </div>
  );
};
