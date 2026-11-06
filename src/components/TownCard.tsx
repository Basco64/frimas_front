import { useState } from "react";
import { useTranslation } from "react-i18next";

import { api } from "../api";
import { apiErrorKey } from "../errors";
import type { Role, RoleAvailability, TownRoles, TownSummary } from "../types";
import { RolePicker } from "./RolePicker";

interface TownCardProps {
  town: TownSummary;
  onJoined: () => void;
  onStale: () => void;
}

export function TownCard({ town, onJoined, onStale }: TownCardProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState<RoleAvailability[] | null>(null);
  const [selected, setSelected] = useState<Role | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function loadRoles() {
    try {
      const { data } = await api.get<TownRoles>(`/towns/${town.id}/roles`);
      setAvailability(data.roles);
      setSelected((current) =>
        current && data.roles.find((entry) => entry.role === current)?.remaining === 0
          ? null
          : current,
      );
    } catch (error) {
      setErrorKey(apiErrorKey(error));
      onStale();
    }
  }

  async function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    setErrorKey(null);
    await loadRoles();
  }

  async function join() {
    if (!selected) return;
    setBusy(true);
    setErrorKey(null);
    try {
      await api.post(`/towns/${town.id}/join`, { role: selected });
      onJoined();
    } catch (error) {
      const key = apiErrorKey(error);
      setErrorKey(key);
      if (key === "errors.town_full" || key === "errors.town_not_found") {
        onStale();
      } else {
        await loadRoles();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-sky-200">{town.name}</h3>
          <p className="text-sm text-slate-400">
            {t("towns.citizens", { count: town.citizens, max: town.max_citizens })}
            {" · "}
            {t("towns.day", { day: town.current_day })}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void toggle()}
          className="rounded-md border border-sky-500 px-4 py-2 text-sm font-semibold text-sky-300 hover:bg-sky-500/10"
        >
          {open ? t("towns.cancel") : t("towns.join")}
        </button>
      </div>

      {open && (
        <div className="mt-5 space-y-4 border-t border-slate-800 pt-5">
          <p className="text-sm font-medium text-slate-300">{t("towns.chooseRole")}</p>
          <RolePicker
            availability={availability ?? undefined}
            selected={selected}
            onSelect={setSelected}
            disabled={busy}
          />
          <p className="text-xs text-slate-500">{t("towns.roleFinal")}</p>

          {errorKey && (
            <p
              role="alert"
              className="rounded-md border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-300"
            >
              {t(errorKey, { defaultValue: t("errors.generic") })}
            </p>
          )}

          <button
            type="button"
            disabled={!selected || busy}
            onClick={() => void join()}
            className="rounded-md bg-sky-500 px-4 py-2 font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-50"
          >
            {t("towns.confirmJoin")}
          </button>
        </div>
      )}
    </article>
  );
}
