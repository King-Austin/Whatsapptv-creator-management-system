'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    useEffect(() => {
        fetchPost();
    }, [id]);

    async function fetchPost() {
        const { data, error } = await supabase
            .from('gh_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            alert('Error fetching post: ' + error.message);
            router.push('/admin/dashboard/blog');
        } else {
            setFormData(data);
        }
        setLoading(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            
            // Auto-generate slug from title if title changes
            if (name === 'title') {
                newData.slug = value
                    .toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                
                newData.excerpt = prev.excerpt || value;
            }
            
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const updateData = {
            ...formData,
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from('gh_posts')
            .update(updateData)
            .eq('id', id);

        if (error) {
            alert('Error updating post: ' + error.message);
        } else {
            router.push('/admin/dashboard/blog');
            router.refresh();
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard/blog" className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Edit Post</h1>
                        <p className="text-slate-500 font-medium">Refining your content.</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-primary text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Update Post
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

                <div className="hidden">
                    <input type="text" name="slug" value={formData.slug} readOnly />
                    <textarea name="excerpt" value={formData.excerpt} readOnly />
                    <input type="radio" name="status" value="published" checked={formData.status === 'published'} readOnly />
                </div>
            </form>
        </div>
    );
}
