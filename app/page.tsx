import BlogCard from "@/components/BlogCard";
import BlogCategories from "@/components/BlogCategories";
import { prisma } from "@/lib/prisma";
import { Author, Post, Category } from "@prisma/client";

interface HomeProps {
    searchParams: Record<string, string | undefined>;
}

export default async function Home({ searchParams }: HomeProps) {
    const category = searchParams.category as Category | undefined; // Ensure proper type

    let posts: (Post & { author: Author })[] = [];

    try {
        posts = await prisma.post.findMany({
            where: category
                ? {
                      categories: {
                          has: category,
                      },
                  }
                : {},
            include: { author: true },
        });
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }

    return (
        <main className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen">
            <BlogCategories category={category ?? ""} />

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
