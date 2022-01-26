import React, { useEffect } from "react";
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
  grid-template-columns: 230px auto;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const VerticalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 50px;
  overflow: scroll;
`;

export default observer(function HorizontalSplit(props) {
  const store = useStore();
  const websocket = store.websocket;
  const { asPath } = useRouter();
  const root = asPath.split("/")[1];
  const page = asPath.split("/")[2];

  const initialize = () => {
    websocket.psubscribe(`tokens*`);
    websocket.psubscribe(`contracts*`);
    websocket.psubscribe(`blockNumber*`);
    websocket.psubscribe(`transactionReceipts*`);
    websocket.psubscribe(`gasPrice*`);
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
