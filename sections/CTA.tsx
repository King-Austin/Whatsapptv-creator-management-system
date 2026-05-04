'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
    return (
        <section className="section-padding bg-slate-950 relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
                    >
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Growth Focused Advertising</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight"
                    >
                        Ready to scale your <span className="text-primary italic">brand?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto"
                    >
                        Put your business in front of 50,000+ targeted daily viewers. High engagement, high impact, and real-time results.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6"
                    >
                        <Link href="/advertise" className="btn-primary px-12 py-5 rounded-2xl flex items-center justify-center gap-3 group w-full sm:w-auto">
                            <Zap className="w-5 h-5 fill-current" />
                            Book Your Slot
                        </Link>
                        <Link href="/contact" className="btn-secondary bg-white/5 border-white/10 text-white hover:bg-white/10 px-12 py-5 rounded-2xl flex items-center justify-center gap-3 w-full sm:w-auto">
                            <MessageSquare className="w-5 h-5" />
                            Talk to Us
                        </Link>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-slate-500 text-sm font-bold pt-8"
                    >
                        No hidden fees. Premium support. 24h setup.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

