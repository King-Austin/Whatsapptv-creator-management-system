import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tag, Calendar, User, Search } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import BlogPostsList from '@/components/BlogPostsList';

const categories = ["All", "Growth", "Monetization", "Industry", "Tech", "Lifestyle"];

export default async function BlogPage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: posts, error } = await supabase
        .from('gh_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
    }

    const displayPosts = posts || [];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]" />
                <div className="container-custom px-6 relative z-10 text-center md:text-left">
                    <div className="max-w-3xl md:mx-0 mx-auto space-y-6">
                        <span className="badge-red">Our Blog</span>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight">
                            Latest <span className="text-primary italic">Updates</span>
                        </h1>
                        <p className="text-slate-400 text-xl font-medium leading-relaxed">
                            Stay up to date with the latest trends in digital media, advertising strategies, and growth hacks.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding">
                <div className="container-custom px-6">
                    {/* Mobile Search Bar - Compact Version */}
                    <div className="mb-10 lg:hidden">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all font-medium text-sm shadow-sm"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Posts Grid */}
                        <div className="lg:w-2/3 space-y-12">
                            <BlogPostsList posts={displayPosts} />
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-1/3 space-y-12">
                            {/* Search */}
                            <div className="hidden lg:block bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                <h3 className="text-xl font-black text-slate-900 mb-6">Search</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Type keywords..."
                                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all font-bold text-sm"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Tag className="w-5 h-5 text-primary" />
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button key={cat} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-primary p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
                                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative z-10 space-y-6">
                                    <h3 className="text-2xl font-black leading-tight">Join 5,000+ Media Owners</h3>
                                    <p className="font-bold text-white/80">Get the best WhatsApp TV growth tips delivered to your inbox weekly.</p>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 placeholder:text-white/40 font-bold focus:outline-none focus:bg-white/20 transition-all"
                                    />
                                    <button className="w-full bg-white text-primary rounded-2xl py-4 font-black hover:bg-slate-900 hover:text-white transition-all">
                                        Subscribe Now
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
