import { FC } from "react";
import { AppProps } from "next/app";
import Layout from "../components/layout";
import "../app/globals.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
