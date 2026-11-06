import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "fr";

  return (
    <div className="flex rounded-md border border-slate-700 p-0.5 text-sm">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => void i18n.changeLanguage(code)}
          aria-pressed={current === code}
          className={`rounded px-2.5 py-1 font-medium transition-colors ${
            current === code ? "bg-sky-500 text-slate-950" : "text-slate-400 hover:text-slate-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
