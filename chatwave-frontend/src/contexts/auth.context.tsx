import { createContext } from "react";
import { User } from "@/utils/types";

export interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedRoom: string | null;
  setSelectedRoom: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
}

const defaultAuthContext: IAuthContext = {
  user: null,
  setUser: () => {},
  selectedRoom: null,
  setSelectedRoom: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);
