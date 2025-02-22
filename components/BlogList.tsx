"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { Post, Category, Author } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogListProps {
    posts: (Post & { author: Author })[];
    category?: string;
}

export default function BlogList({ posts, category }: BlogListProps) {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [filteredBlogs, setFilteredBlogs] = useState(posts);

    useEffect(() => {
        setLoading(true);

        const selectedCategory = searchParams.get("category")?.toUpperCase();

        // Simulate a delay for better UX (optional)
        setTimeout(() => {
            setFilteredBlogs(
                selectedCategory
                    ? posts.filter((blog) =>
                          blog.categories.includes(selectedCategory as Category)
                      )
                    : posts
            );
            setLoading(false);
        }, 500);
    }, [searchParams, posts]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
                <>
                    <BlogCardLoader />
                    <BlogCardLoader />
                    <BlogCardLoader />
                    <BlogCardLoader />
                </>
            ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                    <BlogCard {...blog} key={blog.id} />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
}

function BlogCardLoader() {
    return (
        <Card className="p-4 space-y-4">
            <Skeleton className="w-20 h-6 rounded-md" /> {/* Category */}
            <Skeleton className="w-3/4 h-8 rounded-md" /> {/* Title */}
            <Skeleton className="w-full h-12 rounded-md" /> {/* Description */}
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
            <Skeleton className="w-24 h-5 rounded-md" /> {/* Date */}
        </Card>
    );
}
