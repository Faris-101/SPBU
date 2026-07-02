import React from 'react';

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
