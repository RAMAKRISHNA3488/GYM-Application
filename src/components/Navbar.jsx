import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onLoginClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        const name = localStorage.getItem('userName');
        if (token) {
            setUser({ name, role });
        } else {
            setUser(null);
        }
    }, [onLoginClick]); // Re-run if login click handler changes, though mostly on mount/refresh

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        setIsOpen(false);
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Programs', path: '/#programs' },
        { name: 'Why Us', path: '/#why-us' },
        { name: 'Plans', path: '/#plans' },
        { name: 'Testimonials', path: '/#testimonials' },
    ];

    const dashboardPath = user?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';

    return (
        <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-gym-black/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gym-orange rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">G</span>
                        </div>
                        <span className="text-2xl font-bold font-heading tracking-wide text-white group-hover:text-gym-orange transition-colors">
                            FITNESS<span className="text-gym-orange">X</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="relative text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gym-orange transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    to={dashboardPath}
                                    className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2"
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={22} />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="bg-gym-orange hover:bg-gym-orangeHover text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-neon flex items-center gap-2"
                            >
                                <User size={18} />
                                LOGIN
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gym-dark border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-white/10 mt-2">
                                {user ? (
                                    <div className="space-y-2">
                                        <div className="px-3 text-sm text-gray-500">
                                            Signed in as <span className="text-white font-bold">{user.name}</span>
                                        </div>
                                        <Link
                                            to={dashboardPath}
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-white/10"
                                        >
                                            <div className="flex items-center gap-2">
                                                <LayoutDashboard size={18} /> Dashboard
                                            </div>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-500/10 flex items-center gap-2"
                                        >
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            onLoginClick();
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-center bg-gym-orange text-white px-4 py-3 rounded-md font-bold"
                                    >
                                        LOGIN
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
