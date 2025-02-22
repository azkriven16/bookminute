"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client"; // Import enum from Prisma

interface CategoriesProps {
    category: string;
}

// Function to capitalize each word properly
const formatCategory = (cat: string) =>
    cat
        .toLowerCase()
        .split("_") // Assuming Prisma enums use underscores
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export default function Categories({ category }: CategoriesProps) {
    return (
        <div className="flex flex-wrap gap-1">
            {Object.values(Category).map((cat) => (
                <Link key={cat} href={`?category=${cat}`} passHref>
                    <Button
                        variant={category === cat ? "default" : "outline"}
                        className="text-xs px-2 py-1 md:text-sm md:px-3 md:py-1.5"
                    >
                        {formatCategory(cat)}
                    </Button>
                </Link>
            ))}
        </div>
    );
}
