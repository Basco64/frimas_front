import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { api } from "../../api";
import { CreateTownForm } from "../../components/CreateTownForm";
import { TownCard } from "../../components/TownCard";
import type { TownSummary } from "../../types";

export function TownsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [towns, setTowns] = useState<TownSummary[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api
      .get<TownSummary[]>("/towns")
      .then(({ data }) => {
        if (cancelled) return;
        setTowns(data.filter((town) => !town.started));
        setFailed(false);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [reload]);

  const goToGame = () => navigate("/app");

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold">{t("towns.title")}</h1>
        <h2 className="mt-8 text-xl font-semibold">{t("towns.open")}</h2>

        <div className="mt-4 space-y-4">
          {failed && (
            <div>
              <p className="text-slate-300">{t("errors.generic")}</p>
              <button
                type="button"
                onClick={() => setReload((n) => n + 1)}
                className="mt-3 rounded-md border border-slate-700 px-4 py-2 text-sm hover:border-slate-500"
              >
                {t("common.retry")}
              </button>
            </div>
          )}

          {!failed && towns === null && <p className="text-slate-400">{t("common.loading")}</p>}

          {!failed && towns?.length === 0 && <p className="text-slate-400">{t("towns.none")}</p>}

          {!failed &&
            towns?.map((town) => (
              <TownCard
                key={town.id}
                town={town}
                onJoined={goToGame}
                onStale={() => setReload((n) => n + 1)}
              />
            ))}
        </div>
      </section>

      <section className="border-t border-slate-800 pt-10">
        <h2 className="text-xl font-semibold">{t("towns.createTitle")}</h2>
        <div className="mt-6 max-w-xl">
          <CreateTownForm onCreated={goToGame} />
        </div>
      </section>
    </div>
  );
}
