import Mdx from "@/components/Mdx";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;

    if (!params.id) return null;

    const blog = await prisma.post.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!blog)
        return (
            <p className="text-center text-muted-foreground">Post not found.</p>
        );

    const mdxContent = (blog.content as { mdx?: string })?.mdx ?? "";

    const mdxSource = await serialize(mdxContent, {
        parseFrontmatter: true,
    });

    return (
        <div className="max-w-6xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link href="/">
                <Button
                    variant="ghost"
                    className="mb-6 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Posts
                </Button>
            </Link>

            <article className="prose lg:prose-xl dark:prose-invert">
                <Mdx source={mdxSource} />
            </article>
        </div>
    );
}
