import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Logs from "../components/Logs";
import { useInitializeWebsocket } from "../components/WebsocketProvider/hooks";
import { useInitializeWeb3 } from "../components/ConnectionProvider/hooks";
import { useStore } from "../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  width: 200px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 120px;
`;

const Home = () => {
  return <Wrapper></Wrapper>;
};

export default observer(Home);
