import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import EmailLoginScreen from './components/EmailLoginScreen';
import ChatInterface from './components/ChatInterface';
import { ThemeProvider } from './contexts/ThemeContext';
import localStorageService from './services/localStorage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      const session = localStorageService.getCurrentSession();
      if (session && session.isActive) {
        setIsAuthenticated(true);
        setSessionId(session.sessionId);
        setUserEmail(session.userEmail);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (email: string) => {
    try {
      // Create new session with email
      const session = localStorageService.createSession(email);

      setIsTransitioning(true);
      setTimeout(() => {
        setIsAuthenticated(true);
        setSessionId(session.sessionId);
        setUserEmail(email);
        setIsTransitioning(false);
      }, 300);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    try {
      localStorageService.clearSession();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsAuthenticated(false);
        setSessionId(null);
        setUserEmail(null);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
        {isTransitioning && (
          <div className="fixed inset-0 bg-blue-500 dark:bg-blue-600 z-50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!isAuthenticated ? (
          <EmailLoginScreen onLogin={handleLogin} />
        ) : (
          <ChatInterface onLogout={handleLogout} sessionId={sessionId!} userEmail={userEmail!} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;