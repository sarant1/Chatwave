import { createContext } from "react";

export interface User {
  email: string;
  accessToken: string;
}

export interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultAuthContext: IAuthContext = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);
