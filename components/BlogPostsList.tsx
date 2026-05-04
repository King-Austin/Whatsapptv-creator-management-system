'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Post {
    id: string | number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    created_at?: string;
    date?: string;
    image_url?: string;
    image?: string;
    slug: string;
}

export default function BlogPostsList({ posts }: { posts: Post[] }) {
    // Ensure posts are sorted by recently added if not already
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.created_at || a.date || 0).getTime();
        const dateB = new Date(b.created_at || b.date || 0).getTime();
        return dateB - dateA;
    });

    if (sortedPosts.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-bold text-xl">No posts found yet. Check back soon!</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {sortedPosts.map((post, idx) => (
                <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-4 rounded-[2.5rem] hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 border border-transparent hover:border-slate-100">
                        {/* Image */}
                        <div className="w-full md:w-2/5 aspect-[4/3] rounded-[2rem] overflow-hidden">
                            <img
                                src={post.image_url || post.image || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800"}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>

                        {/* Content */}
                        <div className="w-full md:w-3/5 space-y-4 pr-4">
                            <div className="flex items-center gap-3">
                                <span className="badge-red">{post.category}</span>
                            </div>

                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h2>
                            </Link>

                            <p className="text-slate-500 font-medium line-clamp-2 md:line-clamp-3 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-5 pt-2">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                                        <User className="w-4 h-4" />
                                    </div>
                                    {post.author}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    {post.date || (post.created_at ? new Date(post.created_at).toLocaleDateString() : '')}
                                </div>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="ml-auto flex items-center gap-2 text-primary font-black group/link"
                                >
                                    Read Now
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>
    );
}
