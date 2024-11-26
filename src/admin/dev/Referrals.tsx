import { useState } from "react";
import { ReferralService } from "../../lib/referral";

export const ReferralsForm = () => {
  const [registerName, setRegisterName] = useState("");
  const [updateUserId, setUpdateUserId] = useState("");
  const [updateWallet, setUpdateWallet] = useState("");
  const [updateCharacter, setUpdateCharacter] = useState("");
  const [addReferralBy, setAddReferralBy] = useState("");
  // const [addReferralCode, setAddReferralCode] = useState("");
  const [getReferralsUser, setGetReferralsUser] = useState("");
  const [getReferralsDepth, setGetReferralsDepth] = useState(1);
  const [referrals, _] = useState<any[]>([]);
  const [perLevelReferrals, setPerLevelReferrals] = useState({});

  const handleRegisterUser = async () => {
    // const refCode = await ReferralService.registerUser(
    //   publicKey?.toBase58()!,
    //   registerName
    // );
    // alert(`User registered with referral code: ${refCode}`);
  };

  const handleUpdateInfo = async () => {
    await ReferralService.updateWalletInfo(
      updateUserId,
      updateWallet,
      updateCharacter
    );
    alert("User info updated.");
  };

  const handleAddReferral = async () => {
    const refCode = await ReferralService.addReferral(addReferralBy, "");
    alert(`Referral added with code: ${refCode}`);
  };

  const handleGetReferrals = async () => {
    // const referralsList = await ReferralService.getReferrals(
    //   getReferralsUser,
    //   getReferralsDepth
    // );
    // setReferrals(referralsList.children);
  };

  const handleGetPerLevelReferrals = async () => {
    const levelCounts = await ReferralService.getPerLevelReferrals(referrals);
    setPerLevelReferrals(levelCounts);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Referral System</h1>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Register User</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          placeholder="Character Name"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleRegisterUser}
        >
          Register
        </button>
      </div>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Update User Info</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          value={updateUserId}
          onChange={(e) => setUpdateUserId(e.target.value)}
          placeholder="User ID"
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          value={updateWallet}
          onChange={(e) => setUpdateWallet(e.target.value)}
          placeholder="Wallet"
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          value={updateCharacter}
          onChange={(e) => setUpdateCharacter(e.target.value)}
          placeholder="Character"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleUpdateInfo}
        >
          Update Info
        </button>
      </div>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Referral</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          value={addReferralBy}
          onChange={(e) => setAddReferralBy(e.target.value)}
          placeholder="Referred By"
        />
        {/* <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          value={addReferralCode}
          onChange={(e) => setAddReferralCode(e.target.value)}
          placeholder="Referral Code (optional)"
        /> */}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleAddReferral}
        >
          Add Referral
        </button>
      </div>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Get Referrals</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          value={getReferralsUser}
          onChange={(e) => setGetReferralsUser(e.target.value)}
          placeholder="User ID"
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="number"
          value={getReferralsDepth}
          onChange={(e) => setGetReferralsDepth(Number(e.target.value))}
          placeholder="Max Depth"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleGetReferrals}
        >
          Get Referrals
        </button>
        <ul className="list-disc list-inside mt-4">
          {referrals.map((referral, index) => (
            <li key={index} className="mb-2">
              {referral.name} (Level: {referral.level}){" "}
              {JSON.stringify(referral)}
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Get Per-Level Referrals</h2>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleGetPerLevelReferrals}
        >
          Get Per-Level Referrals
        </button>
        <ul className="list-disc list-inside mt-4">
          {Object.entries(perLevelReferrals).map(([level, count]) => (
            <li key={level} className="mb-2">
              <>
                Level {level}: {count}
              </>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
