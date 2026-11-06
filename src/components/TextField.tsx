import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function TextField({ label, hint, id, ...inputProps }: TextFieldProps) {
  const inputId = id ?? inputProps.name;

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={inputId}
        className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
        {...inputProps}
      />
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
