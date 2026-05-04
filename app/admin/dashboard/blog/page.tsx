'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye, 
    Loader2, 
    ChevronRight, 
    Calendar, 
    Tag, 
    User,
    LayoutGrid,
    List,
    X,
    Clock
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function BlogManagement() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>( 'list');
    const [selectedPost, setSelectedPost] = useState<any>(null);
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
            const sorted = [...(data || [])].sort((a, b) => 
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            setPosts(sorted);
        }
        setLoading(false);
    }

    async function deletePost(id: string, e: React.MouseEvent) {
        e.stopPropagation();
        if (!confirm('Delete this post forever?')) return;
        const { error } = await supabase.from('gh_posts').delete().eq('id', id);
        if (error) alert(error.message);
        else setPosts(posts.filter(p => p.id !== id));
    }

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 sm:space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Content Engine</h1>
                    <p className="text-slate-500 font-medium text-sm sm:text-base">Manage your stories and campus updates.</p>
                </div>
                <Link 
                    href="/admin/dashboard/blog/new"
                    className="w-full sm:w-auto bg-slate-900 text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-black transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} />
                    Create New Story
                </Link>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm">
                <div className="relative w-full sm:flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by title or category..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl w-full sm:w-auto">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`flex-1 sm:flex-none p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                    >
                        <List size={20} className="mx-auto" />
                    </button>
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`flex-1 sm:flex-none p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                    >
                        <LayoutGrid size={20} className="mx-auto" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : (
                <>
                    {/* View Renders */}
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post) => (
                                <div 
                                    key={post.id}
                                    onClick={() => setSelectedPost(post)}
                                    className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-soft hover:shadow-xl transition-all cursor-pointer flex flex-col"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img 
                                            src={post.image_url || '/images/placeholder.jpg'} 
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="font-black text-slate-900 text-lg leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase">
                                                <Calendar size={12} />
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/admin/dashboard/blog/edit/${post.id}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                                                    <Edit size={16} />
                                                </Link>
                                                <button onClick={(e) => deletePost(post.id, e)} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredPosts.map((post) => (
                                <div 
                                    key={post.id}
                                    onClick={() => setSelectedPost(post)}
                                    className="group bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                                        <img src={post.image_url} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black uppercase text-primary tracking-widest">{post.category}</span>
                                            <span className="text-slate-200">•</span>
                                            <span className="text-[9px] font-bold text-slate-400">{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 pr-2">
                                        <Link href={`/admin/dashboard/blog/edit/${post.id}`} onClick={(e) => e.stopPropagation()} className="hidden sm:flex p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                                            <Edit size={18} />
                                        </Link>
                                        <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 font-bold">No stories found. Start writing!</p>
                        </div>
                    )}
                </>
            )}

            {/* Post Detail Drawer / Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedPost(null)} />
                    <div className="relative h-full w-full sm:w-[500px] bg-white shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
                        <div className="sticky top-0 bg-white/80 backdrop-blur-md p-6 border-b border-slate-100 flex items-center justify-between z-10">
                            <h2 className="font-black text-xl uppercase tracking-tighter">Story Details</h2>
                            <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-8">
                            <img src={selectedPost.image_url} alt="" className="w-full aspect-video object-cover rounded-[2rem] shadow-lg" />
                            
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <DetailBadge icon={<Tag size={12}/>} text={selectedPost.category} />
                                    <DetailBadge icon={<User size={12}/>} text={selectedPost.author} />
                                    <DetailBadge icon={<Clock size={12}/>} text={new Date(selectedPost.created_at).toLocaleDateString()} />
                                </div>
                                <h1 className="text-2xl font-black text-slate-900 leading-tight">
                                    {selectedPost.title}
                                </h1>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {selectedPost.content}
                                </p>
                            </div>

                            <div className="pt-10 flex gap-3">
                                <Link 
                                    href={`/admin/dashboard/blog/edit/${selectedPost.id}`}
                                    className="flex-1 bg-slate-900 text-white text-center py-4 rounded-2xl font-bold hover:bg-black transition-all"
                                >
                                    Edit Story
                                </Link>
                                <button 
                                    onClick={(e) => { deletePost(selectedPost.id, e as any); setSelectedPost(null); }}
                                    className="px-6 py-4 rounded-2xl border-2 border-slate-100 text-red-500 hover:bg-red-50 transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailBadge({ icon, text }: any) {
    return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-100">
            {icon}
            {text}
        </span>
    );
}