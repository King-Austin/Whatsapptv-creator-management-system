'use client';

import React, { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    Zap,
    Users,
    MessageSquare,
    DollarSign,
    Loader2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdManagement() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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

    async function updateStatus(id: string, status: string) {
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

    const filteredRequests = requests.filter(req => 
        (req.brand_name && req.brand_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (req.contact_email && req.contact_email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const stats = {
        pending: requests.filter(r => r.status === 'pending' || r.status === 'Pending').length,
        approved: requests.filter(r => r.status === 'approved' || r.status === 'Approved').length,
        rejected: requests.filter(r => r.status === 'rejected' || r.status === 'Rejected').length,
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Ad Requests</h1>
                    <p className="text-slate-500 font-medium">Review and manage incoming advertising inquiries.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-6 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-slate-50 transition-all shadow-sm">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Summary for Ads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-50 text-blue-500 p-3 rounded-xl">
                            <Clock className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Pending</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">{stats.pending} Requests</h4>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-green-50 text-green-500 p-3 rounded-xl">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Approved</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">{stats.approved} Requests</h4>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-red-50 text-red-500 p-3 rounded-xl">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Rejected</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">{stats.rejected} Requests</h4>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[2.5rem] shadow-soft border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search requests..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter Status
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Brand / Contact</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Plan Details</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Budget</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date Received</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRequests.map((req) => (
                                    <tr key={req.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 border border-slate-200">
                                                    {req.brand_name?.charAt(0) || '?'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{req.brand_name}</p>
                                                    <p className="text-[11px] font-medium text-slate-400">{req.contact_email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border border-slate-200">
                                                {req.plan}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 font-black text-slate-900">
                                            {req.budget}
                                        </td>
                                        <td className="px-8 py-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                            {new Date(req.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg 
                                                ${(req.status === 'approved' || req.status === 'Approved') ? 'bg-green-100 text-green-600' :
                                                    (req.status === 'pending' || req.status === 'Pending') ? 'bg-orange-100 text-orange-600' :
                                                        'bg-red-100 text-red-600'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full 
                                                    ${(req.status === 'approved' || req.status === 'Approved') ? 'bg-green-500' :
                                                        (req.status === 'pending' || req.status === 'Pending') ? 'bg-orange-500' :
                                                            'bg-red-500'}`} />
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => updateStatus(req.id, 'approved')}
                                                    className="p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all" title="Approve"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus(req.id, 'rejected')}
                                                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Reject"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                                <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredRequests.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-slate-400 font-bold">No requests found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
