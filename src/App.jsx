import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorsPage from './pages/DoctorsPage';
import PatientsPage from './pages/PatientsPage';
import ConsultRoomsPage from './pages/ConsultRoomsPage';
import SchedulePage from './pages/SchedulePage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected Routes - Accessible by both ADMIN and DOCTOR */}
          <Route
            path="/home"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_DOCTOR']}>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <HomePage />
                </div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/appointments"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_DOCTOR']}>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <AppointmentsPage />
                </div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/schedule"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_DOCTOR']}>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <SchedulePage />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/records"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_DOCTOR']}>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <MedicalRecordsPage />
                </div>
              </ProtectedRoute>
            }
          />
          
          {/* Admin Only Routes */}
          <Route
            path="/doctors"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN']}>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <DoctorsPage />
                </div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/patients"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN']}>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <PatientsPage />
                </div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/rooms"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN']}>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <ConsultRoomsPage />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
