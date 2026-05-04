'use client';

import React, { useEffect, useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Eye,
    Calendar,
    User,
    Loader2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function BlogManagement() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const supabase = createClient();

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        setLoading(true);
        const { data, error } = await supabase
            .from('gh_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data || []);
        }
        setLoading(false);
    }

    async function deletePost(id: string) {
        if (!confirm('Are you sure you want to delete this post?')) return;

        const { error } = await supabase
            .from('gh_posts')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting post: ' + error.message);
        } else {
            setPosts(posts.filter(p => p.id !== id));
        }
    }

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Blog Posts</h1>
                    <p className="text-slate-500 font-medium">Manage and publish your latest articles.</p>
                </div>
                <Link href="/admin/dashboard/blog/new" className="bg-primary text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 w-full md:w-auto">
                    <Plus className="w-5 h-5" />
                    Create New Post
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] shadow-soft border border-slate-100">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-[2.5rem] shadow-soft border border-slate-100 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Post Details</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100">
                                                    <img src={post.image_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=200"} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 line-clamp-1">{post.title}</h3>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-black uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                                                post.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                            }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                                <Link href={`/admin/dashboard/blog/edit/${post.id}`} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                                    <Edit2 className="w-5 h-5" />
                                                </Link>
                                                <button onClick={() => deletePost(post.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-slate-400 font-bold">No posts found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
