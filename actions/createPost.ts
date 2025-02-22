"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Category } from "@prisma/client";

const formSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    excerpt: z.string().min(5),
    content: z.string().min(10),
    authorId: z.string().min(1),
    categories: z.array(z.nativeEnum(Category)).min(1),
});

export async function createPost(formData: z.infer<typeof formSchema>) {
    try {
        formSchema.parse(formData); // Validate data

        await prisma.post.create({
            data: {
                ...formData,
                categories: formData.categories as Category[], // Ensure categories are stored correctly
            },
        });

        revalidatePath("/"); // Refresh posts list
    } catch (error) {
        console.error("Failed to create post:", error);
        throw new Error("Something went wrong.");
    }
}
