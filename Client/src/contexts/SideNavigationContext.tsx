import { breakpoints } from "@/shared/constants";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  FC,
  SetStateAction,
} from "react";

type SideNavContextType = {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

const SideNavContext = createContext<SideNavContextType | null>(null);

export const useSideNav = (): SideNavContextType => useContext(SideNavContext)!;

type SideNavProviderProps = {
  children: ReactNode;
};

export const SideNavProvider: FC<SideNavProviderProps> = ({ children }) => {
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
