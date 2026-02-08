import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Settings</h1>

            <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-6">Gym Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2">Gym Name</label>
                        <input
                            type="text"
                            defaultValue="FitnessX Gym"
                            className="w-full bg-gym-black border border-white/10 rounded-lg p-3 text-white"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Opening Time</label>
                            <input
                                type="time"
                                defaultValue="06:00"
                                className="w-full bg-gym-black border border-white/10 rounded-lg p-3 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Closing Time</label>
                            <input
                                type="time"
                                defaultValue="22:00"
                                className="w-full bg-gym-black border border-white/10 rounded-lg p-3 text-white"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Contact Email</label>
                        <input
                            type="email"
                            defaultValue="info@fitnessx.com"
                            className="w-full bg-gym-black border border-white/10 rounded-lg p-3 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Contact Phone</label>
                        <input
                            type="tel"
                            defaultValue="+1 234 567 8900"
                            className="w-full bg-gym-black border border-white/10 rounded-lg p-3 text-white"
                        />
                    </div>
                </div>
                <button className="mt-6 bg-gym-orange hover:bg-gym-orangeHover text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2">
                    <Save size={20} />
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;
