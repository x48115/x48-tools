import "../styles/globals.css";
import Header from "../components/Header";
import { useEffect } from "react";
import ConnectionProvider from "../components/ConnectionProvider";
import StoreProvider from "../components/StoreProvider";
function MyApp({ Component, pageProps }) {
  const initialize = () => {
    console.log("welcome");
  };
  useEffect(initialize, []);
  return (
    <StoreProvider>
      <ConnectionProvider>
        <Header />
        <Component {...pageProps} />
      </ConnectionProvider>
    </StoreProvider>
  );
}

export default MyApp;
