'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/sections/Contact';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />
            <ContactSection />
            <Footer />
        </main>
    );
}
