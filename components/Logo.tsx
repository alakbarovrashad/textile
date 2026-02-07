import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
};

const Logo = ({ href = "/", className }: LogoProps) => {
  return (
    <Link href={href} className={cn("font-bold", className)}>
      Textile
    </Link>
  );
};

export default Logo;
