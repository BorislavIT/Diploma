import { FC, ReactNode } from "react";

type MainPageProps = {
  children: ReactNode;
};

const MainPage: FC<MainPageProps> = ({ children }) => {
  return (
    <main className="min-h-[calc(100vh-32px)] max-w-[1440px] p-4 border border-theme-border border-solid flex align-center rounded-md flex-grow transition-all duration-300 ease-in-out transform overflow-x-hidden h-auto mb-4">
      {children}
    </main>
  );
};

export default MainPage;
