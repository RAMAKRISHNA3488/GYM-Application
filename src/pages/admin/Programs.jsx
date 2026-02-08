import React from 'react';
import { Calendar, Clock, Users, Dumbbell } from 'lucide-react';

const AdminPrograms = () => {
    const programs = [
        { id: 1, name: 'Beginner Fitness', duration: '4 weeks', members: 45, trainer: 'Mike Johnson' },
        { id: 2, name: 'Weight Loss Bootcamp', duration: '8 weeks', members: 32, trainer: 'Sarah Williams' },
        { id: 3, name: 'Muscle Building', duration: '12 weeks', members: 28, trainer: 'David Chen' },
        { id: 4, name: 'HIIT Training', duration: '6 weeks', members: 38, trainer: 'Mike Johnson' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Training Programs</h1>
                <button className="bg-gym-orange hover:bg-gym-orangeHover text-white px-6 py-2 rounded-lg font-bold transition-colors">
                    Create Program
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program) => (
                    <div key={program.id} className="glass-card p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{program.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Clock size={16} />
                                        {program.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users size={16} />
                                        {program.members} members
                                    </span>
                                </div>
                            </div>
                            <Dumbbell className="text-gym-orange" size={32} />
                        </div>
                        <div className="text-sm text-gray-400 mb-4">
                            Trainer: <span className="text-white">{program.trainer}</span>
                        </div>
                        <button className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPrograms;
