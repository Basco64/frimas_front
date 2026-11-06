import { Navigate, Outlet } from "react-router-dom";

import { FullScreenLoader } from "../components/FullScreenLoader";
import { useAuth } from "./useAuth";

export function RedirectIfAuth() {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;
  if (user) return <Navigate to="/app" replace />;

  return <Outlet />;
}
