'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    FileText, 
    MessageSquare, 
    Settings, 
    LogOut,
    ExternalLink,
    Menu,
    X,
    Shield
} from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { icon: <LayoutDashboard size={18} />, label: 'Overview', href: '/admin/dashboard' },
        { icon: <FileText size={18} />, label: 'Blog Posts', href: '/admin/dashboard/blog' },
        { icon: <MessageSquare size={18} />, label: 'Ad Requests', href: '/admin/dashboard/ads' },
        { icon: <Settings size={18} />, label: 'Settings', href: '/admin/dashboard/settings' },
    ];

    const NavContent = () => (
        <div className="flex flex-col h-full bg-white">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Shield size={16} />
                    </div>
                    <span className="font-black text-xs tracking-[0.2em] text-slate-900 uppercase">
                        Unizik<span className="text-primary italic">Admin</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1.5">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${
                                isActive 
                                    ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-[1.02]' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <span className={isActive ? 'text-white' : 'text-slate-400'}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-slate-50">
                <Link 
                    href="/" 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-400 hover:text-primary hover:bg-primary/5 transition-all uppercase tracking-[0.2em]"
                >
                    <ExternalLink size={12} />
                    Site Feed
                </Link>
                <button className="flex items-center gap-3 px-4 py-6 text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] hover:text-red-500 transition-colors w-full">
                    <LogOut size={16} />
                    Exit Session
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFDFF]">
            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 hidden lg:block z-50">
                <NavContent />
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden h-16 bg-white border-b border-slate-100 flex items-center justify-between px-5 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                        <Shield size={14} />
                    </div>
                    <span className="font-bold text-sm text-slate-900 uppercase">Admin</span>
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 bg-slate-50 rounded-lg text-slate-600 active:scale-95 transition-all"
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <aside className="fixed left-0 top-0 h-full w-64 bg-white z-50 lg:hidden animate-in slide-in-from-left duration-300">
                        <NavContent />
                    </aside>
                </>
            )}

            {/* Main Content */}
            <main className="lg:pl-64 min-h-screen">
                <div className="p-4 sm:p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}