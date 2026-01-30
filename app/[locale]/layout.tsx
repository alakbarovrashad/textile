import React from "react";
import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div>
      <Header dict={dict} locale={locale} />
      {children}
      <Footer dict={dict} locale={locale} />
    </div>
  );
};

export default LocaleLayout;
