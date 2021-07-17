import { useEffect, useState } from "react";
import StoreContext from "./context";

export default function ConnectionProvider({ children }) {
  const [logs, setLogs] = useState({});
  const initialize = () => {
    const newStoreInstance;
    setStore(newStoreInstance);
  };
  useEffect(initialize, []);
  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}
