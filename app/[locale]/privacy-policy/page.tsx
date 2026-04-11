import LandingLayout from "../landing-layout/layout";
import { Metadata } from 'next';
import { getTranslations } from "next-intl/server";
import GenericPage from "@/components/common/GenericPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'PrivacyPolicySection'});

    return {
        metadataBase: new URL('https://www.heartoffantasy.com'),
        title: t('metadata.title'),
        description: t('metadata.description'),
        // openGraph: {
        //     images: t('metadata.openGraphImage'),
        // },
    };
}

export default function Page() {
    return (
        <LandingLayout>
            <GenericPage translationsKey="PrivacyPolicySection"/>
        </LandingLayout>
    );
}