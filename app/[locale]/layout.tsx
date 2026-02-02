import React from "react";
import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase-admin";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

type RawPost = {
  id: string;
  cover_url: string | null;
  category: string | null;
  published: boolean;
  reading_time: number | null;
  created_at: string;
  post_translations: {
    locale: string;
    title: string;
    slug: string;
    excerpt: string | null;
  }[];
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const { data: postsData } = await supabaseAdmin
    .from("posts")
    .select(
      `
          id,
          cover_url,
          category,
          published,
          reading_time,
          created_at,
          post_translations (
            locale,
            title,
            slug,
            excerpt
          )
        `,
    )
    .order("created_at", { ascending: false })
    .limit(6);

  const rawPosts: RawPost[] = (postsData ?? []) as any;

  const blogPosts = rawPosts
    .map((p) => {
      const t =
        p.post_translations.find((x) => x.locale === locale) ||
        p.post_translations[0];

      if (!t) return null;
      const created = new Date(p.created_at);
      const dateLabel = created.toLocaleDateString(
        locale === "az" ? "az-AZ" : "en-US",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        },
      );

      const readingTimeLabel = p.reading_time
        ? `${p.reading_time} ${locale === "az" ? "DK OKUMA" : "MIN READ"}`
        : "";

      return {
        id: p.id,
        title: t.title,
        excerpt: t.excerpt || "",
        category: p.category || "",
        coverUrl: p.cover_url,
        dateLabel,
        readingTimeLabel,
        slug: t.slug,
      };
    })
    .filter(Boolean) as {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    coverUrl: string | null;
    dateLabel: string;
    readingTimeLabel: string;
    slug: string;
  }[];
  return (
    <div>
      <Header dict={dict} locale={locale} />
      <div className="min-h-screen">{children}</div>
      <Footer dict={dict} locale={locale} recentPosts={blogPosts} />
    </div>
  );
};

export default LocaleLayout;
