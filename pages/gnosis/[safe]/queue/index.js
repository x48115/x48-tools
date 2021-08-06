import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { useStore } from "../../../../components/StoreProvider/hooks";
import { autorun } from "mobx";

export default function Adapters() {
  const store = useStore();
  const { asPath } = useRouter();
  const safeAddress = asPath.split("/")[2];
  const websocket = store.websocket;
  const pathParts = asPath.split("/");

  const initialize = () => {
    websocket.gnosis("getTransactionsList", {
      safeAddress,
    });
    websocket.gnosis("getOwners", {
      safeAddress,
    });
    autorun(() => {
      if (store.gnosisTransactions.length) {
        const firstTransactionHash =
          store.gnosisTransactions[0].contractTransactionHash;
        if (pathParts.length !== 5) {
          Router.push(`/gnosis/${safeAddress}/queue/${firstTransactionHash}`);
        }
      }
    });
  };

  useEffect(initialize, []);
  return <></>;
}
