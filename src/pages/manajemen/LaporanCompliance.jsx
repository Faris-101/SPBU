import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { FileBarChart, Shield, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { 
  dataIzinOperasional, 
  dashboardKPI, 
  dataPompa, 
  dataRekonsiliasi 
} from '../../data/mockData';

// Fallback jika dataLaporanPertamina tidak ada di mockData
import * as mockData from '../../data/mockData';
const dataLaporanPertamina = mockData.dataLaporanPertamina || [
  { periode: '28 Okt 2025', penjualanDilaporkan: 'Rp 152.850.000', volume: '12.450 L', batasWaktu: '29 Okt 2025', status: 'Selesai' },
  { periode: '29 Okt 2025', penjualanDilaporkan: '-', volume: '-', batasWaktu: '30 Okt 2025', status: 'Belum Dikirim' }
];

const LaporanCompliance = () => {
  const [activeTab, setActiveTab] = useState('operasional');

  // Cari apakah ada izin yang segera berakhir
  const izinSegeraBerakhir = dataIzinOperasional?.some(izin => izin.status === 'Segera Berakhir');

  const totalLosses = dataRekonsiliasi?.reduce((acc, curr) => acc + curr.selisih, 0) || 0;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aktif': return 'success';
      case 'Segera Berakhir': return 'warning';
      case 'Kadaluarsa': return 'danger';
      case 'Selesai': return 'success';
      case 'Belum Dikirim': return 'secondary';
      default: return 'primary';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Laporan & Compliance" 
        subtitle="Laporan operasional harian dan kewajiban regulasi SPBU" 
      />

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-5">
        {[
          { id: 'operasional', label: 'Laporan Operasional' },
          { id: 'compliance', label: 'Regulasi & Compliance' }
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

      {activeTab === 'operasional' && (
        <div className="space-y-6">
          {/* Laporan Harian SPBU */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <FileBarChart className="text-blue-600" size={24} />
                <h3 className="font-bold text-gray-900">Laporan Harian SPBU</h3>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
                <Download size={16} /> Download Laporan Harian (PDF)
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Penjualan Hari Ini</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardKPI?.[0]?.value || 'Rp 0'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Volume Penjualan</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardKPI?.[1]?.value || '0 L'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Jumlah Transaksi</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardKPI?.[2]?.value || '0'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Laporan Kinerja Pompa */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Laporan Kinerja Pompa</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                      <th className="px-5 py-3 font-semibold text-gray-700">Nama Pompa</th>
                      <th className="px-5 py-3 font-semibold text-gray-700 text-right">Volume (L)</th>
                      <th className="px-5 py-3 font-semibold text-gray-700 text-center">Status Uptime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dataPompa?.map((pompa, idx) => (
                      <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                        <td className="px-5 py-3 font-medium text-gray-900">Pompa {pompa.id}</td>
                        <td className="px-5 py-3 text-right font-bold text-gray-900">{pompa.volumeHariIni?.toLocaleString('id-ID') || 0} L</td>
                        <td className="px-5 py-3 text-center">
                          {pompa.status === 'Aktif' ? (
                            <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium text-xs">
                              <CheckCircle2 size={14} /> 100%
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full font-medium text-xs">
                              <AlertTriangle size={14} /> Maintenance
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Laporan Selisih BBM */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Laporan Selisih BBM (Losses)</h3>
              </div>
              <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <AlertTriangle className="text-red-500" size={32} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Total Losses Bulan Ini</h4>
                <p className="text-4xl font-black text-red-600 mb-2">{Math.abs(totalLosses).toLocaleString('id-ID')} L</p>
                <p className="text-sm text-gray-500">
                  Data diambil dari rekonsiliasi harian antara pencatatan sistem (POS) vs sensor tangki ATG.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          
          {/* Reminder Izin */}
          {izinSegeraBerakhir && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3 shadow-sm animate-fade-in">
              <AlertTriangle className="text-yellow-600 mt-0.5 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-yellow-800 text-sm">Peringatan Jatuh Tempo Izin</h4>
                <p className="text-yellow-700 text-sm mt-0.5">
                  Terdapat izin operasional (seperti Tera Pompa/Metrologi) yang akan berakhir dalam waktu dekat. Harap segera ajukan perpanjangan ke dinas terkait.
                </p>
              </div>
            </div>
          )}

          {/* Laporan ke Pertamina */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <Shield className="text-blue-600" size={24} />
                <h3 className="font-bold text-gray-900">Laporan Penjualan ke Pertamina</h3>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
                Generate & Kirim Laporan
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-6 py-4 font-semibold text-gray-700">Periode</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Total Penjualan Dilaporkan</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Total Volume</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Batas Waktu</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataLaporanPertamina?.map((laporan, idx) => (
                    <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{laporan.periode}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{laporan.penjualanDilaporkan}</td>
                      <td className="px-6 py-4 text-gray-600">{laporan.volume}</td>
                      <td className="px-6 py-4 text-gray-600">{laporan.batasWaktu}</td>
                      <td className="px-6 py-4">
                        <Badge label={laporan.status} type={getStatusColor(laporan.status)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dokumen Izin Operasional */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Dokumen Izin Operasional & Legalitas</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-6 py-4 font-semibold text-gray-700">Jenis Izin</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Nomor Izin</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Masa Berlaku</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataIzinOperasional?.map((izin, idx) => (
                    <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-6 py-4 font-bold text-gray-900">{izin.jenisIzin}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">{izin.nomorIzin}</td>
                      <td className="px-6 py-4 text-gray-600">{izin.masaBerlaku}</td>
                      <td className="px-6 py-4">
                        {izin.status === 'Segera Berakhir' ? (
                           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                             <AlertTriangle size={12} />
                             {izin.status}
                           </div>
                        ) : (
                           <Badge label={izin.status} type={getStatusColor(izin.status)} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default LaporanCompliance;
