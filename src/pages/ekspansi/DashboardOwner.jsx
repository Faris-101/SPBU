import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import { dataOwner, performaOutlet } from '../../data/mockData';
import { Building2, TrendingUp, Droplet, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardOwner = () => {
  const formatRupiah = (angka) => 'Rp ' + (angka / 1000000000).toLocaleString('id-ID') + ' M';

  const topProduk = [
    { nama: 'Pertamax', persen: 40, warna: 'bg-blue-600' },
    { nama: 'Pertalite', persen: 30, warna: 'bg-green-500' },
    { nama: 'Solar', persen: 20, warna: 'bg-yellow-500' },
    { nama: 'Dexlite', persen: 10, warna: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard Owner" 
        subtitle="Ringkasan performa seluruh jaringan SPBU"
        action={
          <select className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 outline-none transition-colors shadow-sm">
            <option value="bulan_ini">Bulan Ini</option>
            <option value="bulan_lalu">Bulan Lalu</option>
            <option value="tahun_ini">Tahun Ini</option>
          </select>
        }
      />

      {/* Baris 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Omzet" 
          value="Rp 5.270.000.000" 
          badge="+12,5%" 
          badgeType="success" 
          icon={TrendingUp} 
        />
        <StatCard 
          title="Total Volume" 
          value="425.230 L" 
          badge="+9,2%" 
          badgeType="success" 
          icon={Droplet} 
        />
        <StatCard 
          title="Total Transaksi" 
          value="32.450" 
          badge="+14,4%" 
          badgeType="success" 
          icon={CreditCard} 
        />
        <StatCard 
          title="Total Outlet" 
          value="12" 
          badge="Aktif" 
          badgeType="success" 
          icon={Building2} 
        />
      </div>

      {/* Baris 2: 2 Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Panel Kiri: Grafik Outlet */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 xl:col-span-2 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6">Performa Outlet</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performaOutlet} margin={{ top: 10, right: 10, left: 20, bottom: 0 }} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="nama" 
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
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  formatter={(value) => ['Rp ' + (value/1000000).toLocaleString('id-ID') + ' Jt', 'Omzet']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="omzet" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel Kanan: Top Produk */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 xl:col-span-1">
          <h3 className="font-bold text-gray-900 mb-6">Top Produk</h3>
          <div className="space-y-6">
            {topProduk.map((produk, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${produk.warna}`}></div>
                    <p className="font-semibold text-gray-900 text-sm">{produk.nama}</p>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{produk.persen}%</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${produk.warna} h-2 rounded-full`} style={{ width: `${produk.persen}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOwner;
