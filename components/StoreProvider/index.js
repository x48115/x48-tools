import { useEffect, useState } from "react";
import StoreContext from "./context";
import Web3 from "web3";
import storeInstance from "../../stores/store";

export default function ConnectionProvider({ children }) {
  const [store, setStore] = useState({});
  const initialize = () => {
    const newStoreInstance = new storeInstance();
    setStore(newStoreInstance);
  };
  useEffect(initialize, []);

  let content;
  if (Object.keys(store).length == 0) {
    content = <div>Loading...</div>;
  } else {
    content = children;
  }
  return (
    <StoreContext.Provider value={{ store }}>{content}</StoreContext.Provider>
  );
}
