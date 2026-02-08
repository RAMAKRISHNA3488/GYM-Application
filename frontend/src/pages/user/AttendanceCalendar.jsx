import React, { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingUp, Award } from 'lucide-react';
import { attendanceApi } from '../../services/api';
import { motion } from 'framer-motion';

const AttendanceCalendar = () => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [stats, setStats] = useState({
        totalSessions: 0,
        totalMinutes: 0,
        averageDuration: 0,
        currentStreak: 0
    });

    useEffect(() => {
        fetchAttendanceHistory();
    }, []);

    const fetchAttendanceHistory = async () => {
        try {
            const res = await attendanceApi.getHistory();
            setAttendanceHistory(res.data);
            calculateStats(res.data);
        } catch (error) {
            console.error("Error fetching attendance history", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const completedSessions = data.filter(a => a.checkOutTime);
        const totalMinutes = completedSessions.reduce((sum, a) => sum + (a.sessionDurationMinutes || 0), 0);

        setStats({
            totalSessions: completedSessions.length,
            totalMinutes: Math.round(totalMinutes),
            averageDuration: completedSessions.length > 0 ? Math.round(totalMinutes / completedSessions.length) : 0,
            currentStreak: 0 // Could implement streak calculation
        });
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const getAttendanceForDate = (year, month, day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return attendanceHistory.filter(a => {
            if (!a.checkInTime) return false;
            let checkInDate;
            if (Array.isArray(a.checkInTime)) {
                const [y, m, d] = a.checkInTime;
                checkInDate = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            } else {
                checkInDate = a.checkInTime.split('T')[0];
            }
            return checkInDate === dateStr;
        });
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Attendance Calendar</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Calendar className="text-blue-500" size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Sessions</p>
                            <p className="text-2xl font-bold text-white">{stats.totalSessions}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                            <Clock className="text-green-500" size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Time</p>
                            <p className="text-2xl font-bold text-white">{formatDuration(stats.totalMinutes)}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gym-orange/10 rounded-lg">
                            <TrendingUp className="text-gym-orange" size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Avg Duration</p>
                            <p className="text-2xl font-bold text-white">{formatDuration(stats.averageDuration)}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                            <Award className="text-purple-500" size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">This Month</p>
                            <p className="text-2xl font-bold text-white">
                                {attendanceHistory.filter(a => {
                                    if (!a.checkInTime) return false;
                                    const checkInMonth = Array.isArray(a.checkInTime) ? a.checkInTime[1] - 1 : new Date(a.checkInTime).getMonth();
                                    return checkInMonth === new Date().getMonth();
                                }).length}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Calendar */}
            <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">{monthName}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={previousMonth}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextMonth}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-gray-400 font-semibold text-sm py-2">
                            {day}
                        </div>
                    ))}

                    {/* Empty cells for days before month starts */}
                    {[...Array(startingDayOfWeek)].map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {/* Days of the month */}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const attendance = getAttendanceForDate(year, month, day);
                        const hasAttendance = attendance.length > 0;
                        const totalDuration = attendance.reduce((sum, a) => sum + (a.sessionDurationMinutes || 0), 0);

                        return (
                            <motion.div
                                key={day}
                                whileHover={{ scale: 1.05 }}
                                className={`aspect-square rounded-lg p-2 transition-all cursor-pointer ${hasAttendance
                                        ? 'bg-gym-orange/20 border-2 border-gym-orange hover:bg-gym-orange/30'
                                        : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                                    }`}
                                title={hasAttendance ? `${attendance.length} session(s) - ${formatDuration(totalDuration)}` : ''}
                            >
                                <div className="text-white font-semibold text-sm">{day}</div>
                                {hasAttendance && (
                                    <div className="mt-1">
                                        <div className="text-xs text-gym-orange font-bold">
                                            {formatDuration(totalDuration)}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {attendance.length} {attendance.length === 1 ? 'visit' : 'visits'}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="glass-card p-4">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gym-orange/20 border-2 border-gym-orange"></div>
                        <span className="text-gray-400 text-sm">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-white/5 border-2 border-transparent"></div>
                        <span className="text-gray-400 text-sm">Absent</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCalendar;
