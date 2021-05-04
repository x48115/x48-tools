import { useEffect, useState } from "react";
import ConnectionContext from "./context";
import Web3 from "web3";
import contractsConfig from "./contractsConfig";

const provider =
  "https://eth-mainnet.alchemyapi.io/v2/Fzjec9nubY8kwQ7KyCdW--u3B8swwNSg";

export default function ConnectionProvider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [contracts, setContracts] = useState(null);

  const initialize = () => {
    const web3Instance = new Web3(provider);
    setWeb3(web3Instance);
    const web3Contracts = {};
    for (let contractConfig of contractsConfig) {
      const { abi, name, address } = contractConfig;
      const contract = new web3Instance.eth.Contract(abi, address);
      web3Contracts[name] = contract;
    }
    setContracts(web3Contracts);
  };
  useEffect(initialize, []);
  return (
    <ConnectionContext.Provider value={{ web3, contracts }}>
      {children}
    </ConnectionContext.Provider>
  );
}
