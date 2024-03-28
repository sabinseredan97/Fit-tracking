import { createContext, useState, SetStateAction, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { getUserData, logout } from "../api/axios";
import { useQuery } from "@tanstack/react-query";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: string | null;
  setUser: React.Dispatch<SetStateAction<string | null>>;
  loginCtx: (email: string) => void;
  logoutCtx: () => Promise<void>;
};

const defaultContext = {
  user: secureLocalStorage.getItem("email"),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (_user: string | null) => {},
} as unknown as AuthContextType;

export const AuthContext = createContext(defaultContext);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<string | null>(
    secureLocalStorage.getItem("email") as string | null
  );

  const { data, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getUserData(),
    retry: true,
  });

  useEffect(() => {
    if (data) {
      loginCtx(data.email);
    } else if (isError) logoutCtx();
  }, [data, isError]);

  function loginCtx(email: string) {
    setUser(email);
    secureLocalStorage.setItem("email", email as string);
  }

  async function logoutCtx() {
    secureLocalStorage.removeItem("email");
    setUser(null);
    await logout();
    window.location.reload();
  }

  const value = {
    user,
    setUser,
    loginCtx,
    logoutCtx,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
