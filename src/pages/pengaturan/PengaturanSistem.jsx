import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { spbuInfo } from '../../data/mockData';
import { Save, Server, Database, CloudRain, Clock } from 'lucide-react';

const PengaturanSistem = () => {
  const [formData, setFormData] = useState({
    nama: spbuInfo.nama,
    nomorPertamina: spbuInfo.nomorPertamina,
    alamat: spbuInfo.alamat,
    telepon: spbuInfo.telepon,
    jamBuka: spbuInfo.jamBuka,
    jamTutup: spbuInfo.jamTutup,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Pengaturan Sistem" 
        subtitle="Konfigurasi profil SPBU dan status sistem"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kiri: Form Profil SPBU (2/3) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Profil SPBU</h3>
          
          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nama SPBU</label>
                <input 
                  type="text" 
                  name="nama"
                  value={formData.nama} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nomor SPBU Pertamina</label>
                <input 
                  type="text" 
                  name="nomorPertamina"
                  value={formData.nomorPertamina} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 text-gray-500"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Alamat</label>
              <textarea 
                name="alamat"
                value={formData.alamat} 
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Telepon</label>
                <input 
                  type="text" 
                  name="telepon"
                  value={formData.telepon} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Jam Buka</label>
                <input 
                  type="time" 
                  name="jamBuka"
                  value={formData.jamBuka} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Jam Tutup</label>
                <input 
                  type="time" 
                  name="jamTutup"
                  value={formData.jamTutup} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
              <Save size={18} /> Simpan Perubahan
            </button>
          </div>
        </div>

        {/* Kanan: Info & Status Sistem (1/3) */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
              <Server size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-0.5">Versi Aplikasi</p>
              <h4 className="font-bold text-gray-900">v1.0.0</h4>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Database size={24} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 mb-0.5">Status Database</p>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900">Terhubung</h4>
                <Badge label="Online" type="success" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-0.5">Backup Terakhir</p>
              <h4 className="font-bold text-gray-900">29 Okt 2025, 03:00</h4>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <CloudRain size={24} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 mb-0.5">Integrasi API</p>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900">Semua Berjalan</h4>
                <Badge label="Sehat" type="success" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PengaturanSistem;
