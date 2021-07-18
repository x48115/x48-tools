import { useContext } from "react";
import context from "./context";

export function useInitializeWebsocket() {
  const { initialize } = useContext(context);
  return initialize;
}

export function useAuthenticated() {
  const { authenticated } = useContext(context);
  return authenticated;
}
