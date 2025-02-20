import BlogCard from "@/components/BlogCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
    });
    return (
        <main className="max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="font-black text-3xl">BookMinute</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((blog) => (
                    <BlogCard {...blog} key={blog.id} />
                ))}
            </div>
        </main>
    );
}
