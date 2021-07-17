import { useEffect, useState } from "react";
import ConnectionContext from "./context";
import Web3 from "web3";

const provider = "https://node.yearn.network";

export default function ConnectionProvider({ children }) {
  const [web3, setWeb3] = useState(null);

  const initialize = () => {
    const web3Instance = new Web3(provider);
    setWeb3(web3Instance);
  };
  useEffect(initialize, []);
  return (
    <ConnectionContext.Provider value={{ web3 }}>
      {children}
    </ConnectionContext.Provider>
  );
}
