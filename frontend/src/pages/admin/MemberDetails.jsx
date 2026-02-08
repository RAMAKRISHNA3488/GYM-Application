import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi, featuresApi, assignmentApi, dietPlanApi, workoutAssignmentApi } from '../../services/api';
import { ArrowLeft, Calendar, User, Dumbbell, CheckCircle, XCircle, Plus, Trash2 } from 'lucide-react';

const AdminMemberDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [routines, setRoutines] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('progress');

    // Forms
    const [dailyForm, setDailyForm] = useState({ date: '', routineId: '', notes: '' });
    const [weeklyForm, setWeeklyForm] = useState({ startDate: '', routineId: '', notes: '' });

    // Custom Routine Form
    const [customRoutine, setCustomRoutine] = useState({
        name: '',
        description: '',
        difficultyLevel: 'Beginner',
        goalType: 'GENERAL',
        exercises: []
    });
    const [newExercise, setNewExercise] = useState({ name: '', sets: 3, reps: 10, targetMuscleGroup: '' });

    // Diet Plan Form
    const [dietForm, setDietForm] = useState({
        planName: '',
        goal: 'Weight Loss',
        targetCalories: 2000,
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        meals: []
    });
    const [newMeal, setNewMeal] = useState({
        mealType: 'Breakfast',
        foodItems: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        instructions: ''
    });

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [userRes, routinesRes, assignmentsRes] = await Promise.all([
                adminApi.getAllUsers(),
                featuresApi.getAllRoutines(),
                assignmentApi.getAdminUserProgress(id)
            ]);

            const foundUser = userRes.data.find(u => u.id === parseInt(id));
            setUser(foundUser);
            setRoutines(routinesRes.data);
            setAssignments(assignmentsRes.data);
        } catch (error) {
            console.error("Error fetching details", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignDaily = async (e) => {
        e.preventDefault();
        try {
            await assignmentApi.assignDaily({
                userId: parseInt(id),
                routineId: parseInt(dailyForm.routineId),
                date: dailyForm.date,
                adminNotes: dailyForm.notes
            });
            alert("Workout Assigned!");
            fetchData(); // Refresh all
        } catch (error) {
            console.error(error);
            alert("Failed to assign");
        }
    };

    const handleAssignWeekly = async (e) => {
        e.preventDefault();
        const dates = [];
        let current = new Date(weeklyForm.startDate);
        for (let i = 0; i < 7; i++) {
            dates.push(new Date(current).toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
        }

        try {
            await assignmentApi.assignWeekly({
                userId: parseInt(id),
                routineId: parseInt(weeklyForm.routineId),
                dates: dates,
                adminNotes: weeklyForm.notes
            });
            alert("Weekly Plan Assigned!");
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Failed to assign");
        }
    };

    const addExercise = () => {
        if (!newExercise.name) return;
        setCustomRoutine({
            ...customRoutine,
            exercises: [...customRoutine.exercises, { ...newExercise }]
        });
        setNewExercise({ name: '', sets: 3, reps: 10, targetMuscleGroup: '' });
    };

    const removeExercise = (index) => {
        const updated = customRoutine.exercises.filter((_, i) => i !== index);
        setCustomRoutine({ ...customRoutine, exercises: updated });
    };

    const handleCreateCustomRoutine = async (e) => {
        e.preventDefault();
        if (customRoutine.exercises.length === 0) {
            alert("Add at least one exercise");
            return;
        }
        try {
            const res = await featuresApi.createRoutine(customRoutine);
            alert("Custom Routine Created!");
            setCustomRoutine({ name: '', description: '', difficultyLevel: 'Beginner', goalType: 'GENERAL', exercises: [] });
            fetchData(); // Refresh routines list
            setActiveTab('daily'); // Switch to assign tab
        } catch (error) {
            console.error(error);
            alert("Failed to create routine");
        }
    };

    // Diet Plan Handlers
    const addMeal = () => {
        if (!newMeal.foodItems.trim()) {
            alert("Please enter food items");
            return;
        }
        setDietForm({ ...dietForm, meals: [...dietForm.meals, { ...newMeal }] });
        setNewMeal({ mealType: 'Breakfast', foodItems: '', calories: 0, protein: 0, carbs: 0, fats: 0, instructions: '' });
    };

    const removeMeal = (index) => {
        const updated = dietForm.meals.filter((_, i) => i !== index);
        setDietForm({ ...dietForm, meals: updated });
    };

    const handleCreateDietPlan = async (e) => {
        e.preventDefault();
        if (dietForm.meals.length === 0) {
            alert("Add at least one meal");
            return;
        }
        try {
            await dietPlanApi.createPlan({ ...dietForm, userId: parseInt(id) });
            alert("Diet Plan Assigned Successfully!");
            setDietForm({
                planName: '',
                goal: 'Weight Loss',
                targetCalories: 2000,
                description: '',
                startDate: new Date().toISOString().split('T')[0],
                endDate: '',
                meals: []
            });
        } catch (error) {
            console.error(error);
            alert("Failed to create diet plan");
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;
    if (!user) return <div className="text-white">User not found</div>;

    return (
        <div className="space-y-6">
            <button onClick={() => navigate('/admin/members')} className="flex items-center text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Back to Members
            </button>

            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gym-orange flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.charAt(0)}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                    <p className="text-gray-400">{user.email}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 overflow-x-auto">
                {['progress', 'daily', 'weekly', 'create', 'diet'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 font-semibold transition-colors capitalize whitespace-nowrap ${activeTab === tab ? 'text-gym-orange border-b-2 border-gym-orange' : 'text-gray-400 hover:text-white'}`}
                    >
                        {tab === 'create' ? 'Create Custom Routine' : tab === 'diet' ? 'Assign Diet Plan' : tab.replace('progress', 'User Progress').replace('daily', 'Assign Daily').replace('weekly', 'Assign Weekly')}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="glass-card p-6">
                {activeTab === 'progress' && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Assigned Workouts History</h3>
                        {assignments.length === 0 ? (
                            <p className="text-gray-400">No workouts assigned yet.</p>
                        ) : (
                            <div className="space-y-2">
                                {assignments.map(assign => (
                                    <div key={assign.id} className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="text-gym-orange font-bold">{assign.scheduledDate}</p>
                                            <p className="text-white font-semibold">{assign.workoutRoutine.name}</p>
                                            {assign.adminNotes && <p className="text-sm text-gray-400">Note: {assign.adminNotes}</p>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {assign.completed ? (
                                                <span className="flex items-center text-green-500 gap-1"><CheckCircle size={16} /> Completed</span>
                                            ) : (
                                                <span className="flex items-center text-yellow-500 gap-1"><Calendar size={16} /> Pending</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'daily' && (
                    <form onSubmit={handleAssignDaily} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-gray-400 mb-1">Date</label>
                            <input
                                type="date"
                                required
                                value={dailyForm.date}
                                onChange={e => setDailyForm({ ...dailyForm, date: e.target.value })}
                                className="w-full bg-gym-black border border-white/10 rounded-lg p-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Routine</label>
                            <select
                                required
                                value={dailyForm.routineId}
                                onChange={e => setDailyForm({ ...dailyForm, routineId: e.target.value })}
                                className="w-full bg-gym-black border border-white/10 rounded-lg p-2 text-white"
                            >
                                <option value="">Select Routine</option>
                                {routines.slice().reverse().map(r => (
                                    <option key={r.id} value={r.id}>{r.name} ({r.difficultyLevel})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Notes</label>
                            <textarea
                                value={dailyForm.notes}
                                onChange={e => setDailyForm({ ...dailyForm, notes: e.target.value })}
                                className="w-full bg-gym-black border border-white/10 rounded-lg p-2 text-white"
                                placeholder="Instructions..."
                            />
                        </div>
                        <button type="submit" className="bg-gym-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-gym-orangeHover">
                            Assign Workout
                        </button>
                    </form>
                )}

                {activeTab === 'weekly' && (
                    <form onSubmit={handleAssignWeekly} className="space-y-4 max-w-lg">
                        <p className="text-sm text-gray-400 mb-4">Assign a routine for 7 days starting from date.</p>
                        <div>
                            <label className="block text-gray-400 mb-1">Start Date</label>
                            <input
                                type="date"
                                required
                                value={weeklyForm.startDate}
                                onChange={e => setWeeklyForm({ ...weeklyForm, startDate: e.target.value })}
                                className="w-full bg-gym-black border border-white/10 rounded-lg p-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Routine</label>
                            <select
                                required
                                value={weeklyForm.routineId}
                                onChange={e => setWeeklyForm({ ...weeklyForm, routineId: e.target.value })}
                                className="w-full bg-gym-black border border-white/10 rounded-lg p-2 text-white"
                            >
                                <option value="">Select Routine</option>
                                {routines.slice().reverse().map(r => (
                                    <option key={r.id} value={r.id}>{r.name} ({r.difficultyLevel})</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="bg-gym-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-gym-orangeHover">
                            Assign Weekly Plan
                        </button>
                    </form>
                )}

                {activeTab === 'create' && (
                    <div className="max-w-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Create New Custom Routine</h3>
                        <form onSubmit={handleCreateCustomRoutine} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-1">Routine Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={customRoutine.name}
                                        onChange={e => setCustomRoutine({ ...customRoutine, name: e.target.value })}
                                        className="w-full bg-gym-black border border-white/10 rounded-lg p-2 text-white"
                                        placeholder="e.g. John's Leg Day"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Difficulty</label>
                                    <select
                                        value={customRoutine.difficultyLevel}
                                        onChange={e => setCustomRoutine({ ...customRoutine, difficultyLevel: e.target.value })}
                                        className="w-full bg-gym-black border border-white/10 rounded-lg p-2 text-white"
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Description</label>
                                <textarea
                                    value={customRoutine.description}
                                    onChange={e => setCustomRoutine({ ...customRoutine, description: e.target.value })}
                                    className="w-full bg-gym-black border border-white/10 rounded-lg p-2 text-white"
                                    placeholder="Brief description..."
                                />
                            </div>

                            {/* Exercises List */}
                            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                                <h4 className="font-bold text-white mb-3">Exercises</h4>
                                <div className="space-y-2 mb-4">
                                    {customRoutine.exercises.map((ex, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-black/20 p-2 rounded">
                                            <span>{ex.name} - {ex.sets}x{ex.reps} ({ex.targetMuscleGroup})</span>
                                            <button type="button" onClick={() => removeExercise(idx)} className="text-red-500 hover:text-red-400">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    {customRoutine.exercises.length === 0 && <p className="text-gray-500 text-sm">No exercises added yet.</p>}
                                </div>

                                <div className="grid grid-cols-12 gap-2 items-end">
                                    <div className="col-span-4">
                                        <input
                                            type="text"
                                            placeholder="Exercise Name"
                                            value={newExercise.name}
                                            onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
                                            className="w-full bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <input
                                            type="number"
                                            placeholder="Sets"
                                            value={newExercise.sets}
                                            onChange={e => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
                                            className="w-full bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <input
                                            type="number"
                                            placeholder="Reps"
                                            value={newExercise.reps}
                                            onChange={e => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) })}
                                            className="w-full bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <input
                                            type="text"
                                            placeholder="Muscle (e.g. Chest)"
                                            value={newExercise.targetMuscleGroup}
                                            onChange={e => setNewExercise({ ...newExercise, targetMuscleGroup: e.target.value })}
                                            className="w-full bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <button type="button" onClick={addExercise} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 w-full flex justify-center">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-gym-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-gym-orangeHover">
                                    Create Routine
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Diet Plan Tab */}
                {activeTab === 'diet' && (
                    <div className="glass-card p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Assign Diet Plan to {user.name}</h2>
                        <form onSubmit={handleCreateDietPlan} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Plan Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={dietForm.planName}
                                        onChange={e => setDietForm({ ...dietForm, planName: e.target.value })}
                                        className="w-full bg-gym-black border border-white/10 rounded p-3 text-white"
                                        placeholder="e.g., Weight Loss Plan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Goal</label>
                                    <select
                                        value={dietForm.goal}
                                        onChange={e => setDietForm({ ...dietForm, goal: e.target.value })}
                                        className="w-full bg-gym-black border border-white/10 rounded p-3 text-white"
                                    >
                                        <option>Weight Loss</option>
                                        <option>Muscle Gain</option>
                                        <option>Maintenance</option>
                                        <option>Athletic Performance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Target Calories</label>
                                    <input
                                        type="number"
                                        required
                                        value={dietForm.targetCalories}
                                        onChange={e => setDietForm({ ...dietForm, targetCalories: parseInt(e.target.value) })}
                                        className="w-full bg-gym-black border border-white/10 rounded p-3 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={dietForm.startDate}
                                        onChange={e => setDietForm({ ...dietForm, startDate: e.target.value })}
                                        className="w-full bg-gym-black border border-white/10 rounded p-3 text-white"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 mb-2">Description</label>
                                    <textarea
                                        value={dietForm.description}
                                        onChange={e => setDietForm({ ...dietForm, description: e.target.value })}
                                        className="w-full bg-gym-black border border-white/10 rounded p-3 text-white"
                                        rows="3"
                                        placeholder="Optional plan description..."
                                    />
                                </div>
                            </div>

                            {/* Meals Section */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Meals ({dietForm.meals.length})</h3>

                                {dietForm.meals.length > 0 && (
                                    <div className="space-y-2 mb-4">
                                        {dietForm.meals.map((meal, idx) => (
                                            <div key={idx} className="bg-white/5 p-4 rounded-lg flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="bg-gym-orange text-white px-2 py-0.5 rounded text-xs font-bold">{meal.mealType}</span>
                                                        <span className="text-white font-semibold">{meal.foodItems}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {meal.calories} cal • {meal.protein}g protein • {meal.carbs}g carbs • {meal.fats}g fats
                                                    </div>
                                                    {meal.instructions && <p className="text-xs text-gray-500 mt-1">{meal.instructions}</p>}
                                                </div>
                                                <button type="button" onClick={() => removeMeal(idx)} className="text-red-500 hover:text-red-400">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="bg-white/5 p-4 rounded-lg space-y-3">
                                    <h4 className="text-white font-semibold">Add Meal</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                                        <select
                                            value={newMeal.mealType}
                                            onChange={e => setNewMeal({ ...newMeal, mealType: e.target.value })}
                                            className="bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        >
                                            <option>Breakfast</option>
                                            <option>Lunch</option>
                                            <option>Dinner</option>
                                            <option>Snack</option>
                                            <option>Pre-Workout</option>
                                            <option>Post-Workout</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Food Items"
                                            value={newMeal.foodItems}
                                            onChange={e => setNewMeal({ ...newMeal, foodItems: e.target.value })}
                                            className="md:col-span-2 bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Cal"
                                            value={newMeal.calories}
                                            onChange={e => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) })}
                                            className="bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Protein"
                                            value={newMeal.protein}
                                            onChange={e => setNewMeal({ ...newMeal, protein: parseInt(e.target.value) })}
                                            className="bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Carbs"
                                            value={newMeal.carbs}
                                            onChange={e => setNewMeal({ ...newMeal, carbs: parseInt(e.target.value) })}
                                            className="bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Fats"
                                            value={newMeal.fats}
                                            onChange={e => setNewMeal({ ...newMeal, fats: parseInt(e.target.value) })}
                                            className="bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                        />
                                        <button type="button" onClick={addMeal} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex justify-center">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Instructions (optional)"
                                        value={newMeal.instructions}
                                        onChange={e => setNewMeal({ ...newMeal, instructions: e.target.value })}
                                        className="w-full bg-gym-black border border-white/10 rounded p-2 text-sm text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-gym-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-gym-orangeHover">
                                    Assign Diet Plan
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMemberDetails;
