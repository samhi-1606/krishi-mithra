import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Live data temporarily unavailable', 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center border-2 border-dashed border-red-200 rounded-lg bg-red-50">
      <AlertTriangle className="h-12 w-12 text-[#D32F2F] mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="btn-outline flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
