import React from 'react';
import StatCard from '../../components/StatCard';
import { Activity, Flame, Scale, Clock } from 'lucide-react';

const UserOverview = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Hello, Member!</h1>
                <p className="text-gray-400">Here is your daily activity summary.</p>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Workouts"
                    value="12"
                    change="2"
                    isPositive={true}
                    icon={Activity}
                    color="blue"
                />
                <StatCard
                    title="Calories Burned"
                    value="4,500"
                    change="15"
                    isPositive={true}
                    icon={Flame}
                    color="red"
                />
                <StatCard
                    title="Current Weight"
                    value="78 kg"
                    change="1.2"
                    isPositive={false}
                    icon={Scale}
                    color="green"
                />
                <StatCard
                    title="Attendance"
                    value="18/30"
                    change="Days"
                    isPositive={true}
                    icon={Clock}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Workout */}
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Today's Workout</h2>
                    <div className="bg-white/5 rounded-lg p-4 border-l-4 border-gym-orange">
                        <h3 className="text-lg font-bold text-white">Upper Body Power</h3>
                        <p className="text-gray-400 text-sm">45 mins • Strength Training</p>
                        <div className="mt-4 flex gap-2">
                            <span className="px-2 py-1 bg-gray-700 rounded text-xs text-white">Chest Press</span>
                            <span className="px-2 py-1 bg-gray-700 rounded text-xs text-white">Rows</span>
                            <span className="px-2 py-1 bg-gray-700 rounded text-xs text-white">Pullups</span>
                        </div>
                    </div>
                </div>

                {/* Diet Plan Summary */}
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Nutrition</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <span className="text-gray-300">Breakfast</span>
                            <span className="text-white font-semibold">Oatmeal & Eggs</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <span className="text-gray-300">Lunch</span>
                            <span className="text-white font-semibold">Grilled Chicken Salad</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <span className="text-gray-300">Dinner</span>
                            <span className="text-white font-semibold">Salmon & Veggies</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOverview;
