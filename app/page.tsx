import BlogCard from "@/components/BlogCard";
import BlogCategories from "@/components/BlogCategories";
import { prisma } from "@/lib/prisma";
import { Author, Post, Category } from "@prisma/client";

interface HomeProps {
    searchParams: { category?: string };
}

export default async function Home({ searchParams }: HomeProps) {
    const params = await searchParams;

    const category = params?.category?.toLowerCase();

    let posts: (Post & { author: Author })[] = [];

    try {
        posts = await prisma.post.findMany({
            include: { author: true },
        });
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }

    // ✅ FIXED: Filter correctly using `some()` for arrays
    const filteredBlogs = posts.filter((blog) => {
        if (category) {
            return blog.categories.some(
                (cat) => cat.toLowerCase() === category
            );
        }
        return true; // No filter applied, return all posts
    });

    return (
        <main className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen">
            <BlogCategories category={category ?? ""} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <BlogCard {...blog} key={blog.id} />
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </main>
    );
}
