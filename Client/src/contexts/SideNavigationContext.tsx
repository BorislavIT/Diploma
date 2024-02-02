import { breakpoints } from "@/constants";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type SideNavContextType = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const useSideNav = (): SideNavContextType => useContext(SideNavContext)!;

type SideNavProviderProps = {
  children: ReactNode;
};

export const SideNavProvider: React.FC<SideNavProviderProps> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth <= breakpoints.mobile) setIsExpanded(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SideNavContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SideNavContext.Provider>
  );
};
