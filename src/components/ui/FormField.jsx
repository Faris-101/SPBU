import React from 'react';

export const FormField = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
    {children}
  </div>
);

export const inputClass = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all";
export const selectClass = inputClass;
export const textareaClass = inputClass + " resize-none";
