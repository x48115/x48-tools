import React, { useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Logs from "../../components/Logs";
import { useInitializeWebsocket } from "../../components/WebsocketProvider/hooks";
import { useInitializeWeb3 } from "../../components/ConnectionProvider/hooks";
import LayoutHorizontalSplit from "../../components/LayoutHorizontalSplit";

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

  const initialize = () => {
    if (!ready && !rootPage) {
      initializeWebsocket();
      initializeWeb3();
    }
    if (ready && !rootPage) {
      store.log("[System] Initialization complete");
    }
  };

  useEffect(initialize, [ready]);

  let content;
  if (!ready) {
    if (rootPage) {
      content = props.children;
    } else {
      content = <Logs />;
    }
  } else {
    content = <LayoutHorizontalSplit>{props.children}</LayoutHorizontalSplit>;
  }
  return (
    <Wrapper rootPage={rootPage} ready={ready}>
      {content}
    </Wrapper>
  );
};

export default observer(Connector);
