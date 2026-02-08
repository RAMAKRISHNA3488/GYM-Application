import React from 'react';
import { Bell, CheckCircle } from 'lucide-react';

const AdminNotifications = () => {
    const notifications = [
        { id: 1, message: 'New member registration: John Doe', time: '5 minutes ago', read: false },
        { id: 2, message: 'Payment received from Sarah Williams', time: '1 hour ago', read: false },
        { id: 3, message: 'Trainer Mike Johnson updated profile', time: '2 hours ago', read: true },
        { id: 4, message: 'Monthly report is ready', time: '1 day ago', read: true },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Notifications</h1>

            <div className="space-y-3">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`glass-card p-4 flex items-start gap-4 ${!notification.read ? 'border-l-4 border-gym-orange' : ''}`}
                    >
                        <Bell className={notification.read ? 'text-gray-400' : 'text-gym-orange'} size={20} />
                        <div className="flex-1">
                            <p className={`${notification.read ? 'text-gray-400' : 'text-white font-semibold'}`}>
                                {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                            <button className="text-gym-orange hover:text-white transition-colors">
                                <CheckCircle size={20} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminNotifications;
