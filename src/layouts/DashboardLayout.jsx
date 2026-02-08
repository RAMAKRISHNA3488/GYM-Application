import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, LayoutDashboard, Users, Dumbbell, Calendar, CreditCard, Bell, Settings, Star, LogOut, Clock, Play, Square } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { attendanceApi } from '../services/api';

const DashboardLayout = ({ children, role: propRole = 'admin' }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
    );
    const location = useLocation();
    const navigate = useNavigate();

    // Get user info from localStorage
    const userName = localStorage.getItem('userName') || 'User';
    const userRole = localStorage.getItem('userRole') || propRole.toUpperCase();

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    // Attendance Logic
    const [activeSession, setActiveSession] = useState(null);
    const [sessionTimer, setSessionTimer] = useState(0);

    useEffect(() => {
        if (userRole === 'USER') {
            checkAttendanceStatus();
        }
    }, [userRole]);

    // Timer effect
    useEffect(() => {
        let interval;
        if (activeSession && activeSession.checkInTime) {
            // Check if checkInTime is an array (Spring default) or string
            let startTime;
            if (Array.isArray(activeSession.checkInTime)) {
                // [2024, 2, 8, 12, 0, 0] -> Date(2024, 1, 8, 12, 0, 0) // Month is 0-indexed in JS
                const [y, m, d, h, min, s] = activeSession.checkInTime;
                startTime = new Date(y, m - 1, d, h, min, s).getTime();
            } else {
                startTime = new Date(activeSession.checkInTime).getTime();
            }

            if (!isNaN(startTime)) {
                interval = setInterval(() => {
                    const now = new Date().getTime();
                    const seconds = Math.floor((now - startTime) / 1000);
                    setSessionTimer(seconds > 0 ? seconds : 0);
                }, 1000);
            }
        } else {
            setSessionTimer(0);
        }
        return () => clearInterval(interval);
    }, [activeSession]);

    const checkAttendanceStatus = useCallback(async () => {
        try {
            const res = await attendanceApi.getStatus();
            setActiveSession(res.data);
        } catch (error) {
            console.error("Error fetching attendance status", error);
        }
    }, []);

    const handleCheckIn = useCallback(async () => {
        try {
            const res = await attendanceApi.checkIn();
            setActiveSession(res.data);
            alert("Checked In Successfully!");
        } catch (error) {
            console.error(error);
            alert(error.response?.data || "Failed to check in");
        }
    }, []);

    const handleCheckOut = useCallback(async () => {
        try {
            const res = await attendanceApi.checkOut();
            setActiveSession(null);
            const duration = res.data.sessionDurationMinutes;
            const hours = Math.floor(duration / 60);
            const mins = Math.floor(duration % 60);
            alert(`Checked Out! Session Duration: ${hours > 0 ? `${hours}h ` : ''}${mins}m`);
        } catch (error) {
            console.error(error);
            alert("Failed to check out");
        }
    }, []);

    const formatTimer = useCallback((seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? `${h}:` : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }, []);

    const adminLinks = useMemo(() => [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Members', path: '/admin/members', icon: Users },
        { name: 'Trainers', path: '/admin/trainers', icon: Dumbbell },
        { name: 'Programs', path: '/admin/programs', icon: Calendar },
        { name: 'Plans', path: '/admin/plans', icon: CreditCard },
        { name: 'Notifications', path: '/admin/notifications', icon: Bell },
        { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ], []);

    const userLinks = useMemo(() => [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'AI Workouts', path: '/dashboard/workouts', icon: Dumbbell },
        { name: 'Smart Diet', path: '/dashboard/diet', icon: Calendar },
        { name: 'Community', path: '/dashboard/community', icon: Users },
        { name: 'My Workouts', path: '/dashboard/my-workouts', icon: Dumbbell },
        { name: 'Attendance', path: '/dashboard/attendance', icon: Clock },
        { name: 'My Profile', path: '/dashboard/profile', icon: Users },
        { name: 'My Plans', path: '/dashboard/plans', icon: CreditCard },
    ], []);

    const links = userRole === 'ADMIN' ? adminLinks : userLinks;

    return (
        <div className="flex h-screen bg-gym-black overflow-hidden text-white">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    bg-gym-dark border-r border-white/10 transition-all duration-300 flex flex-col
                    fixed lg:relative z-50 h-full
                    ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-20 lg:translate-x-0'}
                `}
            >
                <div className="h-20 flex items-center justify-center border-b border-white/10">
                    <Link to={userRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} className="no-underline">
                        {isSidebarOpen ? (
                            <span className="text-2xl font-bold font-heading text-white">FITNESS<span className="text-gym-orange">X</span></span>
                        ) : (
                            <span className="text-2xl font-bold font-heading text-gym-orange">X</span>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar flex flex-col justify-between">
                    <ul className="space-y-2 px-3">
                        {links.map((link) => {
                            const LinkIcon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive
                                            ? 'bg-gym-orange text-white shadow-neon'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <LinkIcon size={20} />
                                        <span className={`font-medium ${!isSidebarOpen && 'lg:hidden'}`}>{link.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && 'lg:justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-gym-orange flex items-center justify-center font-bold text-white text-lg">
                            {userName.charAt(0)}
                        </div>
                        <div className={`overflow-hidden ${!isSidebarOpen && 'lg:hidden'}`}>
                            <p className="text-white text-sm font-semibold truncate">{userName}</p>
                            <p className="text-gray-400 text-xs truncate">{userRole}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 sm:h-20 bg-gym-dark/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-3 sm:px-6">
                    {/* Menu Button - Only visible on mobile/tablet */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-400 hover:text-white lg:hidden p-2 -ml-2"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Logo on Mobile - Hidden on Desktop */}
                    <div className="lg:hidden">
                        <span className="text-xl font-bold font-heading text-white">
                            FITNESS<span className="text-gym-orange">X</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Attendance Toggle */}
                        {userRole === 'USER' && (
                            <div className="flex items-center">
                                {activeSession ? (
                                    <button
                                        onClick={handleCheckOut}
                                        className="flex items-center gap-1.5 sm:gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border border-red-500/20 transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                                    >
                                        <Square size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                                        <span className="hidden xs:inline sm:inline">Check Out</span>
                                        <span className="hidden sm:inline">({formatTimer(sessionTimer)})</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleCheckIn}
                                        className="flex items-center gap-1.5 sm:gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border border-green-500/20 transition-all hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                                    >
                                        <Play size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                                        <span className="hidden xs:inline">Check In</span>
                                    </button>
                                )}
                            </div>
                        )}

                        <button className="relative text-gray-400 hover:text-white p-2">
                            <Bell size={20} className="sm:w-6 sm:h-6" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-gym-orange rounded-full"></span>
                        </button>
                        <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-red-500 transition-colors p-2"
                        >
                            <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-gym-black">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
