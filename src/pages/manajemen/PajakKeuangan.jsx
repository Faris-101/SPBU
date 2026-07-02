import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { 
  dataKasBank, mutasiKasBank, dataPiutang, dataHutang, dataLabaRugi 
} from '../../data/mockData';
import { 
  DollarSign, ArrowUpRight, ArrowDownRight, FileText, Download, Wallet, CreditCard, FileBarChart, Plus
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';
import { FormField, inputClass, selectClass } from '../../components/ui/FormField';

const PajakKeuangan = () => {
  const [activeTab, setActiveTab] = useState('kas');
  const [listMutasi, setListMutasi] = useState(mutasiKasBank);
  const [showModalMutasi, setShowModalMutasi] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [formMutasi, setFormMutasi] = useState({ keterangan: '', tipe: 'Masuk', jumlah: '' });

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Lunas': return 'success';
      case 'Belum Lunas': return 'warning';
      case 'Jatuh Tempo': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Keuangan & Pajak" 
        subtitle="Manajemen kas, bank, hutang piutang, dan laporan laba rugi"
      />

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {[
          { id: 'kas', label: 'Kas & Bank' },
          { id: 'piutang', label: 'Hutang & Piutang' },
          { id: 'laporan', label: 'Laporan Keuangan' }
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

      {activeTab === 'kas' && (
        <div className="space-y-6">
          {/* Baris 1: Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Saldo Kas Hari Ini" value={formatRupiah(dataKasBank.saldoKasHariIni)} icon={Wallet} darkBg={true} />
            <StatCard title="Saldo Bank" value={formatRupiah(dataKasBank.saldoBank)} icon={CreditCard} />
            <StatCard title="Setoran Hari Ini" value={formatRupiah(dataKasBank.setoranHariIni)} icon={ArrowUpRight} badgeType="success" />
            <StatCard title="Pengeluaran Hari Ini" value={formatRupiah(dataKasBank.pengeluaranHariIni)} icon={ArrowDownRight} badgeType="danger" />
          </div>

          {/* Baris 2: Tabel Mutasi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Riwayat Mutasi Kas & Bank</h3>
              <button onClick={() => { setFormMutasi({ keterangan: '', tipe: 'Masuk', jumlah: '' }); setShowModalMutasi(true); }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
                <Plus size={16} /> Catat Transaksi
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Keterangan</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Tipe</th>
                    <th className="px-6 py-4 font-semibold text-gray-700 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {listMutasi.map((mutasi, idx) => (
                    <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-6 py-4 text-gray-500">{mutasi.tanggal}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{mutasi.keterangan}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          mutasi.tipe === 'Masuk' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {mutasi.tipe}
                        </span>
                      </td>
                      <td className={`px-6 py-4 font-bold text-right ${mutasi.tipe === 'Masuk' ? 'text-green-600' : 'text-red-600'}`}>
                        {mutasi.tipe === 'Masuk' ? '+' : '-'}{formatRupiah(mutasi.jumlah)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'piutang' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Piutang Pelanggan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Piutang Pelanggan</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-4 py-3 font-semibold text-gray-700">Pelanggan</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Jenis</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Jumlah</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Jatuh Tempo</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataPiutang.map((piutang, idx) => (
                    <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-4 py-3 font-medium text-gray-900">{piutang.pelanggan}</td>
                      <td className="px-4 py-3 text-gray-600">{piutang.jenis}</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">{formatRupiah(piutang.jumlah)}</td>
                      <td className="px-4 py-3 text-gray-600">{piutang.jatuhTempo}</td>
                      <td className="px-4 py-3">
                        <Badge label={piutang.status} type={getStatusColor(piutang.status)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hutang Supplier */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Hutang ke Supplier</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-4 py-3 font-semibold text-gray-700">Supplier</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Keterangan</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Jumlah</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Jatuh Tempo</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataHutang.map((hutang, idx) => (
                    <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-4 py-3 font-medium text-gray-900">{hutang.supplier}</td>
                      <td className="px-4 py-3 text-gray-600">{hutang.keterangan}</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">{formatRupiah(hutang.jumlah)}</td>
                      <td className="px-4 py-3 text-gray-600">{hutang.jatuhTempo}</td>
                      <td className="px-4 py-3">
                        <Badge label={hutang.status} type={getStatusColor(hutang.status)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'laporan' && (
        <div className="space-y-6">
          <div className="flex justify-end gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200 shadow-sm">
              <Download size={16} /> Export ke PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm">
              <FileBarChart size={16} /> Export ke Excel
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Laba Rugi (Profit & Loss)</h2>
              <p className="text-gray-500 mt-1">Periode: {dataLabaRugi.periode}</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-lg text-gray-700">Pendapatan Kotor</span>
                <span className="text-lg font-semibold text-gray-900">{formatRupiah(dataLabaRugi.pendapatan)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-lg text-gray-700">Harga Pokok Penjualan (HPP)</span>
                <span className="text-lg font-semibold text-red-600">-{formatRupiah(dataLabaRugi.hpp)}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-lg text-gray-700">Laba Kotor</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatRupiah(dataLabaRugi.pendapatan - dataLabaRugi.hpp)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-lg text-gray-700">Biaya Operasional</span>
                <span className="text-lg font-semibold text-red-600">-{formatRupiah(dataLabaRugi.biayaOperasional)}</span>
              </div>

              <div className="flex justify-between items-center py-6 mt-4 bg-gray-50 px-6 rounded-xl border border-gray-200">
                <span className="text-xl font-bold text-gray-900">Laba Bersih</span>
                <span className="text-3xl font-black text-green-600">{formatRupiah(dataLabaRugi.labaBersih)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      <Modal isOpen={showModalMutasi} onClose={() => setShowModalMutasi(false)} title="Catat Transaksi Kas">
        <FormField label="Keterangan">
          <input className={inputClass} value={formMutasi.keterangan} onChange={(e) => setFormMutasi({...formMutasi, keterangan: e.target.value})} placeholder="Contoh: Setoran kasir shift siang" />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Tipe">
            <select className={selectClass} value={formMutasi.tipe} onChange={(e) => setFormMutasi({...formMutasi, tipe: e.target.value})}>
              <option>Masuk</option><option>Keluar</option>
            </select>
          </FormField>
          <FormField label="Jumlah (Rp)">
            <input type="number" className={inputClass} value={formMutasi.jumlah} onChange={(e) => setFormMutasi({...formMutasi, jumlah: e.target.value})} placeholder="1000000" />
          </FormField>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setShowModalMutasi(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button
            onClick={() => {
              if (!formMutasi.keterangan || !formMutasi.jumlah) return;
              setListMutasi([{
                tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
                keterangan: formMutasi.keterangan, tipe: formMutasi.tipe, jumlah: parseInt(formMutasi.jumlah)
              }, ...listMutasi]);
              setShowModalMutasi(false);
              setToast({ show: true, message: `Transaksi kas berhasil dicatat` });
            }}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all hover:opacity-90"
          >
            Simpan Transaksi
          </button>
        </div>
      </Modal>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: '' })} />

    </div>
  );
};

export default PajakKeuangan;
