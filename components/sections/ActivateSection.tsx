"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useUserActivate } from "@/lib/hooks/useUserActivate";
import { useEffect, Suspense } from "react";
import { CircleCheck } from "lucide-react";
import { getDictionary } from "@/app/[lang]/dictionaries";

function ActivateContent({
  dict,
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["ActivatePage"];
}) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { activate, isLoading, response } = useUserActivate();

  const activatingAccount = dict.activatingAccount;
  const succes = dict.success;
  const failure = dict.failure;

  useEffect(() => {
    if (!token) return;
    void activate(token);
  }, [activate, token]);

  if (!token) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 overflow-hidden min-h-125 flex flex-col items-center justify-center">
      {isLoading ? (
        <p>{activatingAccount}</p>
      ) : response.success === true ? (
        <div className="bg-green-500 text-white p-4 flex flex-row items-center justify-center gap-4 w-full">
          <CircleCheck size={60} />
          <p className="text-xl" dangerouslySetInnerHTML={{ __html: succes }} />
        </div>
      ) : response.success === false ? (
        <div className="bg-red-500 text-white p-4 flex flex-row items-center justify-center gap-4 w-full">
          <p
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: failure }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default function ActivateSection({
  dict,
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["ActivatePage"];
}) {
  return (
    <Suspense 
      fallback={
        <div className="container mx-auto px-4 min-h-125 flex items-center justify-center">
          <p>{dict.activatingAccount}</p>
        </div>
      }
    >
      <ActivateContent dict={dict} />
    </Suspense>
  );
}