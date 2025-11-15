"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "@/app/(protected)/appointments/actions";

interface UserContextType {
  role: "EMPRESA" | "USUARIO" | null;
  name: string | null;
  email: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  role: null,
  name: null,
  email: null,
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserContextType>({
    role: null,
    name: null,
    email: null,
    loading: true,
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      const info = await getUserInfo();
      if (info) {
        setUserInfo({
          role: info.role,
          name: info.name,
          email: info.email,
          loading: false,
        });
      } else {
        setUserInfo({
          role: null,
          name: null,
          email: null,
          loading: false,
        });
      }
    };

    loadUserInfo();
  }, []);

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
