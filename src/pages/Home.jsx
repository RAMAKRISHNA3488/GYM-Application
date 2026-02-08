import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Zap, Heart } from 'lucide-react';

const Home = ({ onLoginClick }) => {
    return (
        <div className="bg-gym-black min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                        alt="Fitness Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gym-black via-gym-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gym-black via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-block px-4 py-1.5 rounded-full border border-gym-orange/30 bg-gym-orange/10 backdrop-blur-sm mb-6">
                                <span className="text-gym-orange font-bold uppercase tracking-wider text-sm">The Best Fitness Club</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                                <span className="stroke-text-white block">SHAPE YOUR</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gym-orange to-red-500">
                                    PERFECT BODY
                                </span>
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                                Join the elite fitness community. Professional trainers, modern equipment, and a vibe that pushes your limits.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={onLoginClick}
                                    className="bg-gym-orange hover:bg-gym-orangeHover text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-neon flex items-center justify-center gap-2 group"
                                >
                                    Get Started
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="border border-white/20 hover:border-gym-orange hover:text-gym-orange text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                                    Learn More
                                </button>
                            </div>
                        </motion.div>

                        {/* Floating Stats / Visuals */}
                        <div className="hidden lg:block relative h-[600px]">
                            {/* This could be a floating hero image if distinct from bg, or floating cards */}

                            {/* Card 1: Heart Rate */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="absolute top-20 right-10 glass-card p-4 flex items-center gap-4 w-48 animate-float"
                            >
                                <div className="bg-red-500/20 p-2 rounded-full">
                                    <Heart className="text-red-500 fill-current" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs text-left">Heart Rate</p>
                                    <p className="text-white font-bold text-xl text-left">116 BPM</p>
                                </div>
                            </motion.div>

                            {/* Card 2: Calories */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="absolute bottom-40 left-10 glass-card p-4 flex items-center gap-4 w-52 animate-float-delayed"
                            >
                                <div className="bg-gym-orange/20 p-2 rounded-full">
                                    <Zap className="text-gym-orange fill-current" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs text-left">Calories Burned</p>
                                    <p className="text-white font-bold text-xl text-left">245 kcal</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="py-20 bg-gym-dark relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gym-orange/5 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-gym-orange font-bold uppercase tracking-wider">Our Programs</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">BUILD YOUR BEST BODY</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Body Building', desc: 'Focus on hypertrophy and strength with specialized equipment.', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop' },
                            { title: 'Cardio & Crossfit', desc: 'High intensity workouts to boost stamina and burn fat.', img: 'https://images.unsplash.com/photo-1517963879466-e925ac69ab99?q=80&w=2070&auto=format&fit=crop' },
                            { title: 'Yoga & Flexibility', desc: 'Improve mobility, balance and mental peace.', img: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070&auto=format&fit=crop' }
                        ].map((program, idx) => (
                            <div key={idx} className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer">
                                <img src={program.img} alt={program.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gym-black/90 via-gym-black/30 to-transparent p-6 flex flex-col justify-end">
                                    <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>
                                    <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        {program.desc}
                                    </p>
                                    <div className="mt-4 w-12 h-1 bg-gym-orange group-hover:w-full transition-all duration-300"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section id="why-us" className="py-20 bg-gym-black">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-gym-orange font-bold uppercase tracking-wider">Why Choose Us</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">WE PUSH YOUR LIMITS FORWARD</h2>
                            <p className="text-gray-400 text-lg mb-8">
                                We are more than just a gym. We are a community of like-minded individuals who are committed to achieving their goals and supporting each other.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: 'Modern Equipment', desc: 'Latest high-tech machinery for every muscle group.' },
                                    { title: 'Expert Trainers', desc: 'Certified coaches to guide your fitness journey.' },
                                    { title: 'Flexible Time', desc: 'Open 24/7 to suit your busy schedule.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <Zap size={24} className="text-gym-orange" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{item.title}</h4>
                                            <p className="text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gym-orange/20 rounded-2xl md:-rotate-6 blur-md"></div>
                            <img
                                src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085&auto=format&fit=crop"
                                alt="Why Us"
                                className="relative rounded-2xl shadow-2xl border border-white/10 w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section id="plans" className="py-20 bg-gym-dark">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gym-orange font-bold uppercase tracking-wider">Pricing Plan</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">CHOOSE YOUR PERFECT PLAN</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Basic', price: '$29', features: ['Access to Gym Area', 'Standard Equipment', 'Locker Room Access'] },
                            { name: 'Premium', price: '$49', features: ['All Basic Features', 'Group Classes', 'Personal Trainer (2x/mo)', 'Diet Consultation'], active: true },
                            { name: 'Pro', price: '$89', features: ['All Premium Features', 'Unlimited Personal Training', 'Spa & Sauna Access', 'Exclusive Merchandise'] }
                        ].map((plan, idx) => (
                            <div key={idx} className={`relative p-8 rounded-2xl transition-all duration-300 ${plan.active ? 'bg-white/10 border border-gym-orange transform scale-105' : 'bg-gym-black border border-white/10 hover:border-white/30'}`}>
                                {plan.active && (
                                    <div className="absolute top-0 right-0 bg-gym-orange text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                                )}
                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-end gap-1 mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <Zap size={16} className="text-gym-orange" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-full font-bold transition-all ${plan.active ? 'bg-gym-orange hover:bg-gym-orangeHover text-white shadow-neon' : 'bg-white text-gym-black hover:bg-gray-200'}`}>
                                    Choose Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold font-heading tracking-wide text-white">
                            FITNESS<span className="text-gym-orange">X</span>
                        </span>
                        <p className="text-gray-400 mt-4 text-sm">
                            Shape your body and define your future with our premium fitness club.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-gym-orange transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-gym-orange transition-colors">About</a></li>
                            <li><a href="#plans" className="hover:text-gym-orange transition-colors">Plans</a></li>
                            <li><a href="#contact" className="hover:text-gym-orange transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-gym-orange transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-gym-orange transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gym-orange transition-colors">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Contact Us</h4>
                        <p className="text-gray-400 text-sm mb-2">123 Fitness Street, Gym City</p>
                        <p className="text-gray-400 text-sm mb-2">+1 (555) 123-4567</p>
                        <p className="text-gray-400 text-sm">support@fitnessx.com</p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                    © 2026 FitnessX. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
