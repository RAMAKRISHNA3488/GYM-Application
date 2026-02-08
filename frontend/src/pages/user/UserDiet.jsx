import React, { useEffect, useState } from 'react';
import { featuresApi } from '../../services/api';
import { Utensils, Flame, Info, CheckCircle } from 'lucide-react';

const UserDiet = () => {
    const [diet, setDiet] = useState(null);

    useEffect(() => {
        // Mock simulation or API call
        const fetchDiet = async () => {
            try {
                const response = await featuresApi.getAiDiet();
                setDiet(response.data);
            } catch (e) {
                // Fallback
                setDiet({
                    name: "AI Cutting Diet",
                    totalCalories: 2100,
                    proteinGrams: 180,
                    carbsGrams: 200,
                    fatGrams: 60,
                    meals: [
                        { name: "Breakfast", calories: 450, foodItems: "Oatmeal with whey protein, Berries", timeOfDay: "08:00 AM" },
                        { name: "Lunch", calories: 600, foodItems: "Grilled Chicken Breast, Brown Rice, Broccoli", timeOfDay: "01:00 PM" },
                        { name: "Snack", calories: 300, foodItems: "Greek Yogurt, Almonds", timeOfDay: "04:30 PM" },
                        { name: "Dinner", calories: 750, foodItems: "Salmon Fillet, Sweet Potato, Asparagus", timeOfDay: "08:00 PM" }
                    ]
                });
            }
        }
        fetchDiet();
    }, []);

    if (!diet) return <div className="text-white">Generating Diet Plan...</div>;

    return (
        <div className="space-y-8">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Flame size={60} />
                    </div>
                    <p className="text-gray-400 text-sm uppercase">Daily Goal</p>
                    <h2 className="text-4xl font-bold text-white">{diet.totalCalories} <span className="text-lg text-gym-orange">kcal</span></h2>
                </div>
                <div className="glass-card p-6 border-b-4 border-blue-500">
                    <p className="text-gray-400 text-sm uppercase">Protein</p>
                    <h2 className="text-3xl font-bold text-white">{diet.proteinGrams}g</h2>
                </div>
                <div className="glass-card p-6 border-b-4 border-green-500">
                    <p className="text-gray-400 text-sm uppercase">Carbs</p>
                    <h2 className="text-3xl font-bold text-white">{diet.carbsGrams}g</h2>
                </div>
                <div className="glass-card p-6 border-b-4 border-yellow-500">
                    <p className="text-gray-400 text-sm uppercase">Fats</p>
                    <h2 className="text-3xl font-bold text-white">{diet.fatGrams}g</h2>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Today's Meal Plan</h2>

            <div className="space-y-4">
                {diet.meals?.map((meal, idx) => (
                    <div key={idx} className="glass-card p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gym-orange border border-white/10 shrink-0">
                            <Utensils size={28} />
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-xl font-bold text-white">{meal.name}</h3>
                                <span className="text-gray-400 text-sm font-mono">{meal.timeOfDay}</span>
                            </div>
                            <p className="text-gray-300">{meal.foodItems}</p>
                        </div>

                        <div className="text-right shrink-0 min-w-[100px]">
                            <span className="block text-2xl font-bold text-white">{meal.calories}</span>
                            <span className="text-xs text-gray-500 uppercase">Calories</span>
                        </div>

                        <button className="p-3 hover:bg-green-500/20 rounded-full hover:text-green-500 text-gray-600 transition-colors">
                            <CheckCircle size={24} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDiet;
