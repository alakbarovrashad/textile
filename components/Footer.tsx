"use client";

import React from "react";
import { Locale } from "@/i18n";
import { Facebook, Github, LucideIcon, Rss } from "lucide-react";
import Link from "next/link";
import { Dict } from "@/types/dict";

interface FooterProps {
  locale: Locale;
  dict: Dict;
}

const socialIcons: { icon: LucideIcon; href: string; label: string }[] = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Rss, href: "#", label: "RSS" },
];

const Footer = ({ dict, locale }: FooterProps) => {
  const buildHref = (path: string) => `/${locale}${path ? `/${path}` : ""}`;

  const pagesLinks = [
    { label: dict.footer.pages.about, href: "about" },
    { label: dict.footer.pages.contact, href: "contact" },
    { label: dict.footer.pages.elements, href: "elements" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-mycolor2/10 bg-mycolor1 text-mycolor2">
      <div className=" mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-8">
          <div className="space-y-4 md:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              {dict.site.title}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-mycolor2/70">
              {dict.site.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-mycolor2">
              {socialIcons.map((item) => (
                <Link key={item.label} href={item.href}>
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-mycolor2/80">
              {dict.footer.pagesTitle}
            </h3>
            <ul className="space-y-2 text-sm">
              {pagesLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={buildHref(item.href)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-mycolor2/80">
              {dict.footer.pagesTitle}
            </h3>
            <ul className="space-y-2 text-sm">
              {pagesLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={buildHref(item.href)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" mt-10 border-t border-mycolor2/10"></div>

        <div className="mt-4 flex flex-col items-center justify-between gap-2 text-xs text-mycolor2/60 md:flex-row">
          <p>
            {year} © <span className="font-semibold">{dict.site.title}</span>.{" "}
            {dict.footer.copyrightPrefix}
          </p>
          <p>
            {dict.footer.publishedWith}{" "}
            <span className="font-semibold">Next.js&nbsp;16</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
