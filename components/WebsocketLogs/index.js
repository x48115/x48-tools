import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Log = styled.div``;

const Wrapper = styled.div`
  color: #44f1a6;
`;

const renderLog = (log, idx) => <Log key={idx}>{log}</Log>;

const Logs = ({ className }) => {
  const store = useStore();
  const logs = store.websocketLogs && store.websocketLogs.map(renderLog);
  return <Wrapper className={className}>{logs}</Wrapper>;
};

export default observer(Logs);
