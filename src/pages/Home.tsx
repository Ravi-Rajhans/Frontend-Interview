import { useState } from "react";
import { BlogList } from "@/components/BlogList";
import { BlogDetails } from "@/components/BlogDetails";
import { CreateBlogForm } from "@/components/CreateBlogForm";

export function Home() {
    const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            {/* Header */}
            <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
                        CA Monk Blog
                    </h1>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1">
                        Finance, Tech & Career Insights
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel - Blog List */}
                    <div className="lg:col-span-1 space-y-4">
                        <CreateBlogForm />
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">
                                All Blogs
                            </h2>
                            <BlogList
                                selectedBlogId={selectedBlogId}
                                onSelectBlog={setSelectedBlogId}
                            />
                        </div>
                    </div>

                    {/* Right Panel - Blog Details */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-8">
                            <BlogDetails blogId={selectedBlogId} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center text-[hsl(var(--muted-foreground))]">
                    <p>&copy; 2026 CA Monk Blog. Built with React, TanStack Query & Tailwind CSS.</p>
                </div>
            </footer>
        </div>
    );
}
