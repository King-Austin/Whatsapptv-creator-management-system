'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Advertise', href: '/advertise' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
                scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-100' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Tv className="w-5 h-5 text-white" />
                    </div>
                    <span className={cn(
                        "text-2xl font-bold tracking-tight transition-colors duration-300",
                        scrolled ? "text-slate-900" : "text-white"
                    )}>
                        Unizik<span className="text-primary ml-0.5">Talkative</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-semibold transition-all duration-200 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                                scrolled ? "text-slate-600" : "text-slate-200"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/advertise"
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                            scrolled
                                ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
                                : "bg-white text-primary hover:bg-slate-50"
                        )}
                    >
                        Advertise
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn("md:hidden p-2 rounded-lg", scrolled ? "text-slate-900" : "text-white")}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 overflow-hidden md:hidden shadow-2xl"
                    >
                        <div className="flex flex-col space-y-4 p-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl font-bold text-slate-800 hover:text-primary transition-colors border-b border-slate-50 pb-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/advertise"
                                className="bg-primary text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20"
                                onClick={() => setIsOpen(false)}
                            >
                                Advertise With Us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

