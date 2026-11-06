import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/useAuth";
import { CustomButton } from "../components/CustomButton";
import { TextField } from "../components/TextField";
import { Text } from "../components/typo/Text";

export function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);
    setSubmitting(true);
    try {
      await login(username.trim(), password);
    } catch (error) {
      const unauthorized = axios.isAxiosError(error) && error.response?.status === 401;
      setErrorKey(unauthorized ? "errors.invalid_credentials" : "errors.generic");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">{t("auth.loginTitle")}</h1>

      <form onSubmit={(event) => void handleSubmit(event)} className="mt-8 space-y-5">
        <TextField
          label={t("auth.username")}
          name="username"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label={t("auth.password")}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errorKey && (
          <Text
            variant="p"
            role="alert"
            className="rounded-md border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-300"
          >
            {t(errorKey)}
          </Text>
        )}

        <CustomButton
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-sky-500 px-4 py-2.5 text-slate-950 hover:bg-sky-400 disabled:opacity-60"
        >
          {t("auth.submitLogin")}
        </CustomButton>
      </form>

      <div className="mt-8 border-t border-slate-800 pt-6 text-center">
        <p className="text-sm text-slate-400">{t("auth.noAccount")}</p>
        <Link
          to="/register"
          className="mt-3 inline-block rounded-md border border-sky-500 px-5 py-2 text-sm font-semibold text-sky-300 hover:bg-sky-500/10"
        >
          {t("auth.submitRegister")}
        </Link>
      </div>
    </div>
  );
}
