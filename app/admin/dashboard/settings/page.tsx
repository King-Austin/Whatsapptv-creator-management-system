'use client';

import React, { useEffect, useState } from 'react';
import { 
    User, 
    Globe, 
    Save,
    CheckCircle2,
    Loader2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        brand_name: 'Uniziktalkertive TV',
        contact_email: 'admin@uniziktalkertive.tv',
        instagram_url: '',
        twitter_url: '',
        facebook_url: '',
        whatsapp_number: ''
    });

    const supabase = createClient();

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        setLoading(true);
        const { data, error } = await supabase
            .from('gh_site_settings')
            .select('*')
            .single();

        if (data) {
            setSettings(data);
        }
        setLoading(false);
    }

    async function handleSave() {
        setSaving(true);
        const { error } = await supabase
            .from('gh_site_settings')
            .upsert({ id: 1, ...settings });

        if (error) {
            alert('Error saving settings: ' + error.message);
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
        setSaving(false);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-black text-slate-900">Settings</h1>
                <p className="text-slate-500 font-medium">Manage your platform configuration and account preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Nav - Simplified to only General */}
                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all bg-white text-slate-900 shadow-sm border border-slate-100">
                        <User className="w-5 h-5" />
                        <span className="text-sm">General</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 p-8 space-y-8">
                        {/* Site Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Site Configuration</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Brand Name</label>
                                    <input 
                                        type="text" 
                                        value={settings.brand_name}
                                        onChange={(e) => setSettings({ ...settings, brand_name: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Contact Email</label>
                                    <input 
                                        type="email" 
                                        value={settings.contact_email}
                                        onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Social Presence</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Instagram URL</label>
                                    <input 
                                        type="text" 
                                        value={settings.instagram_url}
                                        onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                                        placeholder="https://instagram.com/..." 
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Twitter/X URL</label>
                                    <input 
                                        type="text" 
                                        value={settings.twitter_url}
                                        onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                                        placeholder="https://x.com/..." 
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Facebook URL</label>
                                    <input 
                                        type="text" 
                                        value={settings.facebook_url}
                                        onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                                        placeholder="https://facebook.com/..." 
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Number</label>
                                    <input 
                                        type="text" 
                                        value={settings.whatsapp_number}
                                        onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                                        placeholder="+234..." 
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Last updated: Syncing live</p>
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-70"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (saved ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Save className="w-5 h-5" />)}
                                {saving ? 'Saving...' : (saved ? 'Changes Saved!' : 'Save Changes')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}