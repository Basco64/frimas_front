import { useTranslation } from "react-i18next";

export function GamePage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t("app.game.title")}</h1>
      <p className="mt-4 text-slate-400">{t("app.game.soon")}</p>
    </div>
  );
}
