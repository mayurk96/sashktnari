 import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignupPage"; // Signup component
import Login from "./pages/LoginPage"; // Login component
import Dashboard from "./pages/DashboardPage"; // Protected Dashboard component
import PrivateRoute from "./PrivateRoute"; // PrivateRoute for protected routes
import { AuthProvider } from "./AuthProvider"; // AuthProvider for authentication context
import JobPreference from "./pages/JobPreference";

import Mentorship from "./pages/Mentorship";
import SkillDevelopment from "./pages/SkillDevelopment";
import Entrepreneurship from "./pages/Entrepreneurship";
import FinancialLiteracy from "./pages/FinancialLiteracy";
import HealthAndWellness from "./pages/HealthandWellness";
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected routes */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />

                    <Route 
                        path="/profile" 
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        } 
                    />

                    {/* Public routes */}
                    
                    <Route path="/job-preference" element={<JobPreference />} />
                    <Route path="/mentorship" element={<Mentorship />} />
                    <Route path="/skill-development" element={<SkillDevelopment />} />
                    <Route path="/entrepreneurship" element={<Entrepreneurship />} />
                    <Route path="/financial-literacy" element={<FinancialLiteracy />} />
                    <Route path="/health-and-wellness" element={<HealthAndWellness />} />

                    {/* Redirect root to Dashboard if authenticated */}
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
