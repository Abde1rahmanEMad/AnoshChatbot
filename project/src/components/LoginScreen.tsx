import React, { useState } from 'react';
import { Bot, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (code: string) => boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const success = await onLogin(code);
      if (!success) {
        setError('Invalid code. Please try again.');
        setCode('');
      }
    } catch (error) {
      setError('Connection error. Please check your internet and try again.');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo/App Name */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Anosh</h1>
          <p className="text-gray-600 dark:text-gray-400">Enter your access code to begin</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Access Code"
              className="w-full px-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-sm"
              disabled={isLoading}
              autoComplete="off"
            />

            {error && (
              <p className="text-red-500 dark:text-red-400 text-sm font-medium animate-pulse">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!code.trim() || isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Enter</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Demo Code Hint */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Demo code: <span className="font-mono bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded">1234</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;