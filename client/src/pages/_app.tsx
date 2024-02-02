import { FC } from "react";
import { AppProps } from "next/app";
import { PrimeReactProvider } from "primereact/api";
import { SideNavProvider } from "@/contexts/SideNavigationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Layout from "@/components/Layout";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "../styles/globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <SideNavProvider>
        <PrimeReactProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PrimeReactProvider>
      </SideNavProvider>
    </Provider>
  );
};

export default App;
