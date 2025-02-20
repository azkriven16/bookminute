"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Post, Author } from "@prisma/client";
import { Calendar, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

export default function BlogCard(blog: Post & { author: Author }) {
    const router = useRouter();

    return (
        <Card
            className="flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
            onClick={() => router.push(`/blog?id=${blog.id}`)}
        >
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-sm">
                        {blog.categories[0]}
                    </Badge>
                    <div
                        className="flex items-center text-sm text-muted-foreground"
                        suppressHydrationWarning
                    >
                        <Eye className="w-4 h-4 mr-1" />
                        {Math.floor(Math.random() * 100) + 1}
                    </div>
                </div>
                <CardTitle className="text-xl line-clamp-2 hover:text-primary">
                    {blog.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                </p>
            </CardContent>

            <CardFooter className="mt-auto">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarImage
                                src={blog.author.image}
                                alt={blog.author.name}
                            />
                            <AvatarFallback>
                                {blog.author.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">
                                {blog.author.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {blog.author.occupation}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(blog.createdAt)}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
