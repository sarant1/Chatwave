import { createContext } from "react";
import { User } from "@/utils/types";

export interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultAuthContext: IAuthContext = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);
