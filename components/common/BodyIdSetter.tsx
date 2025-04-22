"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";

export default function BodyIdSetter() {
  const pathname = usePathname();
  const path = pathname as string;
  const slug = path === "/" ? "home" : pathname.slice(1).replace(/\//g, "-");
    
  useEffect(() => {
    document.body.id = slug;
  }, [slug]);

  return null;
}
