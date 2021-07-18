import React, { useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Log = styled.div`
  padding-bottom: 12px;
  font-size: 12px;
  &:last-of-type {
    padding-bottom: 0px;
  }
  line-height: 15px;
`;

const Wrapper = styled.div`
  padding: 20px 15px;
  padding-right: 0px;
  max-height: calc(100vh - 110px);
  box-sizing: border-box;
  width: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
`;

function SubscriptionContent() {
  const renderLog = (log, idx) => {
    const plainLog = JSON.parse(log);
    const prettyLog = JSON.stringify(plainLog, null, 2);
    return (
      <Log key={idx}>
        <pre>{prettyLog}</pre>
      </Log>
    );
  };
  const store = useStore();
  const logs = store.websocketLogs && store.websocketLogs.map(renderLog);

  const pendingTransactions = store.currentTopic === "pendingTransactions";

  useEffect(() => {
    if (!pendingTransactions) {
      const logWindow = document.getElementById("log-window");
      logWindow.scrollTop = logWindow.scrollHeight;
    }
  }, [logs]);

  return <Wrapper id="log-window">{logs}</Wrapper>;
}

export default observer(SubscriptionContent);
