import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { NetworkSwitcher } from "../../admin/components/web3/NetworkSwitcher";
import { VBox } from "../../admin/components/directional/flex";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { ReferralService } from "../../lib/referral";
import { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const wallet = useWallet();

  const ref = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [formData, setFormData] = useState({ wallet: "", name: "", by: "" });

  useEffect(() => {
    if (wallet.publicKey) {
      const walletAddress = wallet.publicKey.toBase58();
      setFormData((prevData) => ({ ...prevData, wallet: walletAddress }));

      const checkExistence = async () => {
        const exists = await ReferralService.checkExistence(walletAddress);
        if (exists) {
          navigate("/dashboard", { replace: true });
        } else {
          if (ref.current) {
            ref.current.style.display = exists ? "none" : "block";
          }
        }
      };

      checkExistence();
    } else {
      setFormData({
        ...formData,
        by: params.code ?? "",
      });
      console.log("code", params.code);
      if (ref.current) {
        ref.current.style.display = "none";
      }
    }
  }, [wallet]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { by, ...formDataWithoutCode } = formData;

    const allFieldsFilled = Object.values(formDataWithoutCode).every(
      (value) => value !== ""
    );
    if (!allFieldsFilled) {
      alert("Please fill the form");
      return;
    }

    try {
      const exists = await ReferralService.checkExistence(formData.wallet);
      if (exists) {
        navigate("/dashboard");
      } else {
        await ReferralService.registerUser(formData);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <VBox
      alignItems="center"
      justifyContent="center"
      className="rounded-xl bg-white/10 backdrop-blur-lg w-screen h-screen"
    >
      {wallet.publicKey ? (
        <VBox>
          <div
            ref={ref}
            className="hidden max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Update User Info</h2>
            <div className="w-full p-2 mb-4 border rounded h-11 text-gray-300">
              {wallet.publicKey.toBase58()}
            </div>
            <input
              className="w-full p-2 mb-4 border rounded h-11 placeholder:text-gray-3000 text-black"
              required
              name="name"
              type="text"
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              className="w-full p-2 mb-4 border rounded h-11 placeholder:text-gray-300 text-black"
              required
              name="by"
              type="text"
              onChange={handleChange}
              placeholder="Referral Code"
              defaultValue={params.code ?? ""}
            />
            <button
              onClick={registerUser}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Proceed Registration
            </button>
          </div>
        </VBox>
      ) : (
        <VBox alignItems="center">
          <NetworkSwitcher />
          <div className="flex gap-2 lg:flex-row flex-col w-max rounded-10">
            <WalletMultiButton
              style={{
                backgroundColor: "transparent",
                borderRadius: 10,
                borderBottomColor: "orange",
                borderTopColor: "orange",
                fontSize: 16,
                display: "flex",
                justifyContent: "space-around",
                height: 50,
              }}
            >
              <span>Connect Wallet</span>
            </WalletMultiButton>
          </div>
        </VBox>
      )}
    </VBox>
  );
};
