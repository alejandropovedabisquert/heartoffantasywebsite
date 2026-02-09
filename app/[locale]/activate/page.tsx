"use client";

import { notFound, useSearchParams } from "next/navigation";
import LandingLayout from "../landing-layout/layout";
import { useUserActivate } from "@/lib/hooks/useUserActivate";
import { useEffect } from "react";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";

// TODO: Add metadata and pass this page to server side
export default function Activate() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { activate, isLoading, response } = useUserActivate();
  const t = useTranslations('ActivatePage');
  if (!token) {
    notFound();
  }
  useEffect(() => {
    activate(token);
  }, []);
  if (response.success === false) {
    notFound();
  }
  return (
    <LandingLayout>
      <div className="container mx-auto px-4 overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
        {isLoading ? (
          <p>{t('activatingAccount')}</p>
        ) : response.success === true ? (
          <div className="bg-green-500 text-white p-4 flex flex-row items-center justify-center gap-4 w-full">
            <CircleCheck size={60} />
            <p className="text-xl" dangerouslySetInnerHTML={{ __html: t.raw('success') }} />
          </div>
        ) : null}
      </div>
    </LandingLayout>
  );
}
