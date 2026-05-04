'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

// Dynamically import the editor to avoid SSR issues
const Editor = dynamic(() => import('@/components/Editor'), { 
  ssr: false,
  loading: () => (
    <div className="max-w-3xl mx-auto py-20 text-center text-slate-400">
      Loading editor...
    </div>
  )
});

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    featured_image: '',
    content: null
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async () => {
    if (!postData.title) {
      alert('Please enter a title');
      return;
    }

    setLoading(true);
    const slug = generateSlug(postData.title);

    const { error } = await supabase
      .from('posts')
      .insert([{
        title: postData.title,
        featured_image: postData.featured_image,
        content: postData.content,
        slug: slug,
        status: 'published' // Default to published for simplicity
      }]);

    if (error) {
      alert('Error saving post: ' + error.message);
    } else {
      alert('Post saved successfully!');
      router.push('/admin/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10 flex items-center justify-between">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
              <Sparkles className="w-3 h-3" />
              Creator Mode
            </span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Title input */}
          <div className="space-y-2">
            <input 
              type="text" 
              value={postData.title}
              onChange={(e) => setPostData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter a catchy title..."
              className="w-full bg-transparent border-none outline-none text-4xl md:text-5xl font-black text-slate-900 placeholder:text-slate-200"
            />
          </div>

          {/* Featured Image input */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Featured Image URL
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={postData.featured_image}
                onChange={(e) => setPostData(prev => ({ ...prev, featured_image: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm font-medium text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* The Editor */}
        <Editor 
          content={postData.content} 
          onChange={(content) => setPostData(prev => ({ ...prev, content }))}
          onSave={handleSave}
          loading={loading}
        />
      </div>
    </div>
  );
}
