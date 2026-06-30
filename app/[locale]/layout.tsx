import { notFound } from "next/navigation";
import { homeZh } from "@/lib/fonts";
import { localizedRouteLocales } from "@/lib/i18n";
import { SetDocumentLang } from "@/components/site/SetDocumentLang";

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

  return (
    <div lang={locale} className={homeZh.variable}>
      <SetDocumentLang lang={locale} />
      {children}
    </div>
  );
}
