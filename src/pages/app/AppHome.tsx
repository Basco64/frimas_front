import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

import { api } from "../../api";
import { FullScreenLoader } from "../../components/FullScreenLoader";

export function AppHome() {
  const { t } = useTranslation();
  const [target, setTarget] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/citizen")
      .then(() => {
        if (!cancelled) setTarget("/app/game");
      })
      .catch((error) => {
        if (cancelled) return;
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setTarget("/app/towns");
        } else {
          setFailed(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  if (target) return <Navigate to={target} replace />;

  if (failed) {
    return (
      <div className="text-center">
        <p className="text-slate-300">{t("errors.generic")}</p>
        <button
          type="button"
          onClick={() => {
            setFailed(false);
            setAttempt((n) => n + 1);
          }}
          className="mt-4 rounded-md border border-slate-700 px-4 py-2 text-sm hover:border-slate-500"
        >
          {t("common.retry")}
        </button>
      </div>
    );
  }

  return <FullScreenLoader />;
}
