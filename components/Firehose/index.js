import React, { useEffect } from "react";
import Router from "next/router";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import SubscriptionContent from "../../components/SubscriptionContent";
import Logs from "../../components/Logs";

const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0px 10px;
  box-sizing: border-box;
`;

const Bottom = styled.div`
  border-top: 1px solid #44f1a6;
`;

const VerticalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 50px;
`;

const Firehose = () => {
  const store = useStore();
  const websocket = store.websocket;
  const { asPath } = useRouter();
  const nothingSelected = asPath == "/firehose";
  const selectedTopic = asPath.replace("/firehose/", "");
  const websocketConnected = store.websocketConnected;

  return <SubscriptionContent />;
};

export default observer(Firehose);
