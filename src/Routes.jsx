import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WelcomeOnboarding from './pages/welcome-onboarding';
import HomeDashboard from './pages/home-dashboard';
import PersonalInfoInput from './pages/personal-info-input';
import ProfileSettings from './pages/profile-settings';
import TeamDashboard from './pages/team-dashboard';
import ProgressAnalytics from './pages/progress-analytics';
import CommunityPage from './pages/community';
import SettingsPage from './pages/settings';
import ContactUs from './pages/contact-us';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<WelcomeOnboarding />} />
        <Route path="/welcome-onboarding" element={<WelcomeOnboarding />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/personal-info-input" element={<PersonalInfoInput />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/team-dashboard" element={<TeamDashboard />} />
        <Route path="/progress-analytics" element={<ProgressAnalytics />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
