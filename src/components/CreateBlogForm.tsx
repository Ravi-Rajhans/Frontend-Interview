import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function CreateBlogForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        coverImage: "",
        content: "",
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            setFormData({
                title: "",
                category: "",
                description: "",
                coverImage: "",
                content: "",
            });
            setIsOpen(false);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            title: formData.title,
            category: formData.category.split(",").map((c) => c.trim().toUpperCase()),
            description: formData.description,
            coverImage: formData.coverImage,
            content: formData.content,
            date: new Date().toISOString(),
        });
    };

    if (!isOpen) {
        return (
            <Button onClick={() => setIsOpen(true)} className="w-full">
                + Create New Blog
            </Button>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Create New Blog</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Categories (comma-separated)
                        </label>
                        <Input
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="e.g., TECH, FINANCE"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief description of the blog"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                        <Input
                            value={formData.coverImage}
                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your blog content here..."
                            className="min-h-[150px]"
                            required
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Creating..." : "Create Blog"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>

                    {mutation.isError && (
                        <p className="text-red-500 text-sm">
                            Error: {mutation.error.message}
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
