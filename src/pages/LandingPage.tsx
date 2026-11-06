import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/useAuth";
import { CustomButton } from "../components/CustomButton";
import { Text } from "../components/typo/Text";

const CHOICES = ["defend", "explore", "help"] as const;
const ROLES = ["explorer", "guardian", "healer", "tinkerer"] as const;

export function LandingPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <img
          src="frimas-hero-logo.png"
          alt="Frimas logo"
          className="mx-auto block  w-auto rounded-2xl object-contain"
        />
        <Text variant="h2" className="mt-10 text-slate-300">
          {t("landing.tagline")}
        </Text>
        <Text variant="h3" className="mx-auto mt-20  text-slate-400">
          {t("landing.intro1")}
        </Text>
        <Text variant="h3" className="mx-auto mt-4  text-slate-400">
          {t("landing.intro2")}
        </Text>

        <CustomButton asChild className="mt-8 px-6 py-3">
          <Link to={user ? "/app" : "/register"}>
            {user ? t("nav.enterGame") : t("landing.play")}
          </Link>
        </CustomButton>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="text-center text-2xl font-semibold">{t("landing.choicesTitle")}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {CHOICES.map((key) => (
            <article key={key} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
              <h3 className="font-semibold text-sky-300">{t(`landing.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-slate-400">{t(`landing.${key}.text`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="text-2xl font-semibold">{t("landing.rolesTitle")}</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {ROLES.map((role) => (
            <span
              key={role}
              className="rounded-full border border-slate-700 px-4 py-1.5 text-sm text-slate-300"
            >
              {t(`roles.${role}`)}
            </span>
          ))}
        </div>
        <p className="mt-6 text-slate-400">{t("landing.rolesText")}</p>
      </section>
    </div>
  );
}
