import { useEffect, useState } from "react";
import WebsocketContext from "./context";

export default function WebsocketProvider({ children }) {
  const [websocket, setWebsocket] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const initialize = () => {
    const url = "ws://localhost:8080";
    const wss = new WebSocket(url);
    wss.connected = false;
    console.log(`[Websocket] Connecting to ${url}`);
    wss.onopen = () => {
      console.log("[Websocket] Connected");
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
  useEffect(initialize, []);
  return (
    <WebsocketContext.Provider value={{ websocket, authenticated }}>
      {children}
    </WebsocketContext.Provider>
  );
}
