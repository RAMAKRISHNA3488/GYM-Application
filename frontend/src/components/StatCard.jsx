import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => {
    const colorClasses = {
        blue: 'bg-blue-500/20 text-blue-500',
        green: 'bg-green-500/20 text-green-500',
        orange: 'bg-gym-orange/20 text-gym-orange',
        purple: 'bg-purple-500/20 text-purple-500',
        red: 'bg-red-500/20 text-red-500'
    };

    const colorClass = colorClasses[color] || 'bg-gray-500/20 text-gray-400';

    return (
        <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon size={20} />
                </div>
            </div>
            <div className="flex items-end gap-2">
                <h2 className="text-3xl font-bold text-white">{value}</h2>
                <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'} mb-1`}>
                    {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    {change}%
                </span>
            </div>
        </div>
    );
};

export default StatCard;
