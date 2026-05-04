'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, Award } from 'lucide-react';

const stats = [
    {
        label: 'Daily Status Views',
        value: '50,000+',
        description: 'Consistent high engagement every 24 hours.',
        icon: Eye,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        label: 'Active Subscribers',
        value: '120K+',
        description: 'Loyal community across multiple broadcast lists.',
        icon: Users,
        color: 'text-green-600',
        bg: 'bg-green-50',
    },
    {
        label: 'Conversion Rate',
        value: '15.4%',
        description: 'Industry-leading click-through rate for ads.',
        icon: TrendingUp,
        color: 'text-primary',
        bg: 'bg-primary/5',
    },
    {
        label: 'Brand Partners',
        value: '200+',
        description: 'Trusted by top local and international brands.',
        icon: Award,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
    },
];

export default function About() {
    return (
        <section id="stats" className="section-padding bg-slate-50">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                        Our Reach in <span className="text-primary">Numbers</span>
                    </h2>
                    <p className="text-slate-600 text-lg font-medium">
                        We don't just post content; we drive results. Our platform is built on transparency and measurable impact for our partners.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-medium transition-all group"
                        >
                            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">{stat.value}</h3>
                            <p className="text-slate-900 font-bold text-sm mb-3 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-slate-500 text-sm leading-relaxed">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-8 md:p-10 bg-primary rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
                        <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">Why Brands Choose Us?</h3>
                            <p className="text-white/80 text-base md:text-lg max-w-xl">
                                Unlike traditional media, WhatsApp Status marketing offers 100% visibility and personal connection with the audience.
                            </p>
                        </div>
                        <a href="/advertise" className="w-full lg:w-auto bg-white text-primary px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-colors shadow-xl text-center">
                            Get Media Kit
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
