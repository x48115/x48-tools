import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

export default function Adapters() {
  const { asPath } = useRouter();
  const safeAddress = asPath.split("/")[2];

  const initialize = () => {
    Router.push(`/gnosis/${safeAddress}/queue`);
  };

  useEffect(initialize, []);
  return <></>;
}
