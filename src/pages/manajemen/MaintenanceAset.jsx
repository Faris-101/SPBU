import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { dataMaintenance, dataJadwalMaintenance, dataTiketKerusakan } from '../../data/mockData';
import { Settings, Wrench, Clock, CheckCircle, Plus, AlertTriangle } from 'lucide-react';

const MaintenanceAset = () => {
  const [activeTab, setActiveTab] = useState('aset');

  const getStatusColor = (status) => {
    switch(status) {
      case 'Selesai': return 'success';
      case 'Dalam Proses': return 'warning';
      case 'Terjadwal': return 'info';
      default: return 'primary';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Maintenance Aset" 
        subtitle="Jadwal pemeliharaan dan riwayat perbaikan peralatan"
      />

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {[
          { id: 'aset', label: 'Daftar Aset' },
          { id: 'jadwal', label: 'Jadwal Maintenance' },
          { id: 'kerusakan', label: 'Laporan Kerusakan' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 font-semibold text-sm transition-colors ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'aset' && (
        <div className="space-y-6">
          {/* Baris 1: Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Aset" value="12" icon={Settings} />
            <StatCard title="Terjadwal" value="2" badge="Bulan ini" badgeType="info" icon={Clock} />
            <StatCard title="Dalam Proses" value="1" badge="Saat ini" badgeType="warning" icon={Wrench} />
            <StatCard title="Selesai Bulan Ini" value="4" icon={CheckCircle} darkBg={true} />
          </div>

          {/* Baris 2: Tabel Maintenance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Jadwal & Riwayat Maintenance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-6 py-4 font-semibold text-gray-700">Aset</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Jenis Maintenance</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Teknisi</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataMaintenance.map((maint, idx) => (
                    <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-6 py-4 font-bold text-gray-900">{maint.aset}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{maint.jenis}</td>
                      <td className="px-6 py-4 text-gray-600">{maint.tanggal}</td>
                      <td className="px-6 py-4 text-gray-600">{maint.teknisi}</td>
                      <td className="px-6 py-4">
                        <Badge label={maint.status} type={getStatusColor(maint.status)} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jadwal' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Jadwal Maintenance Preventif</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                  <th className="px-6 py-4 font-semibold text-gray-700">Aset</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Jenis Maintenance</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Terakhir Dilakukan</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Jatuh Tempo</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataJadwalMaintenance.map((maint, idx) => (
                  <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-6 py-4 font-bold text-gray-900">{maint.aset}</td>
                    <td className="px-6 py-4 text-gray-600">{maint.jenis}</td>
                    <td className="px-6 py-4 text-gray-600">{maint.terakhir}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{maint.jatuhTempo}</td>
                    <td className="px-6 py-4">
                      {maint.status === 'Mendekati Jatuh Tempo' ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          <AlertTriangle size={12} />
                          {maint.status}
                        </div>
                      ) : (
                        <Badge label={maint.status} type={getStatusColor(maint.status)} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'kerusakan' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Tiket Laporan Kerusakan</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
              <Plus size={16} /> Laporkan Kerusakan
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                  <th className="px-6 py-4 font-semibold text-gray-700">ID Tiket</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Aset</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Masalah</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Dilaporkan Oleh</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Teknisi</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataTiketKerusakan.map((tiket, idx) => {
                  let badgeType = 'info';
                  if (tiket.status === 'Dilaporkan') badgeType = 'secondary';
                  if (tiket.status === 'Sedang Ditangani') badgeType = 'warning';
                  if (tiket.status === 'Selesai') badgeType = 'success';

                  return (
                    <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-6 py-4 font-medium text-blue-600">{tiket.id}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{tiket.aset}</td>
                      <td className="px-6 py-4 text-gray-600">{tiket.masalah}</td>
                      <td className="px-6 py-4 text-gray-600">{tiket.dilaporkanOleh}</td>
                      <td className="px-6 py-4 text-gray-600">{tiket.tanggal}</td>
                      <td className="px-6 py-4 text-gray-600">{tiket.teknisi}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          badgeType === 'secondary' ? 'bg-gray-100 text-gray-700' :
                          badgeType === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {tiket.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceAset;
