import { FC, ReactNode } from "react";
import MainPage from "./MainPage";
import SideNavigation from "./SideNavigation";
import useAccount from "@/shared/react-query-hooks/useAccount";
import MusicPlayer from "./player/MusicPlayer";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data, error, isLoading } = useAccount();

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center bg-theme-secondary ease-in-out duration-300 bg-dark text-white">
        <div className="page-container flex flex-row justify-center gap-4 flex-nowrap w-full h-full px-4 pt-4">
          {!error && !isLoading && <SideNavigation />}
          {(data || error) && !isLoading && <MainPage children={children} />}
        </div>
      </div>
      {global.isAuthorized && <MusicPlayer />}
    </div>
  );
};

export default Layout;
