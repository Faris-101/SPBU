import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { dataEFaktur, listEFaktur } from '../../data/mockData';
import { FileText, CheckCircle, Clock, AlertTriangle, RefreshCw } from 'lucide-react';

const EFaktur = () => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Terkirim': return 'success';
      case 'Pending': return 'warning';
      case 'Gagal': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="e-Faktur" 
        subtitle="Manajemen dan pelaporan faktur pajak ke DJP"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
            <RefreshCw size={18} /> Sinkronisasi
          </button>
        }
      />

      {/* Baris 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Faktur" value={dataEFaktur.totalFaktur.toLocaleString('id-ID')} icon={FileText} />
        <StatCard title="Terkirim" value={dataEFaktur.terkirim.toLocaleString('id-ID')} icon={CheckCircle} badgeType="success" darkBg={true} />
        <StatCard title="Pending" value={dataEFaktur.pending} icon={Clock} badgeType="warning" />
        <StatCard title="Gagal" value={dataEFaktur.gagal} badge="Perlu aksi" badgeType="danger" icon={AlertTriangle} />
      </div>

      {/* Baris 2: Tabel e-Faktur */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Daftar e-Faktur Terbaru</h3>
          <div className="flex gap-2">
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="Semua">Semua Status</option>
              <option value="Terkirim">Terkirim</option>
              <option value="Pending">Pending</option>
              <option value="Gagal">Gagal</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                <th className="px-6 py-4 font-semibold text-gray-700">No. Faktur</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
                <th className="px-6 py-4 font-semibold text-gray-700">NPWP</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Nama Customer</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Total (Rp)</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {listEFaktur.map((faktur, idx) => (
                <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                  <td className="px-6 py-4 font-bold text-blue-600">{faktur.no}</td>
                  <td className="px-6 py-4 text-gray-500">{faktur.tanggal}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono text-xs">{faktur.npwp}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{faktur.nama}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {faktur.total.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <Badge label={faktur.status} type={getStatusColor(faktur.status)} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {faktur.status === 'Gagal' ? (
                      <button className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                        Resend
                      </button>
                    ) : (
                      <button className="text-gray-500 hover:text-blue-600 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        Unduh
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EFaktur;
