import { notFound } from "next/navigation";
import { localizedRouteLocales } from "@/lib/routes";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export async function generateStaticParams() {
  return localizedRouteLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!localizedRouteLocales.includes(locale as "zh")) {
    notFound();
  }

  return <div lang={locale}>{children}</div>;
}
