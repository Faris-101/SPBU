import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { dataPompa } from '../../data/mockData';
import { Fuel, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const PompaNozzle = () => {
  const aktif = dataPompa.filter(p => p.status === 'Aktif').length;
  const standby = dataPompa.filter(p => p.status === 'Standby').length;
  const offline = dataPompa.filter(p => p.status === 'Offline').length;

  const getProductColor = (produk) => {
    switch(produk) {
      case 'Pertamax': return 'info';
      case 'Pertalite': return 'success';
      case 'Solar': return 'warning';
      case 'Dexlite': return 'primary'; // Or purple if added to Badge
      case 'Pertamina Dex': return 'danger';
      default: return 'info';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aktif': return 'success';
      case 'Standby': return 'warning';
      case 'Offline': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Pompa & Nozzle" subtitle="Monitoring status dan aktivitas pompa" />

      {/* Baris 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pompa" value={dataPompa.length} icon={Fuel} />
        <StatCard title="Aktif" value={aktif} badge="Normal" badgeType="success" icon={CheckCircle} />
        <StatCard title="Standby" value={standby} badge="Perhatian" badgeType="warning" icon={Clock} />
        <StatCard title="Offline" value={offline} badge="Kritis" badgeType="danger" icon={AlertCircle} />
      </div>

      {/* Baris 2: Grid Pompa */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dataPompa.map((pompa, index) => (
          <div
            key={pompa.id}
            className={`
              relative rounded-xl p-4 border card-hover cursor-pointer
              animate-fade-in-up
              ${pompa.status === 'Aktif'    ? 'bg-white border-green-200' : ''}
              ${pompa.status === 'Standby'  ? 'bg-yellow-50 border-yellow-200' : ''}
              ${pompa.status === 'Offline'  ? 'bg-red-50 border-red-200' : ''}
            `}
            style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}
          >
            {/* Status dot */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">{pompa.nama}</span>
              <span className={`
                w-2.5 h-2.5 rounded-full
                ${pompa.status === 'Aktif'   ? 'bg-green-500 animate-pulse' : ''}
                ${pompa.status === 'Standby' ? 'bg-yellow-500' : ''}
                ${pompa.status === 'Offline' ? 'bg-red-500' : ''}
              `} />
            </div>

            {/* Produk badge */}
            <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-2 font-medium bg-blue-100 text-blue-700">
              {pompa.produk}
            </span>

            {/* Nozzle */}
            <p className="text-xs text-gray-400 mb-3">
              Nozzle: {pompa.nozzle.join(', ')}
            </p>

            {/* Total penjualan */}
            <p className="text-sm font-bold text-gray-800">
              {pompa.status !== 'Offline'
                ? 'Rp ' + pompa.totalHari.toLocaleString('id-ID')
                : '—'
              }
            </p>
            <p className="text-xs text-gray-400">hari ini</p>

            {/* Status label */}
            <div className={`
              absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full
              ${pompa.status === 'Aktif'   ? 'bg-green-100 text-green-700' : ''}
              ${pompa.status === 'Standby' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${pompa.status === 'Offline' ? 'bg-red-100 text-red-700 animate-glow-pulse' : ''}
            `}>
              {pompa.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PompaNozzle;
