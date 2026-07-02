import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { Package, Tags, TrendingUp, DollarSign, Plus } from 'lucide-react';

const ProdukNonBBM = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const tabs = ['Semua', 'Pelumas', 'Minuman', 'Jasa'];

  const dataProduk = [
    { nama: 'Oli Pertamina Fastron 1L', kategori: 'Pelumas', harga: 95000, stok: 48, terjual: 12, pendapatan: 1140000 },
    { nama: 'Oli Shell Helix 1L', kategori: 'Pelumas', harga: 110000, stok: 30, terjual: 8, pendapatan: 880000 },
    { nama: 'Air Mineral 600ml', kategori: 'Minuman', harga: 5000, stok: 120, terjual: 45, pendapatan: 225000 },
    { nama: 'Minuman Isotonik', kategori: 'Minuman', harga: 8000, stok: 80, terjual: 32, pendapatan: 256000 },
    { nama: 'Jasa Tambal Ban', kategori: 'Jasa', harga: 20000, stok: null, terjual: 7, pendapatan: 140000 },
    { nama: 'Jasa Cuci Motor', kategori: 'Jasa', harga: 25000, stok: null, terjual: 5, pendapatan: 125000 },
  ];

  const filteredProduk = activeTab === 'Semua' 
    ? dataProduk 
    : dataProduk.filter(p => p.kategori === activeTab);

  const getKategoriColor = (kategori) => {
    switch(kategori) {
      case 'Pelumas': return 'info';
      case 'Minuman': return 'success';
      case 'Jasa': return 'primary';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Produk Non-BBM" 
        subtitle="Manajemen stok dan penjualan produk selain BBM"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
            <Plus size={18} /> Tambah Produk
          </button>
        }
      />

      {/* Baris 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Produk" value="6" icon={Package} />
        <StatCard title="Kategori" value="3" icon={Tags} badge="Pelumas, Minuman, Jasa" badgeType="info" />
        <StatCard title="Terjual Hari Ini" value="109 item" icon={TrendingUp} badge="+12% dari kemarin" badgeType="success" />
        <StatCard title="Pendapatan Non-BBM" value="Rp 3.450.000" icon={DollarSign} badge="Hari ini" badgeType="success" darkBg={true} />
      </div>

      {/* Baris 2: Filter + Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[400px]">
        {/* Tabs */}
        <div className="flex px-5 pt-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 relative -mb-[1px] ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                <th className="px-6 py-4 font-semibold text-gray-700">Nama Produk</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Kategori</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Harga</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Stok</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Terjual</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Pendapatan</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProduk.map((produk, idx) => (
                <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                  <td className="px-6 py-4 font-medium text-gray-900">{produk.nama}</td>
                  <td className="px-6 py-4">
                    <Badge label={produk.kategori} type={getKategoriColor(produk.kategori)} />
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    Rp {produk.harga.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {produk.stok !== null ? (
                      <span className={produk.stok < 10 ? 'text-red-600 font-bold' : ''}>
                        {produk.stok}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{produk.terjual}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    Rp {produk.pendapatan.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProduk.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    Tidak ada produk di kategori {activeTab}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProdukNonBBM;
