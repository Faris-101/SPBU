import { useEffect, useState, useRef } from 'react';

// Hook counter animasi
function useCountUp(target, duration = 1500, isActive = true) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isActive) return;
    
    // Ekstrak angka dari string (hapus Rp, titik, spasi, huruf, dll)
    const numericTarget = typeof target === 'string'
      ? parseFloat(target.replace(/[^0-9]/g, ''))
      : target;
    
    if (isNaN(numericTarget)) {
      setCount(target);
      return;
    }

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing: ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, isActive]);
  
  return count;
}

export default function StatCard({
  title,
  value,
  badge,
  badgeType = 'success',
  icon: Icon,
  darkBg = false,
  prefix = '',
  suffix = '',
  delay = 0,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Helper to determine accent color based on title
  let accentColor = 'blue';
  if (title?.toLowerCase().includes('volume') || title?.toLowerCase().includes('liter')) accentColor = 'cyan';
  else if (title?.toLowerCase().includes('transaksi')) accentColor = 'violet';
  else if (title?.toLowerCase().includes('pompa')) accentColor = 'emerald';
  else if (title?.toLowerCase().includes('tank') || title?.toLowerCase().includes('tangki')) accentColor = 'teal';
  else if (title?.toLowerCase().includes('pengeluaran') || title?.toLowerCase().includes('gagal')) accentColor = 'red';
  else if (title?.toLowerCase().includes('tunai') && !title?.toLowerCase().includes('non')) accentColor = 'emerald';

  const accentClasses = {
    blue: { border: 'border-l-2 border-l-blue-400', iconBg: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600' },
    cyan: { border: 'border-l-2 border-l-cyan-400', iconBg: 'bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-600' },
    violet: { border: 'border-l-2 border-l-violet-400', iconBg: 'bg-gradient-to-br from-violet-50 to-violet-100 text-violet-600' },
    emerald: { border: 'border-l-2 border-l-emerald-400', iconBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600' },
    teal: { border: 'border-l-2 border-l-teal-400', iconBg: 'bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600' },
    red: { border: 'border-l-2 border-l-red-400', iconBg: 'bg-gradient-to-br from-red-50 to-red-100 text-red-600' },
  };
  const accent = accentClasses[accentColor];


  // Intersection observer — animasi muncul saat card masuk viewport
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const badgeColors = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger:  'bg-red-100 text-red-700',
    info:    'bg-blue-100 text-blue-700',
  };

  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9]/g, ''));
  const count = useCountUp(numericValue, 1500, visible);

  // Format angka sesuai prefix
  const formatCount = () => {
    if (prefix === 'Rp' || String(value).includes('Rp')) {
      return 'Rp ' + count.toLocaleString('id-ID');
    }
    if (suffix === 'L' || String(value).includes(' L')) {
      return count.toLocaleString('id-ID') + ' L';
    }
    return count.toLocaleString('id-ID');
  };

  const displayValue = typeof value === 'number' || (typeof value === 'string' && !isNaN(parseFloat(String(value).replace(/[^0-9]/g, ''))))
    ? formatCount()
    : value;

  return (
    <div
      ref={ref}
      className={`
        rounded-xl p-5 card-hover cursor-default relative overflow-hidden
        ${darkBg
          ? 'bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/25 border-none'
          : `bg-white border-y border-r border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 ${accent.border}`
        }
        ${visible ? 'animate-fade-in-up' : 'opacity-0'}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {darkBg && (
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      )}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <p className={`text-sm font-semibold ${darkBg ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </p>
        {Icon && (
          <div className={`p-2 rounded-xl ${darkBg ? 'bg-white/20 text-white' : accent.iconBg}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
      
      <p className={`text-[28px] leading-tight font-bold mb-4 animate-count-up ${darkBg ? 'text-white' : 'text-gray-900'}`}>
        {displayValue}
      </p>
      
      {badge && (
        <div className="flex items-center gap-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
            darkBg ? 'text-green-300 bg-transparent px-0' : badgeColors[badgeType]
          }`}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-45"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            {badge.replace('+', '')}
          </span>
        </div>
      )}
    </div>
  );
}
