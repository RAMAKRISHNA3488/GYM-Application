import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiry or invalid signature
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token is invalid or expired
            localStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    login: (credentials) => api.post('/auth/authenticate', credentials),
    register: (data) => api.post('/auth/register', data),
};

export const featuresApi = {
    getAiWorkout: () => api.get('/features/workout/generate-ai'),
    getAiDiet: () => api.get('/features/diet/generate-ai'),
    getAllRoutines: () => api.get('/features/workout/all'),
    createRoutine: (data) => api.post('/features/workout/create', data),
};

export const adminApi = {
    getAllUsers: () => api.get('/admin/users'),
};

export const fitnessProfileApi = {
    getMyProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
};

export const assignmentApi = {
    assignDaily: (data) => api.post('/assignments/admin/assign-daily', data),
    assignWeekly: (data) => api.post('/assignments/admin/assign-weekly', data),
    getUserDaily: (date) => api.get(`/assignments/user/daily${date ? `?date=${date}` : ''}`),
    getUserAll: () => api.get('/assignments/user/all'),
    completeWorkout: (id, notes) => api.put(`/assignments/user/${id}/complete${notes ? `?notes=${notes}` : ''}`),
    getAdminUserProgress: (userId) => api.get(`/assignments/admin/user/${userId}`),
};

export const attendanceApi = {
    checkIn: () => api.post('/attendance/check-in'),
    checkOut: () => api.post('/attendance/check-out'),
    getStatus: () => api.get('/attendance/status'),
    getHistory: () => api.get('/attendance/history'),
};

export const dietPlanApi = {
    createPlan: (data) => api.post('/diet-plans/admin/create', data),
    getUserPlans: (userId) => api.get(`/diet-plans/admin/user/${userId}`),
    getActivePlan: (userId) => api.get(`/diet-plans/admin/user/${userId}/active`),
    getMyPlan: () => api.get('/diet-plans/my-plan'),
};

export const workoutAssignmentApi = {
    // Admin
    assignWorkout: (data) => api.post('/workout-assignments/admin/assign', data),
    getUserWorkouts: (userId) => api.get(`/workout-assignments/admin/user/${userId}`),

    // User
    getMyWorkouts: () => api.get('/workout-assignments/my-workouts'),
    getTodayWorkouts: () => api.get('/workout-assignments/today'),
    getWorkoutDetails: (id) => api.get(`/workout-assignments/${id}`),
    startWorkout: (id) => api.post(`/workout-assignments/${id}/start`),
    completeExercise: (id, data) => api.post(`/workout-assignments/exercise/${id}/complete`, data),
    completeWorkout: (id, notes) => api.post(`/workout-assignments/${id}/complete`, { userNotes: notes }),
};

export default api;
