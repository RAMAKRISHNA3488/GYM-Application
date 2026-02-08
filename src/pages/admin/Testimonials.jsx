import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';

const AdminTestimonials = () => {
    const testimonials = [
        { id: 1, name: 'John Doe', rating: 5, comment: 'Best gym experience ever! The trainers are amazing.', date: '2024-02-01' },
        { id: 2, name: 'Jane Smith', rating: 5, comment: 'Love the new equipment and facilities.', date: '2024-01-28' },
        { id: 3, name: 'Mike Johnson', rating: 4, comment: 'Great atmosphere and friendly staff.', date: '2024-01-25' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Testimonials</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="glass-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gym-orange flex items-center justify-center text-white font-bold">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-400">{testimonial.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">{testimonial.comment}</p>
                        <button className="text-sm text-gym-orange hover:text-white transition-colors flex items-center gap-2">
                            <ThumbsUp size={16} />
                            Approve
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTestimonials;
