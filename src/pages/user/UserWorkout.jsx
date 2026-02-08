import React, { useEffect, useState } from 'react';
import { featuresApi, assignmentApi } from '../../services/api';
import { Dumbbell, Play, Clock, BarChart, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const UserWorkout = () => {
    const [activeTab, setActiveTab] = useState('schedule');
    const [workout, setWorkout] = useState(null);
    const [dailyAssignment, setDailyAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === 'ai') {
                    const response = await featuresApi.getAiWorkout();
                    setWorkout(response.data);
                } else {
                    // Fetch today's assignment
                    const date = new Date().toISOString().split('T')[0];
                    const response = await assignmentApi.getUserDaily(date);
                    // API returns a list, take the first one
                    setDailyAssignment(response.data.length > 0 ? response.data[0] : null);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [activeTab]);

    const handleComplete = async () => {
        if (!dailyAssignment) return;
        setCompleting(true);
        try {
            await assignmentApi.completeWorkout(dailyAssignment.id, "Completed by user");
            // Refresh
            const date = new Date().toISOString().split('T')[0];
            const response = await assignmentApi.getUserDaily(date);
            setDailyAssignment(response.data.length > 0 ? response.data[0] : null);
        } catch (error) {
            console.error(error);
        } finally {
            setCompleting(false);
        }
    };

    const renderWorkoutContent = (data, isAssignment = false) => {
        // If assignment, data is the Assignment object, containing workoutRoutine
        const routine = isAssignment ? data.workoutRoutine : data;
        const notes = isAssignment ? data.adminNotes : null;
        const isCompleted = isAssignment ? data.completed : false;

        if (!routine) return <div className="text-gray-400">No workout plan found.</div>;

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isAssignment ? 'bg-green-500/20 text-green-500' : 'bg-gym-orange/20 text-gym-orange'}`}>
                                {isAssignment ? 'Assigned Plan' : 'AI Generated'}
                            </span>
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs font-bold uppercase tracking-wider">
                                {routine.goalType || 'General'}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">{routine.name}</h1>
                        <p className="text-gray-400 max-w-2xl">{routine.description}</p>
                        {notes && (
                            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200 text-sm">
                                <strong>Trainer Note:</strong> {notes}
                            </div>
                        )}
                    </div>

                    {isAssignment ? (
                        <button
                            onClick={handleComplete}
                            disabled={isCompleted || completing}
                            className={`px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 ${isCompleted
                                    ? 'bg-green-500 text-white cursor-default'
                                    : 'bg-gym-orange hover:bg-gym-orangeHover text-white shadow-neon'
                                }`}
                        >
                            {isCompleted ? <CheckCircle size={20} /> : <Play size={20} />}
                            {isCompleted ? 'Completed' : 'Mark Complete'}
                        </button>
                    ) : (
                        <button className="bg-white text-gym-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                            <Play size={20} className="fill-current" />
                            Start Session
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Exercise List */}
                    <div className="lg:col-span-2 space-y-4">
                        {routine.exercises?.map((exercise, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className="glass-card p-4 flex items-center justify-between group hover:border-gym-orange/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-gym-orange transition-all">
                                        <Dumbbell size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{exercise.name}</h3>
                                        <p className="text-gray-500 text-sm">{exercise.targetMuscleGroup}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 uppercase">Sets</p>
                                        <p className="text-white font-bold text-xl">{exercise.sets}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 uppercase">Reps</p>
                                        <p className="text-white font-bold text-xl">{exercise.reps}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats / Info */}
                    <div className="space-y-6">
                        <div className="glass-card p-6">
                            <h3 className="text-white font-bold mb-4">Workout Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-gray-400 flex items-center gap-2"><Clock size={16} /> Est. Duration</span>
                                    <span className="text-white font-mono">60 min</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-gray-400 flex items-center gap-2"><BarChart size={16} /> Difficulty</span>
                                    <span className="text-yellow-500 font-bold">{routine.difficultyLevel}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2">
                                    <span className="text-gray-400 flex items-center gap-2"><Dumbbell size={16} /> Total Volume</span>
                                    <span className="text-white font-mono">-</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gym-orange to-red-600 rounded-xl p-6 text-white shadow-neon">
                            <h3 className="font-bold text-xl mb-2">Pro Tip</h3>
                            <p className="text-white/90 text-sm">
                                Keep consistent form and track your weights to ensure progressive overload.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('schedule')}
                    className={`px-4 py-2 font-bold transition-all ${activeTab === 'schedule' ? 'text-gym-orange border-b-2 border-gym-orange' : 'text-gray-400 hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        My Schedule
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('ai')}
                    className={`px-4 py-2 font-bold transition-all ${activeTab === 'ai' ? 'text-gym-orange border-b-2 border-gym-orange' : 'text-gray-400 hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Play size={18} />
                        AI Generator
                    </div>
                </button>
            </div>

            {loading ? (
                <div className="text-white">Loading...</div>
            ) : (
                <>
                    {activeTab === 'schedule' && (
                        dailyAssignment ? renderWorkoutContent(dailyAssignment, true) : (
                            <div className="text-center py-12 glass-card">
                                <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No Workout Assigned for Today</h3>
                                <p className="text-gray-400">Ask your trainer to assign a workout or switch to the AI Generator tab.</p>
                            </div>
                        )
                    )}
                    {activeTab === 'ai' && renderWorkoutContent(workout, false)}
                </>
            )}
        </div>
    );
};

export default UserWorkout;
