import React, { FC, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element: Component,
  ...rest
}) => {
  const wallet = useWallet();
  const location = useLocation();

  const [status, setStatus] = useState<
    "pending" | "connected" | "disconnected"
  >("pending");

  useEffect(() => {
    const checkWalletStatus = () => {
      console.log("wallet", wallet);
      if (wallet.connected) {
        setStatus("connected");
      } else if (wallet.connecting) {
        setStatus("pending");
      } else {
        setStatus("disconnected");
      }
    };

    // Initially check the wallet status
    checkWalletStatus();
  }, [wallet.connected, wallet.connecting]); // Re-run on these changes

  if (status === "pending") {
    return null; // Or a loading spinner to indicate waiting for connection
  }

  if (status === "disconnected") {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
