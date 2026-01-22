import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/api/blogs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogDetailsProps {
    blogId: string | null;
}

export function BlogDetails({ blogId }: BlogDetailsProps) {
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => getBlogById(blogId!),
        enabled: !!blogId,
    });

    if (!blogId) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px] bg-[hsl(var(--muted))] rounded-lg">
                <p className="text-[hsl(var(--muted-foreground))]">
                    Select a blog to view details
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-5 w-1/4" />
                <div className="space-y-2 mt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-medium">Error loading blog</p>
                <p className="text-sm">{error.message}</p>
            </div>
        );
    }

    if (!blog) {
        return null;
    }

    const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="space-y-6">
            <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg"
            />

            <div className="flex flex-wrap gap-2">
                {blog.category.map((cat) => (
                    <Badge key={cat} variant="default">
                        {cat}
                    </Badge>
                ))}
            </div>

            <div>
                <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    {blog.title}
                </h1>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {formattedDate}
                </p>
            </div>

            <p className="text-lg text-[hsl(var(--muted-foreground))] italic">
                {blog.description}
            </p>

            <div className="prose max-w-none">
                {blog.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-[hsl(var(--foreground))] leading-relaxed mb-4">
                        {paragraph}
                    </p>
                ))}
            </div>
        </article>
    );
}
