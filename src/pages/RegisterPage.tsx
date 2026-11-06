import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/useAuth";
import { TextField } from "../components/TextField";

export function RegisterPage() {
  const { t } = useTranslation();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);

    if (password !== confirm) {
      setErrorKey("auth.passwordsMismatch");
      return;
    }

    setSubmitting(true);
    try {
      await register(username.trim(), password);
    } catch (error) {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      if (status === 409) setErrorKey("errors.username_taken");
      else if (status === 400) setErrorKey("errors.invalid_input");
      else setErrorKey("errors.generic");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">{t("auth.registerTitle")}</h1>

      <form onSubmit={(event) => void handleSubmit(event)} className="mt-8 space-y-5">
        <TextField
          label={t("auth.username")}
          hint={t("auth.usernameHint")}
          name="username"
          autoComplete="username"
          required
          minLength={3}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label={t("auth.password")}
          hint={t("auth.passwordHint")}
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          label={t("auth.confirmPassword")}
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
        />

        {errorKey && (
          <p
            role="alert"
            className="rounded-md border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-300"
          >
            {t(errorKey)}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-sky-500 px-4 py-2.5 font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-60"
        >
          {t("auth.submitRegister")}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400">
        {t("auth.hasAccount")}{" "}
        <Link to="/login" className="font-semibold text-sky-300 hover:underline">
          {t("auth.submitLogin")}
        </Link>
      </p>
    </div>
  );
}
