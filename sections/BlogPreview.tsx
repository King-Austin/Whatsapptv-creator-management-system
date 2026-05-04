'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';

export default function BlogPreview() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchRecentPosts() {
            setLoading(true);
            const { data, error } = await supabase
                .from('gh_posts')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false })
                .limit(3);

            if (!error && data) {
                // Double check sorting for "Recently Added"
                const sorted = [...(data || [])].sort((a, b) => 
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
                setPosts(sorted);
            }
            setLoading(false);
        }
        fetchRecentPosts();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <section className="py-24 bg-white">
            <div className="container-custom px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-6">
                            Latest Updates
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                            Insights & <span className="text-primary">Media News</span>
                        </h2>
                        <p className="text-slate-500 text-lg mt-6 font-medium">
                            Stay ahead of the curve with our curated articles on media growth, monetization, and digital trends.
                        </p>
                    </div>
                    <Link 
                        href="/blog" 
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-900 hover:border-primary hover:text-primary transition-all duration-300 shadow-sm"
                    >
                        View All Posts
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img 
                                    src={post.image_url} 
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-sm flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" />
                                        {post.author}
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                
                                <p className="text-slate-500 font-medium line-clamp-3 mb-8 text-sm leading-relaxed">
                                    {post.content}
                                </p>
                                
                                <div className="mt-auto pt-6 border-t border-slate-50">
                                    <Link 
                                        href={`/blog/${post.slug}`}
                                        className="text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-primary flex items-center gap-2 transition-colors"
                                    >
                                        Read Story
                                        <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-primary" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {posts.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-bold">No articles published yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}