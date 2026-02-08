import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { authApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('user'); // For registration mainly
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER'
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let response;
            if (isLogin) {
                response = await authApi.login({
                    email: formData.email,
                    password: formData.password
                });
            } else {
                response = await authApi.register({
                    ...formData,
                    role: role.toUpperCase()
                });
            }

            const { token, role: userRole, name } = response.data;

            // Store auth data
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userName', name);

            onClose();

            // Redirect based on role
            if (userRole === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-gym-dark w-full max-w-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-white text-center mb-2">
                            {isLogin ? 'Welcome Back' : 'Join Us Today'}
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                            {isLogin ? 'Sign in to continue to your dashboard' : 'Start your fitness journey now'}
                        </p>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex bg-gym-black rounded-lg p-1 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setRole('user')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all ${role === 'user' ? 'bg-gym-gray text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <User size={16} /> User
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all ${role === 'admin' ? 'bg-gym-orange text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Shield size={16} /> Admin
                                </button>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full bg-gym-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gym-orange transition-colors"
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full bg-gym-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gym-orange transition-colors"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full bg-gym-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gym-orange transition-colors"
                                />
                            </div>

                            {isLogin && (
                                <div className="flex justify-end">
                                    <button type="button" className="text-sm text-gym-orange hover:text-white transition-colors">Forgot Password?</button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gym-orange hover:bg-gym-orangeHover text-white py-3 rounded-lg font-bold transition-all shadow-neon flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        {isLogin ? 'LOGIN' : 'REGISTER'}
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                    }}
                                    className="text-white hover:text-gym-orange font-semibold transition-colors underline"
                                >
                                    {isLogin ? 'Register' : 'Login'}
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Footer Decoration */}
                    <div className="h-1 bg-gradient-to-r from-gym-orange via-red-500 to-gym-orange"></div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LoginModal;
