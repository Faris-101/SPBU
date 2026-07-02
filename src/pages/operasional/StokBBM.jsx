import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { dataTangki, dataPenerimaanBBM, dataRekonsiliasi } from '../../data/mockData';
import { Package, CheckCircle, AlertTriangle, Database, Plus } from 'lucide-react';

const StokBBM = () => {
  const [activeTab, setActiveTab] = useState('tangki');

  const getProductColor = (produk) => {
    switch(produk) {
      case 'Pertamax': return 'info';
      case 'Pertalite': return 'success';
      case 'Solar': return 'warning';
      case 'Dexlite': return 'primary';
      case 'Pertamina Dex': return 'danger';
      default: return 'info';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aman': return 'success';
      case 'Warning': return 'warning';
      case 'Kritis': return 'danger';
      default: return 'info';
    }
  };

  // Hitung summary losses
  const totalLosses = dataRekonsiliasi.reduce((acc, curr) => acc + curr.selisih, 0);
  const totalVolume = dataRekonsiliasi.reduce((acc, curr) => acc + curr.stokAwal + curr.masuk, 0);
  const percentLosses = totalVolume > 0 ? ((Math.abs(totalLosses) / totalVolume) * 100).toFixed(2) : 0;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Tangki & Stok BBM" 
        subtitle="Monitoring stok, penerimaan, dan rekonsiliasi tangki penyimpanan"
      />

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {[
          { id: 'tangki', label: 'Status Tangki' },
          { id: 'penerimaan', label: 'Penerimaan BBM' },
          { id: 'rekonsiliasi', label: 'Rekonsiliasi & Losses' }
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

      {/* Konten Tab 1: Status Tangki (Sama seperti sebelumnya) */}
      {activeTab === 'tangki' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
              <Plus size={18} /> Update Stok Manual
            </button>
          </div>
          
          {/* Baris 1: Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Stok" value="58.230 L" icon={Database} darkBg={true} />
            <StatCard title="Stok Bersih" value="43.230 L" icon={CheckCircle} />
            <StatCard title="Stok Kritis" value="15.000 L" icon={AlertTriangle} badge="Merah" badgeType="danger" />
            <StatCard title="Total Tangki" value="5" icon={Package} />
          </div>

          {/* Baris 2: Tabel Tangki */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Status Tangki Penyimpanan</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-6 py-4 font-semibold text-gray-700">Tangki</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Produk</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Kapasitas</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Stok Saat Ini</th>
                    <th className="px-6 py-4 font-semibold text-gray-700 w-1/4">Persentase</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataTangki.map((tangki) => {
                    let progressColor = 'bg-green-500';
                    if (tangki.persentase < 60 && tangki.persentase >= 30) progressColor = 'bg-yellow-500';
                    if (tangki.persentase < 30) progressColor = 'bg-red-500';

                    let bgClass = 'hover:bg-gray-50';
                    if (tangki.status === 'Kritis') bgClass = 'bg-red-50 hover:bg-red-100';

                    return (
                      <tr key={tangki.id} className={`text-sm transition-colors ${bgClass}`}>
                        <td className="px-6 py-4 font-medium text-gray-900">Tank {tangki.id}</td>
                        <td className="px-6 py-4">
                          <Badge label={tangki.produk} type={getProductColor(tangki.produk)} />
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {tangki.kapasitas.toLocaleString('id-ID')} L
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {tangki.stok.toLocaleString('id-ID')} L
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className={`${progressColor} h-2 rounded-full`} style={{ width: `${tangki.persentase}%` }}></div>
                            </div>
                            <span className="text-xs font-semibold text-gray-700 min-w-[32px]">{tangki.persentase}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge label={tangki.status} type={getStatusColor(tangki.status)} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Baris 3: Riwayat Penerimaan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Riwayat Penerimaan BBM Terbaru</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-6 py-3 font-semibold text-gray-700">Tanggal</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">No. Surat Jalan</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Supplier</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Produk</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Volume (L)</th>
                    <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-6 py-4 text-gray-500">29 Okt 2025, 08:30</td>
                    <td className="px-6 py-4 font-medium text-blue-600">SJ-2910-001</td>
                    <td className="px-6 py-4 text-gray-900">PT Energi Jaya</td>
                    <td className="px-6 py-4"><Badge label="Pertamax" type="info" /></td>
                    <td className="px-6 py-4 font-medium">8.000</td>
                    <td className="px-6 py-4"><Badge label="Selesai" type="success" /></td>
                  </tr>
                  <tr className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-6 py-4 text-gray-500">28 Okt 2025, 14:15</td>
                    <td className="px-6 py-4 font-medium text-blue-600">SJ-2810-004</td>
                    <td className="px-6 py-4 text-gray-900">PT Mitra Bahan Bakar</td>
                    <td className="px-6 py-4"><Badge label="Solar" type="warning" /></td>
                    <td className="px-6 py-4 font-medium">10.000</td>
                    <td className="px-6 py-4"><Badge label="Selesai" type="success" /></td>
                  </tr>
                  <tr className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-6 py-4 text-gray-500">27 Okt 2025, 09:00</td>
                    <td className="px-6 py-4 font-medium text-blue-600">SJ-2710-002</td>
                    <td className="px-6 py-4 text-gray-900">PT Pertamina Retail</td>
                    <td className="px-6 py-4"><Badge label="Pertamina Dex" type="danger" /></td>
                    <td className="px-6 py-4 font-medium">5.000</td>
                    <td className="px-6 py-4"><Badge label="Selesai" type="success" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Konten Tab 2: Penerimaan BBM */}
      {activeTab === 'penerimaan' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-gray-900">Daftar Penerimaan BBM</h3>
              <button 
                onClick={() => alert('Modal Tambah Penerimaan BBM Dibuka!')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300"
              >
                <Plus size={16} /> Catat Penerimaan Baru
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-4 py-3 font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Tanggal</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Supplier</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Produk</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">No. DO</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Jumlah DO (L)</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Diterima (L)</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Selisih</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Tangki Tujuan</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataPenerimaanBBM.map((item, i) => {
                    const selisih = item.jumlahDO - (item.jumlahDiterima || 0);
                    return (
                      <tr key={i} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                        <td className="px-4 py-4 font-medium text-gray-900">{item.id}</td>
                        <td className="px-4 py-4 text-gray-600">{item.tanggal}</td>
                        <td className="px-4 py-4">{item.supplier}</td>
                        <td className="px-4 py-4"><Badge label={item.produk} type={getProductColor(item.produk)} /></td>
                        <td className="px-4 py-4 text-gray-600">{item.noDO}</td>
                        <td className="px-4 py-4 text-right font-medium">{item.jumlahDO.toLocaleString('id-ID')}</td>
                        <td className="px-4 py-4 text-right font-medium">{item.jumlahDiterima ? item.jumlahDiterima.toLocaleString('id-ID') : '-'}</td>
                        <td className={`px-4 py-4 text-right font-bold ${selisih > 0 && item.status !== 'Dijadwalkan' ? 'text-red-500' : 'text-gray-600'}`}>
                           {item.status === 'Dijadwalkan' ? '-' : selisih.toLocaleString('id-ID')}
                        </td>
                        <td className="px-4 py-4 text-gray-600">{item.tangkiTujuan}</td>
                        <td className="px-4 py-4">
                          <Badge label={item.status} type={item.status === 'Selesai' ? 'success' : 'info'} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Konten Tab 3: Rekonsiliasi & Losses */}
      {activeTab === 'rekonsiliasi' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-5">Data Rekonsiliasi Harian</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-4 py-3 font-semibold text-gray-700">Tanggal</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Produk</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Stok Awal</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Masuk</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Keluar</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Stok Akhir (Sistem)</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Stok Akhir (Sensor)</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Selisih</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataRekonsiliasi.map((item, i) => (
                    <tr key={i} className={`text-sm transition-colors ${item.statusSelisih === 'Perlu Cek' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-4 text-gray-600">{item.tanggal}</td>
                      <td className="px-4 py-4"><Badge label={item.produk} type={getProductColor(item.produk)} /></td>
                      <td className="px-4 py-4 text-right">{item.stokAwal.toLocaleString('id-ID')}</td>
                      <td className="px-4 py-4 text-right text-green-600">+{item.masuk.toLocaleString('id-ID')}</td>
                      <td className="px-4 py-4 text-right text-red-600">-{item.keluar.toLocaleString('id-ID')}</td>
                      <td className="px-4 py-4 text-right font-medium">{item.stokAkhirSistem.toLocaleString('id-ID')}</td>
                      <td className="px-4 py-4 text-right font-medium text-blue-600">{item.stokAkhirSensor.toLocaleString('id-ID')}</td>
                      <td className={`px-4 py-4 text-right font-bold ${item.selisih < 0 ? 'text-red-500' : 'text-gray-900'}`}>
                        {item.selisih}
                      </td>
                      <td className="px-4 py-4">
                        <Badge label={item.statusSelisih} type={item.statusSelisih === 'Perlu Cek' ? 'warning' : 'success'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between border-l-4 border-l-red-500">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Total Losses Bulan Ini</h3>
              <p className="text-gray-500 text-sm mt-1">
                Persentase losses berdasarkan perbandingan data sistem vs sensor
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-red-600">{Math.abs(totalLosses).toLocaleString('id-ID')} L</p>
              <p className="text-sm font-medium text-gray-600 mt-1">{percentLosses}% dari total volume</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StokBBM;
