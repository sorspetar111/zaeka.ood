import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';


import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';


import AdminLayout from './pages/admin/AdminLayout';
import UserManagementPage from './pages/admin/UserManagementPage';
import ControlManagementPage from './pages/admin/ControlManagementPage'; 
import CreateItemPage from './pages/admin/CreateItemPage';

import './i18n';


const ControlManagementPage = () => <h2>Списък с контроли</h2>; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />      
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />                  
          <Route  path="/admin"  element={<ProtectedRoute requireAdmin={true}><AdminLayout /></ProtectedRoute>}    >
            <Route path="users" element={<UserManagementPage />} />
            <Route path="controls" element={<ControlManagementPage />} />
            <Route path="create" element={<CreateItemPage />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;