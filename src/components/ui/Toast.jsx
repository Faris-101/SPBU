import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] animate-[slideUp_0.25s_ease-out]">
      <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-xl rounded-xl px-4 py-3 min-w-[280px]">
        <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-1 flex-shrink-0">
          <CheckCircle2 size={16} className="text-white" />
        </div>
        <p className="text-sm text-gray-700 font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-500">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
