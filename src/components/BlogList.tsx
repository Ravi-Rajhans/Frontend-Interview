import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { BlogCard } from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogListProps {
    selectedBlogId: string | null;
    onSelectBlog: (id: string) => void;
}

export function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: getBlogs,
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 border rounded-lg">
                        <div className="flex gap-2 mb-2">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-12" />
                        </div>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/4 mb-3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3 mt-1" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-medium">Error loading blogs</p>
                <p className="text-sm">{error.message}</p>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="p-4 bg-[hsl(var(--muted))] rounded-lg text-center">
                <p className="text-[hsl(var(--muted-foreground))]">No blogs found</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    isSelected={selectedBlogId === blog.id}
                    onClick={() => onSelectBlog(blog.id)}
                />
            ))}
        </div>
    );
}
