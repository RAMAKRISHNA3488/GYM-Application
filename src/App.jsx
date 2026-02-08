import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import AdminOverview from './pages/admin/Overview';
import UserOverview from './pages/user/UserOverview';
import UserWorkout from './pages/user/UserWorkout';
import UserDiet from './pages/user/UserDiet';
import CommunityFeed from './pages/user/CommunityFeed';
import UserProfile from './pages/user/UserProfile';
import AttendanceCalendar from './pages/user/AttendanceCalendar';
import MyWorkouts from './pages/user/MyWorkouts';
import AdminMembers from './pages/admin/Members';
import AdminMemberDetails from './pages/admin/MemberDetails';
import AdminTrainers from './pages/admin/Trainers';
import AdminPrograms from './pages/admin/Programs';
import AdminPlans from './pages/admin/Plans';
import AdminNotifications from './pages/admin/Notifications';
import AdminTestimonials from './pages/admin/Testimonials';
import AdminSettings from './pages/admin/Settings';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Router>
      <div className="bg-gym-black min-h-screen font-sans text-white selection:bg-gym-orange selection:text-white">

        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar onLoginClick={() => setIsLoginOpen(true)} />
              <Home onLoginClick={() => setIsLoginOpen(true)} />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <DashboardLayout role="admin">
              <Routes>
                <Route path="dashboard" element={<AdminOverview />} />
                <Route path="members" element={<AdminMembers />} />
                <Route path="members/:id" element={<AdminMemberDetails />} />
                <Route path="trainers" element={<AdminTrainers />} />
                <Route path="programs" element={<AdminPrograms />} />
                <Route path="plans" element={<AdminPlans />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          } />

          {/* User Routes */}
          <Route path="/dashboard/*" element={
            <DashboardLayout role="user">
              <Routes>
                <Route path="/" element={<UserOverview />} />
                <Route path="/workouts" element={<UserWorkout />} />
                <Route path="/diet" element={<UserDiet />} />
                <Route path="/community" element={<CommunityFeed />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/attendance" element={<AttendanceCalendar />} />
                <Route path="/my-workouts" element={<MyWorkouts />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </DashboardLayout>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
