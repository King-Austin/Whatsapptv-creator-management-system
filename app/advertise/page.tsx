'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, BarChart3, Users, Play, Star, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

const features = [
    {
        title: "Status Placements",
        desc: "Full-screen video or image ads directly on our high-traffic WhatsApp Status story.",
        icon: Play,
    },
    {
        title: "Broadcast Push",
        desc: "Direct messages to our opt-in broadcast lists for immediate action.",
        icon: Zap,
    },
    {
        title: "Sponsored Content",
        desc: "Native articles and reviews on our blog that live forever on the web.",
        icon: BarChart3,
    },
    {
        title: "Banner Ads",
        desc: "Highly visible banner placements across our website layout.",
        icon: Star,
    }
];

const plans = [
    {
        name: "Trial Pack",
        price: "₦15,000",
        duration: "per day",
        features: ["1 Status Placement", "24h Visibility", "Standard Support", "Basic Analytics"],
        popular: false,
    },
    {
        name: "Growth Bundle",
        price: "₦65,000",
        duration: "per week",
        features: ["7 Status Placements", "1 Broadcast Push", "Priority Support", "Detailed Analytics", "Social Share"],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        duration: "Monthly",
        features: ["Daily Placements", "Bi-weekly Push", "Dedicated Manager", "Full Media Suite", "Custom Campaign"],
        popular: false,
    }
];

export default function AdvertisePage() {
    const [loading, setLoading] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const supabase = createClient();

    const handleSelectPlan = async (plan: any) => {
        setLoading(plan.name);
        const { error } = await supabase
            .from('gh_ad_requests')
            .insert([{
                brand_name: 'Direct Selection',
                contact_email: 'awaiting@contact.com',
                plan: plan.name,
                budget: plan.price,
                status: 'pending'
            }]);

        if (error) {
            alert('Error selecting plan: ' + error.message);
        } else {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        }
        setLoading(null);
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-slate-950 relative overflow-hidden text-center md:text-left">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]" />
                <div className="container-custom px-6 relative z-10">
                    <div className="max-w-4xl md:mx-0 mx-auto space-y-8">
                        <span className="badge-red">Advertise With Us</span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                            Scale Your Brand With <span className="text-primary italic">High-Reach</span> Media.
                        </h1>
                        <p className="text-slate-400 text-base md:text-xl font-medium leading-relaxed max-w-2xl">
                            Stop wasting budgets on low-engagement ads. Get your products directly in front of thousands of active WhatsApp users today.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="section-padding">
                <div className="container-custom px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-soft hover:shadow-medium transition-all group flex flex-col items-center md:items-start text-center md:text-left"
                            >
                                <div className="bg-primary/5 p-4 rounded-2xl text-primary mb-6 group-hover:scale-110 transition-transform w-fit">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900">Choose Your <span className="text-primary">Impact</span></h2>
                        <p className="text-slate-600 text-lg font-medium">Simple, transparent pricing to help you grow your business at any scale.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={`p-8 md:p-10 rounded-[2.5rem] border ${plan.popular ? 'bg-primary border-primary shadow-2xl shadow-primary/20 md:scale-105' : 'bg-white border-slate-100 shadow-soft'} relative overflow-hidden`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-5 right-5 bg-white text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <h4 className={`text-xl font-black mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h4>
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-4xl font-black ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                                            <span className={`text-sm font-bold opacity-70 ${plan.popular ? 'text-white' : 'text-slate-500'}`}>/{plan.duration}</span>
                                        </div>
                                    </div>
                                    <div className={`space-y-4 pt-6 border-t ${plan.popular ? 'border-white/10' : 'border-slate-100'}`}>
                                        {plan.features.map(f => (
                                            <div key={f} className="flex items-center gap-3">
                                                <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-green-500'}`} />
                                                <span className={`text-sm font-bold ${plan.popular ? 'text-white/90' : 'text-slate-600'}`}>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleSelectPlan(plan)}
                                        disabled={loading !== null}
                                        className={`block w-full text-center py-4 rounded-2xl font-black text-lg transition-all ${plan.popular ? 'bg-white text-primary hover:bg-slate-50' : 'bg-slate-900 text-white hover:bg-slate-800'} disabled:opacity-50`}
                                    >
                                        {loading === plan.name ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (submitted ? 'Requested!' : 'Get Started')}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial / Trust */}
            <section className="section-padding bg-white">
                <div className="container-custom px-6 text-center">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <Users className="w-12 h-12 text-primary mx-auto opacity-20" />
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 italic leading-tight">
                            "Since partnering with Uniziktalkertive TV, our brand reach in the South East has grown by 300%. The conversion rates are insane!"
                        </h2>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                                    alt="Chioma Nwosu"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">Chioma Nwosu</p>
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Founder, AfroGlow Cosmetics</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
