import "./index.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./admin/pages/Dashboard";
import { TransactionsPage } from "./admin/pages/Transactions";
import { ProfilePage } from "./admin/pages/Profile";
import { SettingsPage } from "./admin/pages/Settings";
import { ReferralsPage } from "./admin/pages/Referrals";
import { AdminLayout } from "./admin/layouts/AdminLayout";
import { Home } from "./client/pages/Home";
import { Services } from "./client/services/Services";
import { Termsofservices } from "./client/services/Termsofservices";
import { About } from "./client/services/About";
import { Privacy } from "./client/services/Privacy";
import { ClientLayout } from "./client/layouts/ClientLayout";
import ProtectedRoute from "./admin/routes/protected";
import { RegistrationPage } from "./client/pages/Registraion";
import AdminOverview from "./admin/pages/Overview";
import ReferralRules from "./admin/pages/ReferralRules";
import Badges from "./admin/pages/Badges";

export function AppRoutes() {
  return (
    <Routes>
      {/* Client Routes */}
      <Route path="/referral/:code?" element={<RegistrationPage />} />
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="terms" element={<Termsofservices />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/dashboard" element={<ProtectedRoute element={AdminLayout} />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="referrals" element={<ReferralsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="rules" element={<ReferralRules />} />
        <Route path="badges" element={<Badges />} />
      </Route>
    </Routes>
  );
}
