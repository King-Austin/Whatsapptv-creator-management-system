'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function NewPostPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image_url: '',
        category: 'Tech',
        author: 'Emmanuel Kalu Olugu',
        status: 'published'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'title') {
                newData.slug = value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
                newData.excerpt = value;
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('gh_posts')
            .insert([{
                ...formData,
                created_at: new Date().toISOString()
            }]);

        if (error) {
            alert('Error creating post: ' + error.message);
        } else {
            router.push('/admin/dashboard/blog');
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard/blog" className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">New Post</h1>
                        <p className="text-slate-500 font-medium">Create something amazing today.</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-primary text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Publish Post
                </button>
            </div>

            <form className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Post Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter post title..."
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                        >
                            <option>Tech</option>
                            <option>Growth</option>
                            <option>Industry</option>
                            <option>Monetization</option>
                            <option>Lifestyle</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Featured Image URL</label>
                    <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Content (Markdown supported)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={12}
                        placeholder="Write your content here..."
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        required
                    />
                </div>
            </form>
        </div>
    );
}