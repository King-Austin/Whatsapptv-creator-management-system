'use client';

import React from 'react';
import Link from 'next/link';
import { Tv, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-white pt-20 pb-10">
            <div className="container-custom px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 text-center sm:text-left">
                    {/* Brand Col */}
                    <div className="space-y-6 flex flex-col items-center sm:items-start">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="bg-primary p-2 rounded-xl">
                                <Tv className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">
                                Unizik<span className="text-primary">talkertive</span>TV
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-xs mx-auto sm:mx-0">
                            UNIZIK's premier digital media platform. Delivering campus buzz, entertainment fire, and strategic digital growth for the South East. Powered by P.O.T.E.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter, MessageCircle].map((Icon, idx) => (
                                <a key={idx} href="#" className="bg-white/5 hover:bg-primary p-3 rounded-xl transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Navigation</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Latest News</Link></li>
                            <li><Link href="/advertise" className="hover:text-primary transition-colors">Advertise With Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Advertise */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Monetization</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/advertise" className="hover:text-primary transition-colors">Banner Ads</Link></li>
                            <li><Link href="/advertise" className="hover:text-primary transition-colors">Sponsored Posts</Link></li>
                            <li><Link href="/advertise" className="hover:text-primary transition-colors">Status Ad Placements</Link></li>
                            <li><Link href="/advertise" className="hover:text-primary transition-colors">Partner Program</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} Uniziktalkertive TV. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <span>Powered by</span>
                        <a href="https://www.websyncdigital.com.ng" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline transition-all">Websyncdigital</a>
                    </div>
                    <div className="flex gap-8 text-slate-500 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

