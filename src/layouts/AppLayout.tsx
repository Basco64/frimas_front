import { useTranslation } from "react-i18next";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/useAuth";
import { CustomButton } from "../components/CustomButton";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function AppLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    navigate("/", { replace: true });
    await logout();
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link to="/">
          <img
            src="frimas-hero-logo.png"
            alt="Frimas logo"
            className="h-10 w-auto rounded-2xl object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{user?.username}</span>
          <LanguageSwitcher />
          <CustomButton
            type="button"
            onClick={() => void handleLogout()}
            variant="ghost"
            className="border border-slate-700 px-3 py-1.5 text-sm hover:border-slate-500 hover:text-slate-100"
          >
            {t("nav.logout")}
          </CustomButton>
        </div>
      </header>

      <main className="mx-auto max-w-5xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="pt-2 mb-4 text-center">
        Made with love by{" "}
        <a href="https://xabi-martinez.dev" target="_blank" rel="noopener noreferrer">
          Basco
        </a>{" "}
        ❤️
      </footer>
    </div>
  );
}
