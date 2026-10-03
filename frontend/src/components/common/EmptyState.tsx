import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = <Inbox className="h-12 w-12 text-gray-400" />, 
  title, 
  description,
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center border-2 border-dashed border-gray-200 rounded-lg bg-white">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
