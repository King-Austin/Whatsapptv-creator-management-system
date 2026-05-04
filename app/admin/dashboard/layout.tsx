'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    MessageSquare,
    FileText,
    Settings,
    TrendingUp,
    LogOut,
    Search,
    Bell,
    Menu,
    X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-50 flex overflow-x-hidden">
            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-[60] w-80 bg-slate-900 text-white p-8 flex flex-col transition-transform duration-300 lg:sticky lg:translate-x-0 lg:z-40 lg:h-screen
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-3">
                        <div className="bg-primary p-2 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black">Admin<span className="text-primary">TV</span></span>
                    </div>
                    <button
                        className="lg:hidden p-2 text-slate-400 hover:text-white"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="space-y-2 flex-grow">
                    <NavItem
                        href="/admin/dashboard"
                        icon={LayoutDashboard}
                        label="Overview"
                        active={pathname === '/admin/dashboard'}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <NavItem
                        href="/admin/dashboard/blog"
                        icon={FileText}
                        label="Blog Posts"
                        active={pathname === '/admin/dashboard/blog'}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <NavItem
                        href="/admin/dashboard/ads"
                        icon={MessageSquare}
                        label="Ad Requests"
                        active={pathname === '/admin/dashboard/ads'}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <NavItem
                        href="/admin/dashboard/settings"
                        icon={Settings}
                        label="Settings"
                        active={pathname === '/admin/dashboard/settings'}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                </nav>

                <Link href="/admin" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors pt-8 border-t border-slate-800 font-bold">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </Link>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative hidden md:block w-64 lg:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Quick search..."
                                className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white" />
                        </button>
                        <div className="flex items-center gap-3 md:pl-6 md:border-l md:border-slate-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900">John Admin</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Super Admin</p>
                            </div>
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full border border-slate-200" />
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    {children}
                </div>
            </div>
        </main>
    );
}

function NavItem({ href, icon: Icon, label, active = false, onClick }: any) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-4 w-full p-4 rounded-2xl font-bold transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
            <Icon className="w-5 h-5" />
            {label}
        </Link>
    );
}
