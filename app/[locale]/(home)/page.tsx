import { ModeToggle } from "@/components/ModeToggle";
import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div>
      <h1>{dict.site.title}</h1>
      <ModeToggle />
    </div>
  );
}
