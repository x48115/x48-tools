import { useEffect, useState } from "react";
import ConnectionContext from "./context";
import Web3 from "web3";
import ENS from "ethjs-ens";
import { useStore } from "../../components/StoreProvider/hooks";

export default function ConnectionProvider({ children }) {
  const [chain, setChain] = useState("");
  const store = useStore();
  const ens = new ENS({
    provider: window.ethereum,
    network: 1,
  });

  const initialize = () => {
    store.log("[Web3] Connecting...");
    const web3Instance = new Web3(
      "https://eth-mainnet.alchemyapi.io/v2/wfwULZWU8S-FYtQxxeqweGGS7eG6hh5N"
    );
    store.setWeb3(web3Instance);
  };

  const setConnectionStatus = async () => {
    if (store.web3) {
      const connected = await store.web3.eth.net.isListening();
      if (connected) {
        store.web3Connected = true;
      }
    }
  };

  useEffect(setConnectionStatus, [store.web3]);

  return (
    <ConnectionContext.Provider
      value={{
        web3: store.web3,
        chain,
        initialize,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}
