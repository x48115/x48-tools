import "../styles/globals.css";
import Header from "../components/Header";
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
      <WebsocketProvider>
        <ConnectionProvider>
          <canvas id="matrix" />
          <Header />
          <Connector>
            <Component {...pageProps} />
          </Connector>
        </ConnectionProvider>
      </WebsocketProvider>
    </StoreProvider>
  );
}

export default MyApp;
