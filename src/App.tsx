import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// 
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard/page';
import Transactions from './pages/Transactions/page';
import Referrals from './pages/Referrals/page';
import Profile from './pages/Profile/page';
import Settings from './pages/Settings/page';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;