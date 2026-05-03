import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import WorshipSchedulePage from './pages/admin/WorshipSchedulePage';
import DailyVersePage from './pages/admin/DailyVersePage';
import WartaPage from './pages/admin/WartaPage';
import AnnouncementsPage from './pages/admin/AnnouncementsPage';
import MinistryActivitiesPage from './pages/admin/MinistryActivitiesPage';
import UpcomingActivitiesPage from './pages/admin/UpcomingActivitiesPage';
import ChurchConfigPage from './pages/admin/ChurchConfigPage';
import AnnouncementListPage from './pages/Announcements/AnnouncementListPage';
import AnnouncementDetailPage from './pages/Announcements/AnnouncementDetailPage';
import MinistryActivityFeedPage from './pages/MinistryActivities/MinistryActivityFeedPage';
import MinistryActivityDetailPage from './pages/MinistryActivities/MinistryActivityDetailPage';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/pengumuman" element={<AnnouncementListPage />} />
        <Route path="/pengumuman/:id" element={<AnnouncementDetailPage />} />
        <Route path="/kegiatan-pelayanan" element={<MinistryActivityFeedPage />} />
        <Route path="/kegiatan-pelayanan/:id" element={<MinistryActivityDetailPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="worship-schedules" element={<WorshipSchedulePage />} />
          <Route path="daily-verses" element={<DailyVersePage />} />
          <Route path="wartas" element={<WartaPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="activities" element={<MinistryActivitiesPage />} />
          <Route path="upcoming-activities" element={<UpcomingActivitiesPage />} />
          <Route path="church-config" element={<ChurchConfigPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
