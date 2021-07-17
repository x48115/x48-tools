import { useEffect, useState } from "react";
import WebsocketContext from "./context";
import { useStore } from "../../components/StoreProvider/hooks";

export default function WebsocketProvider({ children }) {
  const [websocket, setWebsocket] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const store = useStore();

  const initialize = () => {
    const url = "ws://localhost:8080";
    const wss = new WebSocket(url);
    wss.connected = false;
    store.log(`[Websocket] Connecting to ${url}...`);
    wss.onopen = () => {
      store.log("[Websocket] Connected");
      store.setWebsocketConnected(true);
    };

    wss.onmessage = (message) => {
      const { data } = message;
      const parsedData = JSON.parse(data);
      const { action } = parsedData;
      if (action === "authenticate") {
        if (parsedData.payload && parsedData.payload.address) {
          setAuthenticated(true);
        }
      }
      console.log(parsedData);
    };

    setWebsocket(wss);
  };

  return (
    <WebsocketContext.Provider value={{ websocket, initialize, authenticated }}>
      {children}
    </WebsocketContext.Provider>
  );
}
