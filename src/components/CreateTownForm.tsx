import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { api } from "../api";
import { apiErrorKey } from "../errors";
import type { Role } from "../types";
import { RolePicker } from "./RolePicker";
import { TextField } from "./TextField";

interface CreateTownFormProps {
  onCreated: () => void;
}

export function CreateTownForm({ onCreated }: CreateTownFormProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [maxCitizens, setMaxCitizens] = useState("10");
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);

    if (!role) {
      setErrorKey("towns.chooseRoleFirst");
      return;
    }

    setBusy(true);
    try {
      await api.post("/towns", {
        name: name.trim(),
        role,
        // TODO : nettoyer pour la prod
        ...(import.meta.env.DEV ? { max_citizens: Number(maxCitizens) } : {}),
      });
      onCreated();
    } catch (error) {
      setErrorKey(apiErrorKey(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-5">
      <TextField
        label={t("towns.name")}
        hint={t("towns.nameHint")}
        name="town-name"
        required
        minLength={3}
        maxLength={30}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-300">{t("towns.yourRole")}</p>
        <RolePicker selected={role} onSelect={setRole} disabled={busy} />
        <p className="text-xs text-slate-500">{t("towns.roleFinal")}</p>
      </div>

      {import.meta.env.DEV && (
        <TextField
          label={t("towns.sizeDev")}
          name="max-citizens"
          type="number"
          min={2}
          max={10}
          value={maxCitizens}
          onChange={(event) => setMaxCitizens(event.target.value)}
        />
      )}

      {errorKey && (
        <p
          role="alert"
          className="rounded-md border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-300"
        >
          {t(errorKey, { defaultValue: t("errors.generic") })}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="rounded-md bg-sky-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-60"
      >
        {t("towns.submitCreate")}
      </button>
    </form>
  );
}
