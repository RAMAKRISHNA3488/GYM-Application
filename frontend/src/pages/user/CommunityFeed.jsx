import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Image } from 'lucide-react';

// Mock Data
const MOCK_POSTS = [
    {
        id: 1,
        user: "Sarah Jenkins",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        time: "2 hours ago",
        content: "Finally hit my PR on deadlifts today! 120kg for 3 reps. Thanks to my trainer Mike for the push.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1770&auto=format&fit=crop",
        likes: 45,
        comments: 12
    },
    {
        id: 2,
        user: "David Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        time: "5 hours ago",
        content: "Early morning cardio session done. Starting the day right! 🏃‍♂️💨",
        image: null,
        likes: 24,
        comments: 3
    }
];

const CommunityFeed = () => {
    const [posts] = useState(MOCK_POSTS);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Create Post Input */}
            <div className="glass-card p-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-600 shrink-0"></div>
                    <div className="flex-1">
                        <textarea
                            placeholder="Share your progress..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gym-orange transition-colors min-h-[100px] resize-none"
                        ></textarea>
                        <div className="flex justify-between items-center mt-4">
                            <button className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                                <Image size={18} /> Add Photo
                            </button>
                            <button className="bg-gym-orange text-white px-6 py-2 rounded-full font-bold shadow-neon hover:bg-gym-orangeHover transition-colors">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-6">
                {posts.map(post => (
                    <div key={post.id} className="glass-card p-6 animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                            <div>
                                <h4 className="text-white font-bold">{post.user}</h4>
                                <p className="text-gray-500 text-xs">{post.time}</p>
                            </div>
                        </div>

                        <p className="text-gray-300 mb-4 whitespace-pre-line leading-relaxed">
                            {post.content}
                        </p>

                        {post.image && (
                            <div className="mb-4 rounded-xl overflow-hidden">
                                <img src={post.image} alt="Post content" className="w-full object-cover max-h-[400px]" />
                            </div>
                        )}

                        <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                            <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group">
                                <Heart size={20} className="group-hover:fill-current" />
                                <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                <MessageCircle size={20} />
                                <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors ml-auto">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityFeed;
