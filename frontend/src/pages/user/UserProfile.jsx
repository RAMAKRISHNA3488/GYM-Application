import React, { useState, useEffect } from 'react';
import { User, Target, Scale, Ruler, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { fitnessProfileApi } from '../../services/api';
import { motion } from 'framer-motion';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        currentWeight: '',
        targetWeight: '',
        height: '',
        age: '',
        gender: '',
        fitnessGoal: 'GENERAL'
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [completion, setCompletion] = useState(0);

    const loadProfile = async () => {
        try {
            // First get user details (name/email) from localStorage as they might not be in profile response if it's pure fitness profile
            // But usually profile response should include User info or we fetch user info separately.
            // My backend FitnessProfile entity has User relation. AND the controller returns FitnessProfile.
            // Spring Boot by default serializes nested objects. So profile.user.name should be available.

            const response = await fitnessProfileApi.getMyProfile();
            const data = response.data;

            setProfile({
                name: data.user?.name || localStorage.getItem('userName') || '',
                email: data.user?.email || '',
                currentWeight: data.currentWeight || '',
                targetWeight: data.targetWeight || '',
                height: data.height || '',
                age: data.age || '',
                gender: data.gender || '',
                fitnessGoal: data.fitnessGoal || 'GENERAL'
            });

            calculateCompletion(data);
        } catch (error) {
            console.error("Failed to load profile", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const calculateCompletion = (data) => {
        const fields = ['currentWeight', 'targetWeight', 'height', 'age', 'gender', 'fitnessGoal'];
        let filled = 0;
        fields.forEach(field => {
            if (data[field]) filled++;
        });
        // Assuming Name/Email are always there.
        // Total fields to track: 6.
        setCompletion(Math.round((filled / 6) * 100));
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await fitnessProfileApi.updateProfile({
                currentWeight: profile.currentWeight,
                targetWeight: profile.targetWeight,
                height: profile.height,
                age: profile.age,
                gender: profile.gender,
                fitnessGoal: profile.fitnessGoal
            });
            setIsEditing(false);
            loadProfile(); // Reload to update completion
            alert("Profile Updated Successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        }
    };

    if (loading) return <div className="text-white">Loading Profile...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">My Profile</h1>

                {/* Completion Badge */}
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase font-bold">Profile Strength</p>
                        <p className={`font-bold ${completion === 100 ? 'text-green-500' : 'text-gym-orange'}`}>{completion}%</p>
                    </div>
                    <div className="w-10 h-10 relative flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="20" cy="20" r="16" stroke="gray" strokeWidth="3" fill="transparent" className="opacity-20" />
                            <circle cx="20" cy="20" r="16" stroke={completion === 100 ? '#22c55e' : '#ff4d00'} strokeWidth="3" fill="transparent" strokeDasharray="100" strokeDashoffset={100 - completion} />
                        </svg>
                    </div>
                </div>
            </div>

            {completion < 100 && !isEditing && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <AlertCircle className="text-blue-500" />
                        <div>
                            <p className="text-blue-200 font-bold">Complete your profile</p>
                            <p className="text-blue-200/60 text-sm">Add your details to get personalized AI recommendations.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                    >
                        Complete Now
                    </button>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="md:col-span-1 glass-card p-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-700 mb-4 overflow-hidden border-2 border-gym-orange relative group">
                        <div className="w-full h-full flex items-center justify-center bg-gym-orange text-white text-3xl font-bold">
                            {profile.name.charAt(0)}
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1">{profile.name}</h2>
                    <p className="text-gray-400 text-sm mb-4">{profile.email}</p>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </div>

                {/* Details Section */}
                <div className="md:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="text-gym-orange" /> Physical Stats
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={profile.age}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Years"
                                className="w-full bg-gym-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gym-orange disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Gender</label>
                            <select
                                name="gender"
                                value={profile.gender}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-gym-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gym-orange disabled:opacity-50 appearance-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Height (cm)</label>
                            <div className="relative">
                                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="number"
                                    name="height"
                                    value={profile.height}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-gym-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gym-orange disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Current Weight (kg)</label>
                            <div className="relative">
                                <Scale className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="number"
                                    name="currentWeight"
                                    value={profile.currentWeight}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-gym-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gym-orange disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Target Weight (kg)</label>
                            <div className="relative">
                                <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="number"
                                    name="targetWeight"
                                    value={profile.targetWeight}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-gym-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gym-orange disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Primary Goal</label>
                            <select
                                name="fitnessGoal"
                                value={profile.fitnessGoal}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-gym-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gym-orange disabled:opacity-50 appearance-none"
                            >
                                <option value="GENERAL">General Fitness</option>
                                <option value="MUSCLE_GAIN">Muscle Gain</option>
                                <option value="WEIGHT_LOSS">Weight Loss</option>
                                <option value="ENDURANCE">Endurance</option>
                            </select>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleSave}
                                className="bg-gym-orange hover:bg-gym-orangeHover text-white px-8 py-3 rounded-lg font-bold shadow-neon transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
