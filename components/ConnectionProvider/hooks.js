import { useContext } from "react";
import context from "./context";

export function useWeb3() {
  const { web3 } = useContext(context);
  return web3;
}

export function useContracts() {
  const { contracts } = useContext(context);
  return contracts;
}
