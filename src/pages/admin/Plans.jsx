import React from 'react';
import { CreditCard, Users, TrendingUp } from 'lucide-react';

const AdminPlans = () => {
    const plans = [
        { id: 1, name: 'Basic', price: '$29', duration: 'month', members: 120, features: ['Gym Access', 'Locker Room', 'Group Classes'] },
        { id: 2, name: 'Premium', price: '$59', duration: 'month', members: 85, features: ['All Basic Features', 'Personal Trainer', 'Nutrition Plan', 'Sauna & Steam'] },
        { id: 3, name: 'Elite', price: '$99', duration: 'month', members: 45, features: ['All Premium Features', 'Priority Booking', '24/7 Access', 'Massage Therapy'] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Membership Plans</h1>
                <button className="bg-gym-orange hover:bg-gym-orangeHover text-white px-6 py-2 rounded-lg font-bold transition-colors">
                    Create Plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.id} className="glass-card p-6 hover:border-gym-orange border-2 border-transparent transition-all">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-gym-orange">{plan.price}</span>
                                <span className="text-gray-400">/{plan.duration}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-6 text-gray-400">
                            <Users size={18} />
                            <span className="text-white font-bold">{plan.members}</span> active members
                        </div>

                        <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-300">
                                    <TrendingUp size={16} className="text-gym-orange" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full bg-gym-orange hover:bg-gym-orangeHover text-white py-2 rounded-lg font-bold transition-colors">
                            Edit Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPlans;
