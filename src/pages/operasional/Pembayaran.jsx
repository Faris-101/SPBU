import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { transaksiTerbaru, grafikMingguan, distribusiProduk } from '../../data/mockData';
import { FileText, Banknote, CreditCard, Smartphone, XCircle, Download, TrendingUp, Droplet } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const Pembayaran = () => {
  const [activeTab, setActiveTab] = useState('riwayat');
  const [filterMetode, setFilterMetode] = useState('Semua');

  const tabsMetode = ['Semua', 'Tunai', 'QRIS', 'Kartu', 'E-Wallet'];

  const distributionData = [
    { name: 'Tunai', value: 34, color: '#10B981' },
    { name: 'QRIS', value: 28, color: '#3B82F6' },
    { name: 'Kartu', value: 22, color: '#F59E0B' },
    { name: 'E-Wallet', value: 16, color: '#8B5CF6' },
  ];

  const filteredTransaksi = filterMetode === 'Semua' 
    ? transaksiTerbaru 
    : transaksiTerbaru.filter(t => t.metode === filterMetode);

  const getMethodIcon = (metode) => {
    switch(metode) {
      case 'Tunai': return <Banknote size={14} />;
      case 'QRIS': return <span className="font-bold text-[10px]">QR</span>;
      case 'Kartu': return <CreditCard size={14} />;
      case 'E-Wallet': return <Smartphone size={14} />;
      default: return null;
    }
  };

  const formatRupiah = (angka) => 'Rp ' + (angka / 1000000).toLocaleString('id-ID') + ' Jt';

  return (
    <div className="space-y-6">
      <PageHeader title="Transaksi & Analitik" subtitle="Rekapitulasi metode pembayaran dan analitik penjualan" />

      {/* Main Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {[
          { id: 'riwayat', label: 'Riwayat Transaksi' },
          { id: 'analitik', label: 'Analitik Penjualan' }
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

      {activeTab === 'riwayat' && (
        <div className="space-y-6">
          {/* Tabs Metode (Internal) */}
          <div className="flex space-x-1 border-b border-gray-200">
            {tabsMetode.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterMetode(tab)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 relative -mb-[1px] ${
                  filterMetode === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Baris 1: Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Pembayaran Hari Ini" value="Rp 152.850.000" icon={FileText} darkBg={true} />
            <StatCard title="Tunai" value="Rp 52.400.000" badge="34%" badgeType="success" icon={Banknote} />
            <StatCard title="Non-Tunai" value="Rp 100.450.000" badge="66%" badgeType="primary" icon={CreditCard} />
            <StatCard title="Transaksi Gagal" value="3" badge="Hari ini" badgeType="danger" icon={XCircle} />
          </div>

          {/* Baris 2: 2 Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Kiri: Pie Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:col-span-1">
              <h3 className="font-bold text-gray-900 mb-4">Distribusi Pembayaran</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Kanan: Tabel Transaksi */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2 flex flex-col">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">
                  Transaksi {filterMetode !== 'Semua' ? `Metode ${filterMetode}` : 'Terbaru'}
                </h3>
              </div>
              
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                      <th className="px-5 py-3 font-semibold text-gray-700">No. Transaksi</th>
                      <th className="px-5 py-3 font-semibold text-gray-700">Waktu</th>
                      <th className="px-5 py-3 font-semibold text-gray-700">Produk</th>
                      <th className="px-5 py-3 font-semibold text-gray-700">Metode</th>
                      <th className="px-5 py-3 font-semibold text-gray-700 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTransaksi.map((trx, idx) => (
                      <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                        <td className="px-5 py-3 font-medium text-blue-600">{trx.id}</td>
                        <td className="px-5 py-3 text-gray-500">{trx.waktu}</td>
                        <td className="px-5 py-3">
                          <span className="font-medium text-gray-900">{trx.produk}</span>
                          <span className="text-gray-500 ml-1">({trx.jumlah})</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                            {getMethodIcon(trx.metode)}
                            {trx.metode}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-bold text-gray-900 text-right">
                          Rp {trx.total.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                    {filteredTransaksi.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-5 py-8 text-center text-gray-500">
                          Tidak ada data transaksi untuk metode {filterMetode}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {activeTab === 'analitik' && (
        <div className="space-y-6 animate-fade-in">
          {/* Baris 1: Filter + Stat Cards */}
          <div className="flex flex-col xl:flex-row gap-6">
            
            {/* Filter Section */}
            <div className="w-full xl:w-1/4 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
              <h3 className="font-bold text-gray-900 mb-4">Filter Laporan</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Periode</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 cursor-pointer">
                    <option value="mingguan">Mingguan (20 - 26 Okt 2025)</option>
                    <option value="bulanan">Bulan Ini (Oktober 2025)</option>
                    <option value="harian">Hari Ini (29 Okt 2025)</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm">
                    <Download size={16} /> Export PDF / Excel
                  </button>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="w-full xl:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="Total Penjualan" 
                value="Rp 1.070.000.000" 
                badge="+12%" 
                badgeType="success" 
                icon={TrendingUp} 
              />
              <StatCard 
                title="Total Volume" 
                value="85.230 L" 
                badge="+8%" 
                badgeType="success" 
                icon={Droplet} 
              />
              <StatCard 
                title="Total Transaksi" 
                value="7.248" 
                badge="+5%" 
                badgeType="success" 
                icon={CreditCard} 
              />
            </div>
          </div>

          {/* Baris 2: Charts Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Bar Chart Kiri */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:col-span-2">
              <h3 className="font-bold text-gray-900 mb-6">Penjualan Harian (Minggu Ini)</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={grafikMingguan} margin={{ top: 10, right: 10, left: 20, bottom: 0 }} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="hari" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={formatRupiah}
                      dx={-10}
                    />
                    <RechartsTooltip 
                      cursor={{ fill: '#F3F4F6' }}
                      formatter={(value) => ['Rp ' + value.toLocaleString('id-ID'), 'Penjualan']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="penjualan" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart Kanan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:col-span-1 flex flex-col">
              <h3 className="font-bold text-gray-900 mb-6">Penjualan per Produk</h3>
              <div className="h-64 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribusiProduk}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="persen"
                      nameKey="produk"
                    >
                      {distribusiProduk.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.warna} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3">
                {distribusiProduk.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.warna }}></span>
                      <span className="text-gray-600 truncate">{item.produk}</span>
                    </div>
                    <span className="font-bold text-gray-900">{item.persen}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pembayaran;
