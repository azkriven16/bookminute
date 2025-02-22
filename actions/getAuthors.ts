"use server";

import { prisma } from "@/lib/prisma";

export async function getAuthors() {
    return await prisma.author.findMany({
        select: { id: true, name: true },
    });
}
