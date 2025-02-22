import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen">
            <h1 className="font-black text-3xl">BookMinute</h1> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="p-4 space-y-4">
                        <Skeleton className="w-20 h-6 rounded-md" />{" "}
                        {/* Category */}
                        <Skeleton className="w-3/4 h-8 rounded-md" />{" "}
                        {/* Title */}
                        <Skeleton className="w-full h-12 rounded-md" />{" "}
                        {/* Description */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-12 h-12 rounded-full" />{" "}
                            {/* Author Image */}
                            <div className="space-y-2">
                                <Skeleton className="w-24 h-5 rounded-md" />{" "}
                                {/* Author Name */}
                                <Skeleton className="w-36 h-4 rounded-md" />{" "}
                                {/* Author Bio */}
                            </div>
                        </div>
                        <Skeleton className="w-24 h-5 rounded-md" />{" "}
                        {/* Date */}
                    </Card>
                ))}
            </div>
        </div>
    );
}
