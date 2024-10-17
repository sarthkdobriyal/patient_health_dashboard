// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Auth from "./components/Auth";
import PriorAuthorizationForm from "./pages/PriorAuthorizationForm";
import Dashboard from "./pages/Dashboard";
import PatientDetail from "./pages/PatientDetail";
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<Auth />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/patient/:id"
                element={
                  <PrivateRoute>
                    <PatientDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/prior-auth/:id"
                element={
                  <PrivateRoute>
                    <PriorAuthorizationForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;