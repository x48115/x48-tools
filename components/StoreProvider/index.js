import { useEffect, useState } from "react";
import StoreContext from "./context";
import styled from "styled-components";
import storeInstance from "../../stores/store";

export default function ConnectionProvider({ children }) {
  const [store, setStore] = useState({});
  const initialize = () => {
    const newStoreInstance = new storeInstance();
    setStore(newStoreInstance);
  };
  useEffect(initialize, []);

  const Loading = styled.div`
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  let content;
  const loadingStore = Object.keys(store).length == 0;
  if (loadingStore) {
    content = <Loading>Loading...</Loading>;
  } else {
    content = children;
  }
  return (
    <StoreContext.Provider value={{ store }}>{content}</StoreContext.Provider>
  );
}
