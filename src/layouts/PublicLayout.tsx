import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../auth/useAuth";
import { CustomButton } from "../components/CustomButton";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function PublicLayout() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const isLandingPage = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        {!isLandingPage && (
          <Link to="/">
            <img
              src="frimas-hero-logo.png"
              alt="Frimas logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        )}

        <div className="ml-auto flex items-center gap-4">
          <LanguageSwitcher />
          {loading ? (
            <span className="inline-block h-9 w-32" />
          ) : user ? (
            <CustomButton asChild className="px-4 py-2 text-sm">
              <Link to="/app">{t("nav.enterGame")}</Link>
            </CustomButton>
          ) : (
            <CustomButton asChild variant="secondary" className="px-4 py-2 text-sm">
              <Link to="/login">{t("nav.login")}</Link>
            </CustomButton>
          )}
        </div>
      </header>

      <main className="flex-1">
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
