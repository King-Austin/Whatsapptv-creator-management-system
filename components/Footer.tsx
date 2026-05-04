'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tv, Instagram, Facebook, Twitter, MessageCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [settings, setSettings] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        async function fetchSettings() {
            const { data } = await supabase
                .from('gh_site_settings')
                .select('*')
                .single();
            if (data) setSettings(data);
        }
        fetchSettings();
    }, []);

    const brandName = settings?.brand_name || 'Uniziktalkertive TV';
    const contactEmail = settings?.contact_email || 'admin@uniziktalkertive.tv';

    const socials = [
        { Icon: Instagram, url: settings?.instagram_url },
        { Icon: Facebook, url: settings?.facebook_url },
        { Icon: Twitter, url: settings?.twitter_url },
        { Icon: MessageCircle, url: settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}` : null },
    ].filter(s => s.url);

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
                                {brandName.replace(' TV', '')}<span className="text-primary">{brandName.includes(' TV') ? ' TV' : ''}</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-xs mx-auto sm:mx-0">
                            {brandName} is UNIZIK's premier digital media platform. Delivering campus buzz, entertainment fire, and strategic digital growth.
                        </p>
                        <div className="flex gap-4">
                            {socials.length > 0 ? socials.map(({ Icon, url }, idx) => (
                                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-primary p-3 rounded-xl transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            )) : (
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Connect with us</p>
                            )}
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

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Get In Touch</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                                <a href={`mailto:${contactEmail}`} className="text-primary font-black hover:underline">{contactEmail}</a>
                            </div>
                            {settings?.whatsapp_number && (
                                <div>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">WhatsApp</p>
                                    <p className="font-black text-slate-200">{settings.whatsapp_number}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} {brandName}. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <span>Powered by</span>
                        <a href="https://www.websyncdigital.com.ng" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline transition-all">Websyncdigital</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}