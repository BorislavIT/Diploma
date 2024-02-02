import { FC } from "react";
import { AppProps } from "next/app";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "@/contexts/ToastContext";
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
      <PrimeReactProvider>
        <SideNavProvider>
          <ThemeProvider>
            <ToastProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ToastProvider>
          </ThemeProvider>
        </SideNavProvider>
      </PrimeReactProvider>
    </Provider>
  );
};

export default App;
