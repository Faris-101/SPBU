import React from 'react';

const Badge = ({ label, type = 'info' }) => {
  const typeStyles = {
    success: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200',
    danger: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200',
    info: 'bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 border border-blue-200',
    primary: 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border border-gray-200',
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  );
};

export default Badge;
