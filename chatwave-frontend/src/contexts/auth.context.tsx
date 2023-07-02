import { 
  createContext 
} from 'react';

export interface User {
    email: string
    accessToken: string
}

export interface IAuthContext {
  user: User | null;
  signUp: (p: { email: string; password: string; }) => Promise<any>;
  logIn: (p: { email: string; password: string }) => Promise<any>;
  confirmSignUp: (p: { email: string; verificationCode: string; }) => Promise<any>;
  logOut: () => Promise<any>;
};

const defaultAuthContext: IAuthContext = {
  user: null,
  signUp: async () => {},
  logIn: async () => {},
  logOut: async () => {},
  confirmSignUp: async () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultAuthContext)