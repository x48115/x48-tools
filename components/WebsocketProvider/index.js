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
          break;
        case "gnosis":
          switch (topic) {
            case "transactionsList":
              const transactions = parsedData.payload;
              store.setGnosisTransactions(transactions);
              break;
            case "transaction":
              const transaction = parsedData.payload;
              store.setCurrentGnosisTransaction(transaction);
              break;
            case "simulation":
              const simulation = parsedData.payload;
              store.setCurrentGnosisSimulation(simulation);
              break;
            case "owners":
              const owners = parsedData.payload;
              store.setCurrentGnosisOwners(owners);
              break;
          }
        case "default":
          break;
      }
      // TODO: Clean up!!
      console.log("waooo", topic);
      if (
        topic &&
        topic.startsWith("gnosis:transactions:") &&
        !topic.endsWith("simulation")
      ) {
        console.log("it start");
        store.prependGnosisTransaction(payload);
      } else if (topic && topic.endsWith("simulation")) {
        console.log("it end");
        store.setCurrentGnosisSimulation(payload);
      }

      let blockNumber;
      if (topic == "blockNumber") {
        blockNumber = payload.blockNumber;
        store.setCurrentBlockNumber(blockNumber);
      }

      if (topic == "gasPrice") {
        const gasPrice = payload.gasPrice;
        store.setGasPrice(gasPrice);
      }

      const hideMessage =
        (blockNumber && store.currentTopic != "blockNumber") ||
        (parsedData.topic && !parsedData.topic.startsWith(store.currentTopic));
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

    wss.gnosis = (topic, payload) => {
      wss.sendMessage({
        action: "gnosis",
        topic,
        payload,
      });
    };

    wss.psubscribe = (topic) => {
      wss.sendMessage({
        action: "psubscribe",
        topic,
      });
    };

    wss.unsubscribe = (topic) => {
      wss.sendMessage({
        action: "unsubscribe",
        topic,
      });
    };

    wss.punsubscribe = (topic) => {
      if (topic == "blockNumber*") {
        return;
      }
      wss.sendMessage({
        action: "punsubscribe",
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
