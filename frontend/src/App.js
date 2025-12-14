import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import DonorList from "./components/DonorList";
import RegisterDonor from "./components/RegisterDonor";
import RequestBlood from "./components/RequestBlood";
import MatchResults from "./components/MatchResults";
import NotificationPanel from "./components/NotificationPanel";
import Dashboard from "./components/Dashboard";
import DonorStats from "./components/DonorStats";
import RecentDonations from "./components/RecentDonations";
import PublicHome from "./components/PublicHome";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

import { ToastProvider } from "./components/ToastContext";
import { AuthProvider, useAuth } from "./components/AuthContext";

import "./App.css";
import "./components/Toast.css";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <div className="app-title">RedPulse - Blood Donation & Transfusion System</div>
            <Navbar />

            <div className="page-container">
              <Routes>
                <Route path="/" element={<PublicHome />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />

                <Route path="/register-donor" element={<RegisterDonor />} />
                <Route path="/request-blood" element={<RequestBlood />} />

                <Route
                  path="/donors"
                  element={
                    <PrivateRoute>
                      <DonorList />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/match-results/:requestId"
                  element={
                    <PrivateRoute>
                      <MatchResults />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/notifications"
                  element={
                    <PrivateRoute>
                      <NotificationPanel />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/admin-notify"
                  element={
                    <PrivateRoute>
                      <NotificationPanel />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/stats"
                  element={
                    <PrivateRoute>
                      <DonorStats />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/recent-donations"
                  element={
                    <PrivateRoute>
                      <RecentDonations />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>

            <footer className="app-footer">
              Copyright © 2025 by <strong>Sanaa Tasneem</strong>. All rights reserved.
            </footer>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
