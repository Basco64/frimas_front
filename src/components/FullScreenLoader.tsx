import { useTranslation } from "react-i18next";

export function FullScreenLoader() {
  const { t } = useTranslation();

  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-400">
      {t("common.loading")}
    </div>
  );
}
