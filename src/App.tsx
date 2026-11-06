import { Navigate, Route, Routes } from "react-router-dom";

import { RedirectIfAuth } from "./auth/RedirectIfAuth";
import { RequireAuth } from "./auth/RequireAuth";
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AppHome } from "./pages/app/AppHome";
import { GamePage } from "./pages/app/GamePage";
import { TownsPage } from "./pages/app/TownsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />

        {/* visiteurs */}
        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* connectés */}
      <Route element={<RequireAuth />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppHome />} />
          <Route path="towns" element={<TownsPage />} />
          <Route path="game" element={<GamePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
//   <h1 className="text-3xl font-bold text-orange-500 underline">Frimas</h1>
//   <div>Chaque jour, vous faites des choix qui pèsent sur la survie de tous.</div>
//   <div>Chaque nuit, la ville découvre si ça a suffi.</div>
