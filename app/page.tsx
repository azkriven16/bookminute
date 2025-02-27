import BlogCategories from "@/components/BlogCategories";
import BlogList from "@/components/BlogList";
import { prisma } from "@/lib/prisma";
import { Author, Post } from "@prisma/client";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;

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
            <BlogCategories category={params?.category ?? ""} />
            <BlogList posts={posts} category={params?.category} />
        </main>
    );
}
