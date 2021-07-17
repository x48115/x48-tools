import React, { useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Logs from "../../components/Logs";
import { useInitializeWebsocket } from "../../components/WebsocketProvider/hooks";
import { useInitializeWeb3 } from "../../components/ConnectionProvider/hooks";

const Log = styled.div``;

const Wrapper = styled.div`
  color: #44f1a6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
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
      store.log("[System] Initialization complete");
      initializeWebsocket();
      initializeWeb3();
    }
    if (ready) {
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
    content = props.children;
  }
  return <Wrapper>{content}</Wrapper>;
};

export default observer(Connector);
