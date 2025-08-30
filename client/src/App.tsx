import { Switch, Route } from "wouter";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";
import BottomNavigation from "@/components/BottomNavigation";
import NotFound from "@/pages/not-found";

function MainApp() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 pb-16 overflow-y-auto">
        {activeTab === 'home' && <Home onSwitchToProfile={() => setActiveTab('profile')} />}
        {activeTab === 'profile' && <Profile />}
      </main>
      
      <BottomNavigation onTabChange={handleTabChange} activeTab={activeTab} />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/">
        <ProtectedRoute>
          <MainApp />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
