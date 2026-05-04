'use client';

import React, { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    Loader2,
    Trash2,
    ChevronDown,
    ChevronUp,
    Mail,
    CreditCard,
    Layout
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdManagement() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
    const supabase = createClient();

    useEffect(() => {
        fetchRequests();
    }, []);

    async function fetchRequests() {
        setLoading(true);
        const { data, error } = await supabase
            .from('gh_ad_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching ad requests:', error);
        } else {
            setRequests(data || []);
        }
        setLoading(false);
    }

    async function updateStatus(id: string, status: string, e: React.MouseEvent) {
        e.stopPropagation();
        const { error } = await supabase
            .from('gh_ad_requests')
            .update({ status })
            .eq('id', id);

        if (error) {
            alert('Error updating status: ' + error.message);
        } else {
            setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
        }
    }

    async function deleteRequest(id: string, e: React.MouseEvent) {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this request permanently?')) return;

        const { error } = await supabase
            .from('gh_ad_requests')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting request: ' + error.message);
        } else {
            setRequests(requests.filter(r => r.id !== id));
        }
    }

    const toggleExpand = (id: string) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filteredRequests = requests.filter(req => 
        (req.brand_name && req.brand_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (req.contact_email && req.contact_email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const stats = {
        pending: requests.filter(r => r.status?.toLowerCase() === 'pending').length,
        approved: requests.filter(r => r.status?.toLowerCase() === 'approved').length,
        rejected: requests.filter(r => r.status?.toLowerCase() === 'rejected').length,
    };

    return (
        <div className="space-y-6 sm:space-y-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Ad Requests</h1>
                    <p className="text-slate-500 font-medium text-sm sm:text-base">Review and manage incoming advertising inquiries.</p>
                </div>
                <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-6 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-slate-50 transition-all shadow-sm">
                    Export Report
                </button>
            </div>

            {/* Stats Summary - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <StatCard icon={<Clock />} color="blue" label="Pending" value={stats.pending} />
                <StatCard icon={<CheckCircle2 />} color="green" label="Approved" value={stats.approved} />
                <StatCard icon={<XCircle />} color="red" label="Rejected" value={stats.rejected} />
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-soft border border-slate-100 overflow-hidden">
                <div className="p-4 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search requests..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 min-w-full">
                        {/* Mobile & Desktop List */}
                        {filteredRequests.map((req) => (
                            <div key={req.id} className="group">
                                <div 
                                    onClick={() => toggleExpand(req.id)}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer select-none"
                                >
                                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 border border-slate-200">
                                            {req.brand_name?.charAt(0) || '?'}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-slate-900 truncate">{req.brand_name}</p>
                                            <p className="text-[11px] font-medium text-slate-400 truncate">{req.contact_email}</p>
                                        </div>
                                    </div>

                                    {/* Desktop View Columns */}
                                    <div className="hidden lg:flex flex-1 items-center justify-around px-4">
                                        <div className="text-center w-32">
                                            <span className="bg-slate-100 text-slate-600 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border border-slate-200">
                                                {req.plan}
                                            </span>
                                        </div>
                                        <div className="text-center font-black text-slate-900 w-24">
                                            {req.budget}
                                        </div>
                                        <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest w-32">
                                            {new Date(req.created_at).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 mt-2 sm:mt-0">
                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border
                                            ${(req.status === 'approved' || req.status === 'Approved') ? 'bg-green-50 text-green-600 border-green-100' :
                                                (req.status === 'pending' || req.status === 'Pending') ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    'bg-red-50 text-red-600 border-red-100'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full 
                                                ${(req.status === 'approved' || req.status === 'Approved') ? 'bg-green-500' :
                                                    (req.status === 'pending' || req.status === 'Pending') ? 'bg-orange-500' :
                                                        'bg-red-500'}`} />
                                            {req.status}
                                        </span>
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <button 
                                                onClick={(e) => updateStatus(req.id, 'approved', e)}
                                                className="p-2 sm:p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                                            >
                                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                            <button 
                                                onClick={(e) => updateStatus(req.id, 'rejected', e)}
                                                className="p-2 sm:p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />
                                            <button 
                                                onClick={(e) => deleteRequest(req.id, e)}
                                                className="p-2 sm:p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                            <div className="text-slate-300 ml-1">
                                                {expandedRows[req.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedRows[req.id] && (
                                    <div className="bg-slate-50/80 p-6 sm:p-8 border-t border-slate-100 animate-in slide-in-from-top duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <Mail className="w-4 h-4" />
                                                    <h6 className="text-[10px] font-black uppercase tracking-widest">Contact Info</h6>
                                                </div>
                                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                    <p className="text-sm font-bold text-slate-900">{req.contact_email}</p>
                                                    <p className="text-[10px] font-medium text-slate-400 mt-1">Primary Email Address</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <CreditCard className="w-4 h-4" />
                                                    <h6 className="text-[10px] font-black uppercase tracking-widest">Pricing & Plan</h6>
                                                </div>
                                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                    <p className="text-sm font-black text-slate-900">{req.budget}</p>
                                                    <p className="text-[10px] font-bold text-primary uppercase mt-1 tracking-wider">{req.plan}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <Layout className="w-4 h-4" />
                                                    <h6 className="text-[10px] font-black uppercase tracking-widest">Submission Date</h6>
                                                </div>
                                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                    <p className="text-sm font-bold text-slate-900">
                                                        {new Date(req.created_at).toLocaleDateString('en-US', { 
                                                            weekday: 'long', 
                                                            year: 'numeric', 
                                                            month: 'long', 
                                                            day: 'numeric' 
                                                        })}
                                                    </p>
                                                    <p className="text-[10px] font-medium text-slate-400 mt-1">GMT+1 Standard Time</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {filteredRequests.length === 0 && (
                            <div className="text-center py-20 bg-slate-50/30">
                                <p className="text-slate-400 font-bold text-lg">No advertising requests yet.</p>
                                <p className="text-slate-300 text-sm mt-2">Check back later for new business inquiries.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ icon, color, label, value }: any) {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-500',
        green: 'bg-green-50 text-green-500',
        red: 'bg-red-50 text-red-500'
    };

    return (
        <div className="bg-white p-5 sm:p-6 rounded-[1.5rem] sm:rounded-3xl border border-slate-100 shadow-soft">
            <div className="flex items-center gap-4 mb-4">
                <div className={`${colors[color]} p-2.5 sm:p-3 rounded-xl`}>
                    {React.cloneElement(icon, { className: 'w-5 h-5 sm:w-6 sm:h-6' })}
                </div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">{value} {value === 1 ? 'Request' : 'Requests'}</h4>
        </div>
    );
}