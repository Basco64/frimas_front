import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { api, ME_PATH, setUnauthorizedHandler } from "../api";
import { AuthContext, type AuthState, type User } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<User>(ME_PATH)
      .then(({ data }) => {
        if (!cancelled) setUser(data);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null));
    return () => setUnauthorizedHandler(() => {});
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    await api.post("/auth/login", { username, password });
    const { data } = await api.get<User>(ME_PATH);
    setUser(data);
  }, []);

  const register = useCallback(
    async (username: string, password: string) => {
      await api.post("/auth/register", { username, password });
      await login(username, password);
    },
    [login],
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
