import React, { useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Logs from "../../components/Logs";
import Header from "../../components/Header";
import LayoutVerticalSplit from "../../components/LayoutVerticalSplit";
import Entrance from "../../components/Entrance";
import { useInitializeWebsocket } from "../../components/WebsocketProvider/hooks";
import { useInitializeWeb3 } from "../../components/ConnectionProvider/hooks";
import LayoutHorizontalSplit from "../../components/LayoutHorizontalSplit";
import runMatrix from "../../utilities/matrix";
import Router from "next/router";

const Wrapper = styled.div`
  color: #44f1a6;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${(props) => (props.rootPage || props.ready ? "0px" : "100px")};
`;

const Connector = (props) => {
  const store = useStore();
  const { asPath } = useRouter();
  const rootPage = asPath == "/";
  const ready = store.ready;
  const initializeWebsocket = useInitializeWebsocket();
  const initializeWeb3 = useInitializeWeb3();

  const redirect = () => {
    setTimeout(() => runMatrix(), 150);
    Router.push("/firehose/transactionReceipts");
  };

  const initialize = () => {
    if (!ready && !rootPage) {
      initializeWebsocket();
      initializeWeb3();
    }
    if (ready && rootPage) {
      store.log("[System] Redirecting...");
      setTimeout(redirect, 300);
    }
  };

  useEffect(initialize, [ready]);

  let content;
  if (!ready) {
    if (rootPage) {
      content = <Entrance />;
    } else {
      content = <Logs />;
    }
  } else if (ready && !rootPage) {
    content = (
      <LayoutVerticalSplit>
        <Header />
        <LayoutHorizontalSplit>{props.children}</LayoutHorizontalSplit>
      </LayoutVerticalSplit>
    );
  } else {
    content = <Entrance />;
  }

  return (
    <Wrapper rootPage={rootPage} ready={ready}>
      {content}
    </Wrapper>
  );
};

export default observer(Connector);
