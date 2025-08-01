import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../constants/paths';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to passport scanner
    navigate(routePaths.PassportScanner, { replace: true });
  }, [navigate]);

  // Show a simple loading message while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg animate-pulse">
          <span className="text-4xl">🛂</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Redirecting to Passport Scanner...
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
};
