import { useContext } from "react";
import context from "./context";

export function useWebsocket() {
  const { websocket } = useContext(context);
  return websocket;
}

export function useInitializeWebsocket() {
  const { initialize } = useContext(context);
  return initialize;
}

export function useAuthenticated() {
  const { authenticated } = useContext(context);
  return authenticated;
}
