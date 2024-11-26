import { useLocalStorage } from "@solana/wallet-adapter-react";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export const AutoConnectContext = createContext<{
  autoConnect: boolean;
  setAutoConnect?: React.Dispatch<React.SetStateAction<boolean>>;
}>({ autoConnect: false });

export function useAutoConnect() {
  return useContext(AutoConnectContext);
}

export const AutoConnectProvider = ({ children }: { children: ReactNode }) => {
  const [autoConnect, setAutoConnect] = useLocalStorage("autoConnect", true);
  return (
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  );
};
