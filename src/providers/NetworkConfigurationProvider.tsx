import { useLocalStorage } from "@solana/wallet-adapter-react";
import React, { createContext, useContext } from "react";

export const NetworkConfigurationContext = createContext<{
  networkConfiguration: string;
  setNetworkConfiguration?: React.Dispatch<React.SetStateAction<string>>;
}>({
  networkConfiguration: "devnet",
});

export function useNetworkConfiguration() {
  return useContext(NetworkConfigurationContext);
}

export const NetworkConfigurationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [networkConfiguration, setNetworkConfiguration] =
    useLocalStorage<string>("network", "devnet");

  return (
    <NetworkConfigurationContext.Provider
      value={{ networkConfiguration, setNetworkConfiguration }}
    >
      {children}
    </NetworkConfigurationContext.Provider>
  );
};
