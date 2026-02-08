import React, { useState, useEffect } from 'react';
import { workoutAssignmentApi } from '../../services/api';
import { Dumbbell, Play, CheckCircle, Calendar, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const MyWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('today');

    useEffect(() => {
        fetchWorkouts();
    }, [activeTab]);

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            const res = activeTab === 'today'
                ? await workoutAssignmentApi.getTodayWorkouts()
                : await workoutAssignmentApi.getMyWorkouts();
            setWorkouts(res.data);
        } catch (error) {
            console.error("Error fetching workouts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartWorkout = async (workoutId) => {
        try {
            await workoutAssignmentApi.startWorkout(workoutId);
            const details = await workoutAssignmentApi.getWorkoutDetails(workoutId);
            setSelectedWorkout(details.data);
        } catch (error) {
            console.error("Error starting workout", error);
            alert("Failed to start workout");
        }
    };

    const handleCompleteExercise = async (exerciseCompletionId) => {
        try {
            await workoutAssignmentApi.completeExercise(exerciseCompletionId, { sets: 3, reps: 10 });
            // Refresh workout details
            const details = await workoutAssignmentApi.getWorkoutDetails(selectedWorkout.id);
            setSelectedWorkout(details.data);
        } catch (error) {
            console.error("Error completing exercise", error);
        }
    };

    const handleCompleteWorkout = async () => {
        try {
            await workoutAssignmentApi.completeWorkout(selectedWorkout.id, "Great workout!");
            alert("Workout completed! 🎉");
            setSelectedWorkout(null);
            fetchWorkouts();
        } catch (error) {
            console.error("Error completing workout", error);
            alert("Failed to complete workout");
        }
    };

    const formatDate = (dateArray) => {
        if (!dateArray) return '';
        if (Array.isArray(dateArray)) {
            const [year, month, day] = dateArray;
            return new Date(year, month - 1, day).toLocaleDateString();
        }
        return new Date(dateArray).toLocaleDateString();
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">My Workouts</h1>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
                <button
                    onClick={() => setActiveTab('today')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'today' ? 'text-gym-orange border-b-2 border-gym-orange' : 'text-gray-400 hover:text-white'}`}
                >
                    Today's Workouts
                </button>
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'all' ? 'text-gym-orange border-b-2 border-gym-orange' : 'text-gray-400 hover:text-white'}`}
                >
                    All Workouts
                </button>
            </div>

            {/* Workout Details View */}
            {selectedWorkout ? (
                <div className="glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{selectedWorkout.workoutRoutine.name}</h2>
                            <p className="text-gray-400">{selectedWorkout.workoutRoutine.description}</p>
                        </div>
                        <button
                            onClick={() => setSelectedWorkout(null)}
                            className="text-gray-400 hover:text-white"
                        >
                            Close
                        </button>
                    </div>

                    {selectedWorkout.adminNotes && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                            <p className="text-blue-400 text-sm"><strong>Coach Notes:</strong> {selectedWorkout.adminNotes}</p>
                        </div>
                    )}

                    {/* Exercises List */}
                    <div className="space-y-3 mb-6">
                        {selectedWorkout.exerciseCompletions && selectedWorkout.exerciseCompletions.map((completion, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-4 rounded-lg border-2 transition-all ${completion.isCompleted
                                        ? 'bg-green-500/10 border-green-500/50'
                                        : 'bg-white/5 border-white/10 hover:border-gym-orange/50'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-white font-bold">{completion.exercise.name}</h3>
                                            {completion.isCompleted && (
                                                <CheckCircle className="text-green-500" size={20} />
                                            )}
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            {completion.exercise.sets} sets × {completion.exercise.reps} reps
                                            {completion.exercise.targetMuscleGroup && ` • ${completion.exercise.targetMuscleGroup}`}
                                        </p>
                                    </div>
                                    {!completion.isCompleted && (
                                        <button
                                            onClick={() => handleCompleteExercise(completion.id)}
                                            className="bg-gym-orange hover:bg-gym-orangeHover text-white px-4 py-2 rounded-lg font-bold transition-colors"
                                        >
                                            Complete
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Complete Workout Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleCompleteWorkout}
                            disabled={selectedWorkout.exerciseCompletions?.some(e => !e.isCompleted)}
                            className={`px-6 py-3 rounded-lg font-bold transition-colors ${selectedWorkout.exerciseCompletions?.some(e => !e.isCompleted)
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                        >
                            <CheckCircle className="inline mr-2" size={20} />
                            Finish Workout
                        </button>
                    </div>
                </div>
            ) : (
                /* Workout List */
                <div className="grid grid-cols-1 gap-4">
                    {workouts.length === 0 ? (
                        <div className="glass-card p-12 text-center">
                            <Dumbbell className="mx-auto text-gray-400 mb-4" size={48} />
                            <p className="text-gray-400">No workouts assigned {activeTab === 'today' ? 'for today' : 'yet'}</p>
                        </div>
                    ) : (
                        workouts.map((workout) => (
                            <motion.div
                                key={workout.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`glass-card p-6 ${workout.isCompleted ? 'opacity-60' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white">{workout.workoutRoutine.name}</h3>
                                            {workout.isCompleted && (
                                                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                                                    Completed
                                                </span>
                                            )}
                                            {workout.isStarted && !workout.isCompleted && (
                                                <span className="bg-gym-orange text-white px-2 py-1 rounded text-xs font-bold">
                                                    In Progress
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 mb-3">{workout.workoutRoutine.description}</p>
                                        <div className="flex gap-4 text-sm">
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Calendar size={16} />
                                                <span>{formatDate(workout.scheduledDate)}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Dumbbell size={16} />
                                                <span>{workout.workoutRoutine.exercises?.length || 0} exercises</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <TrendingUp size={16} />
                                                <span>{workout.workoutRoutine.difficultyLevel}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {!workout.isCompleted && (
                                        <button
                                            onClick={() => handleStartWorkout(workout.id)}
                                            className="bg-gym-orange hover:bg-gym-orangeHover text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
                                        >
                                            <Play size={18} fill="currentColor" />
                                            {workout.isStarted ? 'Continue' : 'Start'}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MyWorkouts;
