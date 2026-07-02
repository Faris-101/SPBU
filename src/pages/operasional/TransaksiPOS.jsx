import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { dataPompa, transaksiTerbaru } from '../../data/mockData';
import { Search, Banknote, QrCode, CreditCard, Smartphone, CheckCircle } from 'lucide-react';

const TransaksiPOS = () => {
  const [pompaSelected, setPompaSelected] = useState('');
  const [metode, setMetode] = useState('Tunai');
  const [liter, setLiter] = useState('');
  const [uangTunai, setUangTunai] = useState('');
  const [showToast, setShowToast] = useState(false);

  const hargaBBM = {
    'Pertamax': 15000,
    'Pertalite': 10000,
    'Solar': 6600,
    'Dexlite': 13600,
    'Pertamina Dex': 13150
  };

  const selectedPompaData = dataPompa.find(p => p.nama === pompaSelected);
  const produk = selectedPompaData ? selectedPompaData.produk : '';
  const hargaPerLiter = produk ? hargaBBM[produk] : 0;
  const total = Number(liter) * hargaPerLiter;
  const kembalian = (metode === 'Tunai' && uangTunai) ? Number(uangTunai) - total : 0;

  const getProductColor = (prod) => {
    switch(prod) {
      case 'Pertamax': return 'info';
      case 'Pertalite': return 'success';
      case 'Solar': return 'warning';
      case 'Dexlite': return 'primary';
      case 'Pertamina Dex': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Transaksi & POS" subtitle="Manajemen transaksi penjualan BBM" />

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Kolom Kiri: Form Transaksi Aktif */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Transaksi Aktif</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">No. Transaksi</label>
                <input 
                  type="text" 
                  value="INV-291025-009" 
                  readOnly 
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Pompa</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={pompaSelected}
                  onChange={(e) => setPompaSelected(e.target.value)}
                >
                  <option value="">-- Pilih Pompa --</option>
                  {dataPompa.map(p => (
                    <option key={p.id} value={p.nama}>{p.nama} ({p.produk})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Produk</label>
                  <input 
                    type="text" 
                    value={produk} 
                    readOnly 
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Harga / L</label>
                  <input 
                    type="text" 
                    value={hargaPerLiter ? `Rp ${hargaPerLiter.toLocaleString('id-ID')}` : ''} 
                    readOnly 
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Liter</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-8"
                    placeholder="0"
                    value={liter}
                    onChange={(e) => setLiter(e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">L</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-xl font-bold text-gray-900">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Metode Pembayaran</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setMetode('Tunai')}
                    className={`flex items-center gap-2 justify-center py-2 px-3 rounded-lg border text-sm transition-colors ${metode === 'Tunai' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Banknote size={16} /> Tunai
                  </button>
                  <button 
                    onClick={() => setMetode('QRIS')}
                    className={`flex items-center gap-2 justify-center py-2 px-3 rounded-lg border text-sm transition-colors ${metode === 'QRIS' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <QrCode size={16} /> QRIS
                  </button>
                  <button 
                    onClick={() => setMetode('Kartu')}
                    className={`flex items-center gap-2 justify-center py-2 px-3 rounded-lg border text-sm transition-colors ${metode === 'Kartu' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <CreditCard size={16} /> Kartu
                  </button>
                  <button 
                    onClick={() => setMetode('E-Wallet')}
                    className={`flex items-center gap-2 justify-center py-2 px-3 rounded-lg border text-sm transition-colors ${metode === 'E-Wallet' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Smartphone size={16} /> E-Wallet
                  </button>
                </div>
              </div>

              {metode === 'Tunai' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Uang Tunai</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Rp</span>
                      <input 
                        type="number" 
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="0"
                        value={uangTunai}
                        onChange={(e) => setUangTunai(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Kembalian</label>
                    <input 
                      type="text" 
                      value={`Rp ${kembalian > 0 ? kembalian.toLocaleString('id-ID') : 0}`} 
                      readOnly 
                      className={`w-full px-3 py-2 rounded-lg text-sm font-bold bg-gray-50 border border-gray-200 ${kembalian >= 0 ? 'text-green-600' : 'text-red-500'}`}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                  Batal
                </button>
                <button 
                  onClick={() => {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                    setPompaSelected('');
                    setMetode('Tunai');
                    setLiter('');
                    setUangTunai('');
                  }}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300"
                >
                  Bayar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Riwayat Transaksi */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-bold text-gray-900">Riwayat Transaksi</h3>
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari transaksi..." 
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-5 py-3 font-semibold text-gray-700">No</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Produk</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Total</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Metode</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Waktu</th>
                    <th className="px-5 py-3 font-semibold text-gray-700 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transaksiTerbaru.map((trx, idx) => (
                    <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-5 py-3 font-medium text-gray-900">{trx.id}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{trx.produk}</span>
                          <span className="text-xs text-gray-500">({trx.jumlah})</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-semibold text-gray-900">
                        Rp {trx.total.toLocaleString('id-ID')}
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {trx.metode === 'Tunai' && <Banknote size={12} />}
                          {trx.metode === 'QRIS' && <QrCode size={12} />}
                          {trx.metode === 'Kartu' && <CreditCard size={12} />}
                          {trx.metode === 'E-Wallet' && <Smartphone size={12} />}
                          {trx.metode}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{trx.waktu}</td>
                      <td className="px-5 py-3 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs hover:underline">
                          Cetak Struk
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center mt-auto">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                Lihat semua transaksi
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-4 rounded-xl shadow-lg animate-fade-in">
          <CheckCircle size={20} />
          <div>
            <p className="font-semibold text-sm">Transaksi Berhasil!</p>
            <p className="text-xs text-green-100">Pembayaran telah diproses dan struk dicetak.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransaksiPOS;
