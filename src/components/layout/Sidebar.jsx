import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { currentUser, spbuInfo } from '../../data/mockData';
import { images } from '../../assets/images';
import {
  LayoutDashboard, Fuel, Droplets, Users, Wrench, ShoppingCart, CreditCard, BarChart3, Landmark, FileBarChart, Settings, X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuGroups = [
    {
      title: 'OPERASIONAL',
      items: [
        { path: '/', label: 'Dashboard Utama', icon: LayoutDashboard },
        { path: '/operasional/pompa-nozzle', label: 'Manajemen Pompa', icon: Fuel },
        { path: '/operasional/stok-bbm', label: 'Tangki & Stok BBM', icon: Droplets },
      ]
    },
    {
      title: 'SUMBER DAYA MANUSIA',
      items: [
        { path: '/manajemen/sdm-karyawan', label: 'SDM & Shift', icon: Users },
      ]
    },
    {
      title: 'ASET & PEMELIHARAAN',
      items: [
        { path: '/manajemen/maintenance-aset', label: 'Aset & Maintenance', icon: Wrench },
      ]
    },
    {
      title: 'PENGADAAN',
      items: [
        { path: '/manajemen/supplier-pengadaan', label: 'Procurement & Gudang', icon: ShoppingCart },
      ]
    },
    {
      title: 'PENJUALAN',
      items: [
        { path: '/operasional/transaksi-pos', label: 'POS / Kasir', icon: CreditCard },
        { path: '/operasional/pembayaran', label: 'Transaksi & Analitik', icon: BarChart3 },
      ]
    },
    {
      title: 'KEUANGAN',
      items: [
        { path: '/manajemen/pajak-keuangan', label: 'Keuangan', icon: Landmark },
      ]
    },
    {
      title: 'LAPORAN',
      items: [
        { path: '/manajemen/laporan-compliance', label: 'Laporan & Compliance', icon: FileBarChart },
      ]
    },
    {
      title: 'PENGATURAN',
      items: [
        { path: '/pengaturan/sistem', label: 'Pengaturan Sistem', icon: Settings },
      ]
    },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col h-screen transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-[2px_0_8px_rgba(0,0,0,0.04)]'}`}>
      
      {/* Header logo */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-2 text-white flex-shrink-0">
            <Fuel size={24} />
          </div>
          <div className="overflow-hidden">
            <h1 className="font-bold text-xl text-gray-900 font-['Outfit'] truncate">SPBU</h1>
            <p className="text-xs text-gray-400 font-medium truncate">Control Center</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* User profile strip */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          {currentUser.avatar}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.nama}</p>
          <p className="text-xs text-gray-400 truncate">{currentUser.role}</p>
        </div>
      </div>

      {/* Navigation scroll area */}
      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-2">
            <p className="px-4 pt-4 pb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em]">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item, itemIdx) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={itemIdx}>
                    <NavLink
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 text-[13px] mx-2 transition-colors duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold shadow-md shadow-blue-500/30' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg'
                        }`}
                    >
                      <item.icon size={16} className={isActive ? 'text-white' : 'text-gray-400'} strokeWidth={isActive ? 2.5 : 2} />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer sidebar (info SPBU) */}
      <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-gray-100/50 p-4">
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold text-gray-900 truncate pr-2">{spbuInfo.nama}</p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-green-600">Online</span>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
