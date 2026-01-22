import type { Blog } from "@/types/blog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
    blog: Blog;
    isSelected: boolean;
    onClick: () => void;
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
    const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <Card
            className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-[hsl(var(--primary))]" : ""
                }`}
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex flex-wrap gap-1 mb-2">
                    {blog.category.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                        </Badge>
                    ))}
                </div>
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="text-xs">{formattedDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2">
                    {blog.description}
                </p>
            </CardContent>
        </Card>
    );
}
