import { useEffect, useState } from "react";
import WebsocketContext from "./context";
import { useStore } from "../../components/StoreProvider/hooks";

export default function WebsocketProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const store = useStore();

  const requestSubscriptionTopics = {
    action: "requestSubscriptionTopics",
  };

  const initialize = () => {
    const url = "wss://firehose.yearn.network";
    const wss = new WebSocket(url);
    wss.connected = false;
    store.log(`[Websocket] Connecting to ${url}...`);
    wss.onopen = () => {
      store.log("[Websocket] Connected");
      wss.sendMessage(requestSubscriptionTopics);
      wss.connected = true;
      store.setWebsocketConnected(true);
    };

    wss.onmessage = (message) => {
      const { data } = message;
      const parsedData = JSON.parse(data);
      const { action, topic, payload } = parsedData;
      switch (action) {
        case "authenticate":
          if (parsedData.payload && parsedData.payload.address) {
            setAuthenticated(true);
          }
          break;
        case "subscriptionTopics":
          store.setSubscriptionTopics(parsedData.payload);
      }

      let blockNumber;
      if (topic == "blockNumber") {
        blockNumber = payload.blockNumber;
        store.setCurrentBlockNumber(blockNumber);
      }

      const hideMessage = blockNumber && store.currentTopic != "blockNumber";
      if (!hideMessage) {
        store.websocketLog(JSON.stringify(parsedData));
      }
    };

    wss.subscribe = (topic) => {
      wss.sendMessage({
        action: "subscribe",
        topic,
      });
    };

    wss.unsubscribe = (topic) => {
      if (topic == "blockNumber") {
        return;
      }
      wss.sendMessage({
        action: "unsubscribe",
        topic,
      });
    };

    wss.sendMessage = (message) => {
      const jsonMessage = JSON.stringify(message);
      store.websocketLog(jsonMessage);
      wss.send(jsonMessage);
    };

    store.setWebsocket(wss);
  };

  return (
    <WebsocketContext.Provider value={{ initialize, authenticated }}>
      {children}
    </WebsocketContext.Provider>
  );
}
