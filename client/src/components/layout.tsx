import React, { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <nav className="w-full h-16 bg-white"></nav>
      <main className="min-h-[calc(100vh-128px)]">{children}</main>
      <footer className="w-full h-16 bg-white"></footer>
    </>
  );
};

export default Layout;
