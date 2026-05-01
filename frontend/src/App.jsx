import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import WorshipSchedulePage from './pages/admin/WorshipSchedulePage';
import DailyVersePage from './pages/admin/DailyVersePage';
import WartaPage from './pages/admin/WartaPage';
import AnnouncementsPage from './pages/admin/AnnouncementsPage';
import MinistryActivitiesPage from './pages/admin/MinistryActivitiesPage';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="worship-schedules" element={<WorshipSchedulePage />} />
          <Route path="daily-verses" element={<DailyVersePage />} />
          <Route path="wartas" element={<WartaPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="activities" element={<MinistryActivitiesPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
