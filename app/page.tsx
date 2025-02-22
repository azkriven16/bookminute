import BlogCard from "@/components/BlogCard";
import BlogCategories from "@/components/BlogCategories";
import { prisma } from "@/lib/prisma";
import { Author, Post } from "@prisma/client";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const blogCategory = await searchParams;

    let posts: (Post & { author: Author })[] = [];
    try {
        posts = await prisma.post.findMany({
            include: { author: true },
        });
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }

    return (
        <main className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen">
            <BlogCategories category={blogCategory.category as string} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.length > 0 ? (
                    posts.map((blog) => <BlogCard {...blog} key={blog.id} />)
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </main>
    );
}
