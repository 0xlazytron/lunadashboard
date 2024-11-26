import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import { useCallback, useMemo } from "react";
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";
import {
  NetworkConfigurationProvider,
  useNetworkConfiguration,
} from "./NetworkConfigurationProvider";
import type { ReactNode } from "react";
const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { autoConnect } = useAutoConnect();
  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration;

  const originalEndPoint = useMemo(
    () => clusterApiUrl(network as Cluster),
    [network]
  );

  let endpoint;

  if (network == "mainnet-beta") {
    endpoint =
      "https://solana-mainnet.g.alchemy.com/v2/CguVgyvSbnvG-U-5hyCXzPuLHoVFouIp";
  } else if (network == "devnet") {
    endpoint = originalEndPoint;
  } else {
    endpoint = originalEndPoint;
  }

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const onError = useCallback((error: any) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect}
      >
        <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  );
};
