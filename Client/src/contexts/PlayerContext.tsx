import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

type PlayerContextType = {
  setUrl: Dispatch<SetStateAction<string | null>>;
  url: string | null;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayerContext = (): PlayerContextType =>
  useContext(PlayerContext)!;

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContextProvider: FC<PlayerContextProviderProps> = ({
  children,
}) => {
  const [url, setUrl] = useState<string | null>(null);

  return (
    <PlayerContext.Provider value={{ url, setUrl }}>
      {children}
    </PlayerContext.Provider>
  );
};
