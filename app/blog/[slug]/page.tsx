import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: post, error } = await supabase
        .from('gh_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header / Post Hero */}
            <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]" />
                <div className="container-custom px-6 relative z-10">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="badge-red">{post.category}</span>
                            </div>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest pt-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-primary">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <span className="text-white">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <article className="pb-20 pt-16">
                <div className="container-custom px-6">
                    <div className="max-w-4xl mx-auto space-y-12">

                        {/* Featured Image */}
                        {post.image_url && (
                             <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        {/* Content & Sharing */}
                        <div className="flex flex-col lg:flex-row gap-16 pt-10">
                            {/* Body */}
                            <div className="lg:w-3/4">
                                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-slate-900">
                                    <div className="whitespace-pre-wrap">{post.content}</div>
                                </div>
                            </div>

                            {/* Sticky Sidebar Sharing */}
                            <div className="lg:w-1/4">
                                <div className="sticky top-32 space-y-10">
                                    <div className="space-y-6">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                            <Share2 className="w-4 h-4 text-primary" />
                                            Share Post
                                        </h4>
                                        <div className="flex flex-col gap-3">
                                            <button className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all group">
                                                <Facebook className="w-5 h-5 text-[#1877F2] group-hover:text-white" />
                                                Facebook
                                            </button>
                                            <button className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all group">
                                                <Twitter className="w-5 h-5 text-[#1DA1F2] group-hover:text-white" />
                                                Twitter
                                            </button>
                                            <button className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all group">
                                                <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white" />
                                                WhatsApp
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}