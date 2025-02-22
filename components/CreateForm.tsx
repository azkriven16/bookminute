"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Category, Author } from "@prisma/client";
import { createPost } from "@/actions/createPost"; // Server action
import { getAuthors } from "@/actions/getAuthors"; // Fetch authors from DB

const formSchema = z.object({
    title: z.string().min(3, "Title is required"),
    slug: z.string().min(3, "Slug is required"),
    excerpt: z.string().min(5, "Excerpt is required"),
    content: z.string().min(10, "Content is required"),
    authorId: z.string().min(1, "Author is required"),
    categories: z
        .array(z.nativeEnum(Category))
        .min(1, "Select at least one category"),
});

export default function Create() {
    const [authors, setAuthors] = useState<any[]>([]);
    const [loadingAuthors, setLoadingAuthors] = useState(true);

    useEffect(() => {
        async function fetchAuthors() {
            const data = await getAuthors();
            setAuthors(data);
            setLoadingAuthors(false);
        }
        fetchAuthors();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const selectedCategories = watch("categories") || [];

    async function onSubmit(data: z.infer<typeof formSchema>) {
        await createPost(data);
        alert("suc");
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Create a New Post</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("title")} />
                    {errors.title && (
                        <p className="text-red-500 text-sm">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" {...register("slug")} />
                    {errors.slug && (
                        <p className="text-red-500 text-sm">
                            {errors.slug.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea id="excerpt" {...register("excerpt")} />
                    {errors.excerpt && (
                        <p className="text-red-500 text-sm">
                            {errors.excerpt.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" {...register("content")} />
                    {errors.content && (
                        <p className="text-red-500 text-sm">
                            {errors.content.message}
                        </p>
                    )}
                </div>

                {/* Author Selection */}
                <div>
                    <Label htmlFor="author">Author</Label>
                    <Select
                        onValueChange={(value) => setValue("authorId", value)}
                        disabled={loadingAuthors}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select an author" />
                        </SelectTrigger>
                        <SelectContent>
                            {authors.map((author) => (
                                <SelectItem key={author.id} value={author.id}>
                                    {author.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.authorId && (
                        <p className="text-red-500 text-sm">
                            {errors.authorId.message}
                        </p>
                    )}
                </div>

                {/* Categories Selection */}
                <div>
                    <Label>Categories</Label>
                    <div className="flex flex-wrap gap-2">
                        {Object.values(Category).map((cat) => (
                            <label
                                key={cat}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    checked={selectedCategories.includes(cat)}
                                    onCheckedChange={(checked) => {
                                        setValue(
                                            "categories",
                                            checked
                                                ? [...selectedCategories, cat]
                                                : selectedCategories.filter(
                                                      (c) => c !== cat
                                                  )
                                        );
                                    }}
                                />
                                <span>{cat.replace("_", " ")}</span>
                            </label>
                        ))}
                    </div>
                    {errors.categories && (
                        <p className="text-red-500 text-sm">
                            {errors.categories.message}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Post"}
                </Button>
            </form>
        </div>
    );
}
