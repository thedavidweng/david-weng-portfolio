import { notFound } from "next/navigation";
import { HomePageView } from "@/components/pages/HomePageView";
import { AgentView } from "@/components/pages/AgentView";
import { localizedRouteLocales, resolveLocalizedRouteLocale } from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{ mode?: string }>;
};

export async function generateStaticParams() {
  return localizedRouteLocales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({ params, searchParams }: LocalePageProps) {
  const [{ locale }, { mode }] = await Promise.all([params, searchParams]);
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  if (!resolvedLocale) {
    notFound();
  }

  if (mode === "agent") {
    return <AgentView locale={resolvedLocale} />;
  }

  return <HomePageView locale={resolvedLocale} pathname={`/${resolvedLocale}/`} />;
}
