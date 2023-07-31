import React, { createContext } from "react";

interface AuthContextValue {
  signedIn: boolean;
}

const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={{ signedIn: false }}>{children}</AuthContext.Provider>;
};
