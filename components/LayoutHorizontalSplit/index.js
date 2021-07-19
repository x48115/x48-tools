import React, { useEffect } from "react";
import Router from "next/router";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import SubscriptionPane from "../../components/SubscriptionPane";

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

const HorizontalWrapper = styled.div`
  display: grid;
  grid-template-columns: 270px auto;
  width: 100%;
  height: 100%;
`;

const VerticalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 50px;
`;

export default observer(function HorizontalSplit(props) {
  const store = useStore();
  const websocket = store.websocket;
  const { asPath } = useRouter();
  const nothingSelected = asPath == "/firehose";
  const selectedTopic = asPath.replace("/firehose/", "");
  const websocketConnected = store.websocketConnected;

  const initialize = () => {
    let subscriptionTopic;
    if (nothingSelected) {
      subscriptionTopic = store.subscriptionTopics[0];
      if (subscriptionTopic) {
        console.log("pamp it");
        Router.push("/firehose", `/firehose/${subscriptionTopic}`);
      }
    } else {
      subscriptionTopic = selectedTopic;
    }
    if (!store.currentTopic) {
      store.setCurrentTopic(subscriptionTopic);
      if (subscriptionTopic != "blockNumber") {
        websocket.subscribe("blockNumber");
      }
      websocket.subscribe(subscriptionTopic);
    }
  };
  useEffect(initialize, [store.subscriptionTopics]);
  return (
    <HorizontalWrapper>
      <SubscriptionPane />
      <VerticalWrapper>
        {props.children}
        <Bottom>
          <Input />
        </Bottom>
      </VerticalWrapper>
    </HorizontalWrapper>
  );
});