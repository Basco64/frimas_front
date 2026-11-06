import { useTranslation } from "react-i18next";

import { ROLES, type Role, type RoleAvailability } from "../types";

interface RolePickerProps {
  availability?: RoleAvailability[];
  selected: Role | null;
  onSelect: (role: Role) => void;
  disabled?: boolean;
}

export function RolePicker({
  availability,
  selected,
  onSelect,
  disabled = false,
}: RolePickerProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-2 sm:grid-cols-2" role="radiogroup">
      {ROLES.map((role) => {
        const info = availability?.find((entry) => entry.role === role);
        const full = info ? info.remaining === 0 : false;
        const isSelected = selected === role;

        return (
          <button
            key={role}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled || full}
            onClick={() => onSelect(role)}
            className={`rounded-md border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              isSelected
                ? "border-sky-400 bg-sky-500/10"
                : "border-slate-700 hover:border-slate-500"
            }`}
          >
            <span className="block font-semibold">{t(`roles.${role}`)}</span>
            {info && (
              <span className="block text-xs text-slate-400">
                {full
                  ? t("towns.full")
                  : t("towns.places", { remaining: info.remaining, slots: info.slots })}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
