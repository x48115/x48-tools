import { useContext } from "react";
import context from "./context";

export function useStore() {
  const { store } = useContext(context);
  return store;
}
