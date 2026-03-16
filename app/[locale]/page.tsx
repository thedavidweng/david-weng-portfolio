import { notFound } from "next/navigation";
import { HomePageView } from "@/components/pages/HomePageView";
import { localizedRouteLocales, resolveLocalizedRouteLocale } from "@/lib/routes";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateStaticParams() {
  return localizedRouteLocales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  if (!resolvedLocale) {
    notFound();
  }

  return <HomePageView locale={resolvedLocale} pathname={`/${resolvedLocale}/`} />;
}
