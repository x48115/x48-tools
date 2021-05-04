import "../styles/globals.css";
import Header from "../components/Header";
import { useEffect } from "react";
import ConnectionProvider from "../components/ConnectionProvider";
function MyApp({ Component, pageProps }) {
  const initialize = () => {
    console.log("welcome");
  };
  useEffect(initialize, []);
  return (
    <ConnectionProvider>
      <Header />
      <Component {...pageProps} />
    </ConnectionProvider>
  );
}

export default MyApp;
