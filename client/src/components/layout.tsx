import React, { FC, ReactNode } from "react";
import TopNavigation from "./TopNavigation";
import MainPage from "./MainPage";
import SideNavigation from "./SideNavigation";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container flex flex-column justify-center flex-wrap bg-orange-50">
      <TopNavigation />
      <div className="page-container flex flex-row justify-center gap-4 flex-nowrap w-full h-full">
        <SideNavigation />
        <MainPage children={children} />
      </div>
    </div>
  );
};

export default Layout;
