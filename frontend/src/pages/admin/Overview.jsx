import React from 'react';
import StatCard from '../../components/StatCard';
import { Users, DollarSign, Activity, Calendar } from 'lucide-react';

const Overview = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Members"
                    value="1,245"
                    change="12"
                    isPositive={true}
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="Monthly Revenue"
                    value="$45,200"
                    change="8.5"
                    isPositive={true}
                    icon={DollarSign}
                    color="green"
                />
                <StatCard
                    title="Active Now"
                    value="84"
                    change="5"
                    isPositive={false}
                    icon={Activity}
                    color="orange"
                />
                <StatCard
                    title="New Registrations"
                    value="45"
                    change="22"
                    isPositive={true}
                    icon={Calendar}
                    color="purple"
                />
            </div>

            {/* Recent Activity Table */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Registrations</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 border-b border-white/10">
                                <th className="py-3 px-2 font-medium text-sm uppercase">Member</th>
                                <th className="py-3 px-2 font-medium text-sm uppercase">Plan</th>
                                <th className="py-3 px-2 font-medium text-sm uppercase">Date</th>
                                <th className="py-3 px-2 font-medium text-sm uppercase">Status</th>
                                <th className="py-3 px-2 font-medium text-sm uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <tr key={item} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-2 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                                        <span className="font-medium text-white">John Doe</span>
                                    </td>
                                    <td className="py-4 px-2">Premium Plan</td>
                                    <td className="py-4 px-2">Oct 24, 2023</td>
                                    <td className="py-4 px-2">
                                        <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs font-semibold">Active</span>
                                    </td>
                                    <td className="py-4 px-2">
                                        <button className="text-gym-orange hover:text-white transition-colors text-sm">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Overview;
