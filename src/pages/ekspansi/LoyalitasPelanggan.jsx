import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { dataLoyalitas, dataMember } from '../../data/mockData';
import { Users, Gift, Star, Award, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LoyalitasPelanggan = () => {
  const [activeTab, setActiveTab] = useState('Member');
  const tabs = ['Member', 'Poin', 'Promo'];

  const growthData = [
    { bulan: 'Mei', member: 1800 },
    { bulan: 'Jun', member: 1950 },
    { bulan: 'Jul', member: 2100 },
    { bulan: 'Agu', member: 2150 },
    { bulan: 'Sep', member: 2300 },
    { bulan: 'Okt', member: 2450 },
  ];

  const getTierColor = (tier) => {
    switch(tier) {
      case 'Platinum': return 'primary';
      case 'Gold': return 'warning';
      case 'Silver': return 'info';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Loyalitas Pelanggan" 
        subtitle="Manajemen program membership dan poin pelanggan"
      />

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 relative -mb-[1px] ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Member' && (
        <>
          {/* Baris 1: Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="Total Member" 
              value={dataLoyalitas.totalMember.toLocaleString('id-ID')} 
              badge={`+${dataLoyalitas.growthMember}%`} 
              badgeType="success" 
              icon={Users} 
            />
            <StatCard 
              title="Total Poin Beredar" 
              value={dataLoyalitas.totalPoin.toLocaleString('id-ID')} 
              icon={Star} 
            />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex justify-between">
              <div>
                <p className="text-sm font-medium mb-1 text-gray-500">Promo Aktif</p>
                <h3 className="text-2xl font-bold text-gray-900">{dataLoyalitas.promoAktif}</h3>
                <div className="mt-4"><Badge label="Sedang berjalan" type="info" /></div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs text-gray-500 font-medium mb-1">Redemption Rate</p>
                <div className="w-20 h-20 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { value: dataLoyalitas.redemptionRate, fill: '#3B82F6' },
                          { value: 100 - dataLoyalitas.redemptionRate, fill: '#E5E7EB' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={35}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">{dataLoyalitas.redemptionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Baris 2: 2 Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Panel Kiri: Grafik Pertumbuhan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:col-span-1">
              <h3 className="font-bold text-gray-900 mb-6">Pertumbuhan Member</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="bulan" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      width={40}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="member" 
                      stroke="#3B82F6" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Lihat detail tren</button>
              </div>
            </div>

            {/* Panel Kanan: Tabel Member */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:col-span-2 flex flex-col">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Daftar Member Terbaru</h3>
                <input 
                  type="text" 
                  placeholder="Cari member..." 
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48 lg:w-64"
                />
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                      <th className="px-5 py-3 font-semibold text-gray-700">Nama</th>
                      <th className="px-5 py-3 font-semibold text-gray-700">No. Member</th>
                      <th className="px-5 py-3 font-semibold text-gray-700">Poin</th>
                      <th className="px-5 py-3 font-semibold text-gray-700">Tier</th>
                      <th className="px-5 py-3 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dataMember.map((member, idx) => (
                      <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                        <td className="px-5 py-3 font-medium text-gray-900">{member.nama}</td>
                        <td className="px-5 py-3 text-gray-500 font-mono text-xs">{member.noMember}</td>
                        <td className="px-5 py-3 font-bold text-blue-600">{member.poin.toLocaleString('id-ID')}</td>
                        <td className="px-5 py-3">
                          <Badge label={member.tier} type={getTierColor(member.tier)} />
                        </td>
                        <td className="px-5 py-3">
                          <Badge 
                            label={member.status} 
                            type={member.status === 'Aktif' ? 'success' : 'danger'} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50 text-center mt-auto">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                  Lihat semua member
                </button>
              </div>
            </div>

          </div>
        </>
      )}
      
      {activeTab !== 'Member' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
          Modul {activeTab} sedang dalam pengembangan
        </div>
      )}

    </div>
  );
};

export default LoyalitasPelanggan;
