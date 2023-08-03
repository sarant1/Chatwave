import { createContext } from "react";
import { User } from "@/utils/types";

export interface RoomI {
  id: String | null | undefined;
  title: String | null | undefined;
}

export interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedRoom: RoomI | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<RoomI | null>>;
}

const defaultAuthContext: IAuthContext = {
  user: null,
  setUser: () => {},
  selectedRoom: null,
  setSelectedRoom: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);
