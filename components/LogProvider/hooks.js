import { useContext } from "react";
import context from "./context";

export function useWeb3() {
  const { web3 } = useContext(context);
  return web3;
}

export function useWeb3Read() {
  const { web3Read } = useContext(context);
  return web3Read;
}

export function useAccount() {
  const { account } = useContext(context);
  return account;
}

export function useDisplayName() {
  const { displayName } = useContext(context);
  return displayName;
}
