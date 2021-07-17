import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Log = styled.div``;

const Wrapper = styled.div`
  color: #44f1a6;
  width: 550px;
`;

const renderLog = (log, idx) => <Log key={idx}>{log}</Log>;

const Logs = () => {
  const store = useStore();
  const logs = store.logs && store.logs.map(renderLog);
  return <Wrapper>{logs}</Wrapper>;
};

export default observer(Logs);
