import { useContext } from "react";
import context from "./context";

export function useWebsocket() {
  const { websocket } = useContext(context);
  return websocket;
}

export function useAuthenticated() {
  const { authenticated } = useContext(context);
  return authenticated;
}
