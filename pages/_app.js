import "../styles/globals.css";

import { useEffect } from "react";
import ConnectionProvider from "../components/ConnectionProvider";
import WebsocketProvider from "../components/WebsocketProvider";

import Connector from "../components/Connector";
import StoreProvider from "../components/StoreProvider";

function MyApp({ Component, pageProps }) {
  const initialize = () => {};
  useEffect(initialize, []);
  return (
    <StoreProvider>
      <canvas id="matrix" />
      <WebsocketProvider>
        <ConnectionProvider>
          <Connector>
            <Component {...pageProps} />
          </Connector>
        </ConnectionProvider>
      </WebsocketProvider>
    </StoreProvider>
  );
}

export default MyApp;
