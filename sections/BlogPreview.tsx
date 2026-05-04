'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';

const dummyPosts = [
    {
        title: "How to Grow Your WhatsApp TV Following to 10k in 30 Days",
        excerpt: "Learn the secret strategies used by the top media brands to scale their status views rapidly...",
        category: "Growth",
        author: "Admin",
        date: "Feb 18, 2026",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800",
    },
    {
        title: "Top 10 High-Converting Ad Formats for WhatsApp Status",
        excerpt: "Discover which ad styles drive the most clicks and sales for your advertisers...",
        category: "Monetization",
        author: "Marketing",
        date: "Feb 15, 2026",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    },
    {
        title: "The Future of Digital Media: Why WhatsApp TV is Winning",
        excerpt: "Traditional media is dying. Here is why the next billion-dollar media companies are starting on WhatsApp...",
        category: "Industry",
        author: "Trend Watch",
        date: "Feb 12, 2026",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200",
    },
];

export default function BlogPreview() {
    return (
        <section id="blog" className="section-padding bg-white">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="max-w-2xl space-y-4">
                        <span className="badge-red">Latest Updates</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                            Insights & <span className="text-primary">Media News</span>
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg font-medium">
                            Stay ahead of the curve with our curated articles on media growth, monetization, and digital trends.
                        </p>
                    </div>
                    <Link href="/blog" className="btn-secondary flex items-center justify-center gap-2 group w-full md:w-auto">
                        View All Posts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {dummyPosts.map((post, idx) => (
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-soft hover:shadow-medium transition-all"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                                        <Tag className="w-3 h-3" />
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        {post.author}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed mb-8 flex-grow line-clamp-3 font-medium">
                                    {post.excerpt}
                                </p>
                                <Link
                                    href={`/blog/${idx}`}
                                    className="text-slate-900 font-bold flex items-center gap-2 group/btn"
                                >
                                    Read Article
                                    <div className="w-8 h-[2px] bg-primary group-hover/btn:w-12 transition-all duration-300" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
