import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { FC } from "react";
import { AppProps } from "next/app";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "@/contexts/ToastContext";
import { SideNavProvider } from "@/contexts/SideNavigationContext";
import { PlayerContextProvider } from "@/contexts/PlayerContext";
import { UserContextProvider } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "../styles/globals.css";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <PlayerContextProvider>
          <PrimeReactProvider>
            <SideNavProvider>
              <ToastProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ToastProvider>
            </SideNavProvider>
          </PrimeReactProvider>
        </PlayerContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default App;
