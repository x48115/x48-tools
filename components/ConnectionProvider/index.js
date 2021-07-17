import { useEffect, useState } from "react";
import ConnectionContext from "./context";
import Web3 from "web3";
import ENS from "ethjs-ens";
import { shortenAddress } from "../../utilities/address";
import { useStore } from "../../components/StoreProvider/hooks";

export default function ConnectionProvider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState();
  const [displayName, setDisplayName] = useState();
  const store = useStore();

  const updateAccount = async (account) => {
    setAccount(account);
    const ens = new ENS({
      provider: window.web3.currentProvider,
      network: 1,
    });
    const accountEns = await ens.reverse(account).catch(() => {});
    const logInName = accountEns || account;
    if (logInName) {
      setDisplayName(shortenAddress(logInName));
    }
  };

  const initialize = () => {
    store.log("[Web3] Connecting...");
    ethereum.request({ method: "eth_requestAccounts" });
    const web3Instance = new Web3(Web3.givenProvider);
    setWeb3(web3Instance);
    setAccount(ethereum.selectedAddress);
    ethereum.on("chainChanged", (chainId) => {
      console.log("Updated chain id");
    });

    ethereum.on("accountsChanged", (accounts) => {
      updateAccount(accounts[0]);
    });

    web3Instance.eth.getAccounts().then(async (accounts) => {
      updateAccount(accounts[0]);
    });
  };

  const setConnectionStatus = () => {
    if (displayName) {
      store.log(`[Web3] Connected: ${displayName}`);
      store.setWeb3Connected(true);
    }
  };

  useEffect(setConnectionStatus, [displayName]);

  return (
    <ConnectionContext.Provider
      value={{
        web3,
        chain,
        account,
        displayName,
        initialize,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}
