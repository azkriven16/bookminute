"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";

interface CategoriesProps {
    category: string;
}

// Function to format category names properly
const formatCategory = (cat: string) =>
    cat
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export default function Categories({ category }: CategoriesProps) {
    return (
        <div className="flex flex-wrap gap-1">
            {/* "All" Button to Reset Category */}
            <Link href="/" passHref>
                <Button
                    variant={!category ? "default" : "outline"}
                    className="text-xs px-2 py-1 md:text-sm md:px-3 md:py-1.5"
                >
                    All
                </Button>
            </Link>

            {Object.values(Category).map((cat) => {
                // Normalize category comparison
                const isActive =
                    category.toUpperCase().replace("-", "_") === cat;

                return (
                    <Link key={cat} href={`?category=${cat}`} passHref>
                        <Button
                            variant={isActive ? "default" : "outline"}
                            className="text-xs px-2 py-1 md:text-sm md:px-3 md:py-1.5"
                        >
                            {formatCategory(cat)}
                        </Button>
                    </Link>
                );
            })}
        </div>
    );
}
