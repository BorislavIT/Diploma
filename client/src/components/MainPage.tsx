import React, { FC, ReactNode } from "react";

type MainPageProps = {
  children: ReactNode;
};

const MainPage: FC<MainPageProps> = ({ children }) => {
  return (
    <main className="min-h-[calc(100vh-80px)] w-full max-w-[1440px] flex align-center rounded flex-grow bg-green-400">
      {children}
    </main>
  );
};

export default MainPage;
