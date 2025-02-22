import { Skeleton } from "@/components/ui/skeleton";

export default function BlogContentSkeleton() {
    return (
        <div className="space-y-4 max-w-3xl mx-auto p-6">
            {/* Title */}
            <Skeleton className="w-3/4 h-8 rounded-md" />
            {/* Meta Information (Author, Date) */}
            <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />{" "}
                {/* Author Image */}
                <div className="space-y-2">
                    <Skeleton className="w-24 h-5 rounded-md" />{" "}
                    {/* Author Name */}
                    <Skeleton className="w-36 h-4 rounded-md" /> {/* Date */}
                </div>
            </div>
            {/* Content Blocks */}
            <Skeleton className="w-full h-6 rounded-md" />
            <Skeleton className="w-full h-6 rounded-md" />
            <Skeleton className="w-5/6 h-6 rounded-md" />
            <Skeleton className="w-3/4 h-6 rounded-md" />
            <Skeleton className="w-full h-40 rounded-md" />{" "}
            {/* Placeholder for images */}
            <Skeleton className="w-full h-6 rounded-md" />
            <Skeleton className="w-5/6 h-6 rounded-md" />
            <Skeleton className="w-3/4 h-6 rounded-md" />
        </div>
    );
}
