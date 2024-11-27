import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { VBox } from "../../components/directional/flex";
import { ReferralLinkComponent } from "../../components/web3/ReferralComponent";
import { useWallet } from "@solana/wallet-adapter-react";
import { ReferralService } from "../../lib/referral";

export function SettingsPage() {
  const wallet = useWallet();

  const [selectedChain] = useState("");

  const [user, setUser] = useState<UserData>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Chain:", selectedChain);
  };

  useEffect(() => {
    ReferralService.getUser(wallet.publicKey?.toBase58()!).then((data) => {
      if (data) {
        setUser(data);
      }
    });
  }, []);

  return (
    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
      <h1 className="mb-6 text-2xl font-bold text-white krona">Settings</h1>
      <VBox className="mb-6 poppins-regular">
        <ReferralLinkComponent code={user?.code!} />
      </VBox>
      <form onSubmit={handleSubmit} className="space-y-6 poppins-regular">
        <VBox>
          <Label htmlFor="wallet-address poppins-regular">Withdrawal Wallet Address</Label>
          <Input
            id="wallet-address"
            value={wallet.publicKey?.toBase58()}
            disabled
            className="mt-1 bg-white/5 text-white poppins-regular"
            placeholder="Enter your wallet address"
          />
        </VBox>
        {/* <VBox>
          <Label htmlFor="chain-select">Select Chain for Withdrawal</Label>
          <Select
            value={selectedChain}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedChain(e.target.value)
            }
          >
            <SelectContent>
              <SelectItem value="">Select a chain</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="binance">Binance Smart Chain</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
            </SelectContent>
          </Select>
        </VBox> */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 poppins-regular"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
