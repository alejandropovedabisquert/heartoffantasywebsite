import { getDictionary } from "@/app/[lang]/dictionaries";
import GridVideo from "../../common/GridVideo";
import { Suspense } from "react";
import SkeletonGridVideo from "@/components/skeleton/SkeletonGridVideo";
import AnimatedTitle from "@/components/ui/animated/AnimatedTitle";

export default function VideosSection({
    dict
}: {
    dict: Awaited<ReturnType<typeof getDictionary>>["VideosSection"],
}) {
    return (
        <div className="relative my-24">
            <AnimatedTitle dict={dict.title} />
            <Suspense fallback={<SkeletonGridVideo length={3} />}>
                <GridVideo />
            </Suspense>
        </div>
    );
}
