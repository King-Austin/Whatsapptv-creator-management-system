'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tv, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                // Store a simple auth flag in localStorage for client-side persistence
                localStorage.setItem('isAdminAuthenticated', 'true');
                router.push('/admin/dashboard');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-10 space-y-4">
                    <Link href="/" className="inline-flex items-center space-x-2 group">
                        <div className="bg-primary p-2 rounded-xl">
                            <Tv className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900">
                            WhatsApp<span className="text-primary">TV</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-black text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500 font-medium">Log in to manage your media empire.</p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-soft border border-slate-100">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 italic">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    required
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    required
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-lg group disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <Link href="/" className="text-slate-400 text-sm font-bold hover:text-primary transition-colors">
                            Back to Website
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
