import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center p-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, you don't have permission to access this page.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/home')}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 