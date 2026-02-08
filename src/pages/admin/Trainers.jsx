import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { Search, Plus, Edit, Trash2, Dumbbell } from 'lucide-react';

const AdminTrainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            setLoading(true);
            // For now, using mock data since we don't have a trainers endpoint
            // Replace with: const res = await adminApi.getAllTrainers();
            setTrainers([
                { id: 1, name: 'Mike Johnson', email: 'mike@gym.com', specialty: 'Strength Training', clients: 15 },
                { id: 2, name: 'Sarah Williams', email: 'sarah@gym.com', specialty: 'Yoga & Flexibility', clients: 22 },
                { id: 3, name: 'David Chen', email: 'david@gym.com', specialty: 'CrossFit', clients: 18 },
            ]);
        } catch (error) {
            console.error("Error fetching trainers", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTrainers = trainers.filter(trainer =>
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Trainers</h1>
                <button className="bg-gym-orange hover:bg-gym-orangeHover text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2">
                    <Plus size={20} />
                    Add Trainer
                </button>
            </div>

            {/* Search */}
            <div className="glass-card p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search trainers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gym-black border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gym-orange"
                    />
                </div>
            </div>

            {/* Trainers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrainers.map((trainer) => (
                    <div key={trainer.id} className="glass-card p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gym-orange flex items-center justify-center text-white text-xl font-bold">
                                    {trainer.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{trainer.name}</h3>
                                    <p className="text-gray-400 text-sm">{trainer.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Dumbbell size={16} />
                                <span className="text-sm">{trainer.specialty}</span>
                            </div>
                            <div className="text-sm text-gray-400">
                                <span className="text-gym-orange font-bold">{trainer.clients}</span> Active Clients
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                                <Edit size={16} />
                                Edit
                            </button>
                            <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTrainers.length === 0 && (
                <div className="glass-card p-12 text-center">
                    <Dumbbell className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-400">No trainers found</p>
                </div>
            )}
        </div>
    );
};

export default AdminTrainers;
