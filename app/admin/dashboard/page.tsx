'use client';

import React from 'react';
import {
    FileText,
    Plus,
} from 'lucide-react';

export default function AdminDashboardOverview() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Overview</h1>
                    <p className="text-slate-500 font-medium">Welcome back, here's what's happening today.</p>
                </div>
                <button className="bg-primary text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 w-full md:w-auto">
                    <Plus className="w-5 h-5" />
                    New Post
                </button>
            </div>


            <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest text-[11px] opacity-40">Recent Blog Posts</h3>
                <div className="space-y-6">
                    <RecentPost title="Growing Your TV Niche" date="2 hours ago" status="Published" />
                    <RecentPost title="Ad Monetization 101" date="5 hours ago" status="Draft" />
                    <RecentPost title="Latest Tech Reviews" date="1 day ago" status="Published" />
                </div>
            </div>
        </div>
    );
}


function RecentPost({ title, date, status }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                    <FileText className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                    <h5 className="font-bold text-slate-900">{title}</h5>
                    <p className="text-xs text-slate-400">{date}</p>
                </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>{status}</span>
            </div>
        </div>
    );
}
