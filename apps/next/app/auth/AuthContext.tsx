"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{
  signedIn: boolean;
  setSignedIn: (v: boolean) => void;
}>({
  signedIn: false,
  setSignedIn: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}