import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

type UserContextType = {
  authToken: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const useUser = (): UserContextType => useContext(UserContext)!;

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ authToken, setAuthToken, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
