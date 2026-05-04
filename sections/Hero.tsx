'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Play, Users } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero-bg.jpg"
                    alt="Social Media Management"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-20" />
            </div>

            <div className="container-custom px-6 relative z-30 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 rounded-full backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-white text-xs font-bold uppercase tracking-wider">The #1 Unizik Media Brand</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] md:leading-[0.95] tracking-tight"
                    >
                        Connecting <span className="text-primary italic">Millions</span> <br className="hidden sm:block" />
                        Directly to Your <br className="hidden sm:block" />
                        <span className="text-gradient-red italic">WhatsApp Status.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 text-base md:text-xl max-w-xl leading-relaxed font-medium"
                    >
                        Join 50,000+ daily viewers. Get exclusive news, entertainment, and the best deals delivered straight to your status 24/7.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 group px-8 py-4 text-lg w-full sm:w-auto">
                            Join Our Broadcast
                            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link href="/advertise" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 group text-lg w-full sm:w-auto">
                            Advertise With Us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-row items-center gap-6 md:gap-8 pt-4"
                    >
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-black text-white">50K+</span>
                            <span className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest">Daily Reach</span>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-black text-white">98%</span>
                            <span className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest">Engagement</span>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative hidden lg:block"
                >
                    <div className="aspect-square bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-4 border border-white/10 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2.5rem] z-10" />
                        <img
                            src="/images/engagement.jpg"
                            alt="Social Media Engagement"
                            className="w-full h-full object-cover rounded-[2rem] group-hover:scale-[1.02] transition-transform duration-700"
                        />

                        {/* Interactive Elements Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white shadow-xl z-20">
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    {[
                                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
                                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
                                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
                                        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200"
                                    ].map((url, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                            <img src={url} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold z-10 shadow-sm">+12k</div>
                                </div>
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <Users className="w-4 h-4" />
                                    <span>Active Now</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Cards */}
                    <div className="absolute -top-6 -right-6 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 animate-bounce-slow z-30">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <Play className="w-6 h-6 text-green-600 fill-current" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Story</p>
                                <p className="text-sm font-black text-slate-900">New Media Added</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>


    );
}
