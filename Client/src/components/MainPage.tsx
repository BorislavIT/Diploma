import { FC, ReactNode } from "react";

type MainPageProps = {
  children: ReactNode;
};

const MainPage: FC<MainPageProps> = ({ children }) => {
  return (
    <main
      className={`${
        global.isAuthorized
          ? "min-h-[calc(90vh-32px)] max-h-[calc(90vh-32px)]"
          : "min-h-[calc(100vh-32px)] max-h-[calc(90vh-32px)]"
      } overflow-hidden text-theme-text max-w-[1440px] p-4 border flex-col border-pink border-solid flex align-center rounded-md flex-grow transition-all duration-300 ease-in-out transform overflow-x-hidden h-auto mb-4`}
    >
      <div className="w-full h-full mt-10">{children}</div>
    </main>
  );
};

export default MainPage;
