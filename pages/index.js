import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Logs from "../components/Logs";
import { useInitializeWebsocket } from "../components/WebsocketProvider/hooks";
import { useInitializeWeb3 } from "../components/ConnectionProvider/hooks";
import { useStore } from "../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import runMatrix from "../utilities/matrix";
import Router from "next/router";

const Wrapper = styled.div``;
const StyledButton = styled(Button)`
  width: 200px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

const Home = () => {
  const [connecting, setConnecting] = useState(false);
  let content;
  const store = useStore();

  const initializeWebsocket = useInitializeWebsocket();
  const initializeWeb3 = useInitializeWeb3();
  const ready = store.ready;

  const redirect = () => {
    Router.push("/redis");
    setTimeout(() => runMatrix(), 100);
  };

  const checkReadyStatus = () => {
    if (ready) {
      store.log("[System] Initialization complete");
      store.log("[System] Redirecting...");
      setTimeout(redirect, 300);
    }
  };

  useEffect(checkReadyStatus, [ready]);

  const connect = () => {
    setConnecting(true);
    store.log("[System] Initializing...");
    initializeWebsocket();
    initializeWeb3();
  };
  if (connecting) {
    content = <Logs />;
  } else {
    content = <StyledButton onClick={() => connect()}>Connect</StyledButton>;
  }
  return (
    <Wrapper>
      <Logo />
      <ButtonWrapper>{content}</ButtonWrapper>
    </Wrapper>
  );
};

export default observer(Home);
