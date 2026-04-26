import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import WalletPage from '@/pages/WalletPage';
import Campaigns from '@/pages/Campaigns';
import CreateCampaign from '@/pages/CreateCampaign';
import CampaignDetail from '@/pages/CampaignDetail';
import Analytics from '@/pages/Analytics';
import DayAnalytics from '@/pages/DayAnalytics';
import Leaderboard from '@/pages/Leaderboard';
import Bonuses from '@/pages/Bonuses';
import CreateBonus from '@/pages/CreateBonus';
import BonusDetail from '@/pages/BonusDetail';
import StaffPage from '@/pages/StaffPage';
import StaffDetail from '@/pages/StaffDetail';
import Settings from '@/pages/Settings';
import Onboarding from '@/pages/Onboarding';
import Notifications from '@/pages/Notifications';
import Profile from '@/pages/Profile';
import EditCampaign from '@/pages/EditCampaign';
import EditBonus from '@/pages/EditBonus';
import ProductDetail from '@/pages/ProductDetail';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/new" element={<CreateCampaign />} />
        <Route path="/campaigns/:id/edit" element={<EditCampaign />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/:dayId" element={<DayAnalytics />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/bonuses" element={<Bonuses />} />
        <Route path="/bonuses/new" element={<CreateBonus />} />
        <Route path="/bonuses/:id/edit" element={<EditBonus />} />
        <Route path="/bonuses/:id" element={<BonusDetail />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/:id" element={<StaffDetail />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App