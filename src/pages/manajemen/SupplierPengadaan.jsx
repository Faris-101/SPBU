import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { dataPO, dataSupplier, dataGudang } from '../../data/mockData';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';
import { FormField, inputClass, selectClass } from '../../components/ui/FormField';

const SupplierPengadaan = () => {
  const [activeTab, setActiveTab] = useState('po');
  const [listPO, setListPO] = useState(dataPO);
  const [showModalPO, setShowModalPO] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [formPO, setFormPO] = useState({ supplier: '', produk: 'Pertamax', jumlah: '', tglKirim: '' });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aktif': return 'success';
      default: return 'primary';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Procurement & Gudang" 
        subtitle="Manajemen pemesanan (PO), data supplier, dan stok gudang non-BBM"
      />

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {[
          { id: 'po', label: 'Purchase Order' },
          { id: 'supplier', label: 'Supplier' },
          { id: 'gudang', label: 'Gudang Non-BBM' }
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

      {activeTab === 'po' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Daftar Purchase Order</h3>
            <button onClick={() => { setFormPO({ supplier: '', produk: 'Pertamax', jumlah: '', tglKirim: '' }); setShowModalPO(true); }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
              <Plus size={16} /> Buat PO Baru
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                  <th className="px-6 py-4 font-semibold text-gray-700">No. PO</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Supplier</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Produk</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Jumlah</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Tgl Pengiriman</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listPO.map((po, idx) => (
                  <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-gray-900">{po.id}</td>
                    <td className="px-6 py-4 text-gray-600">{po.supplier}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{po.produk}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{po.jumlah}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{po.tglKirim}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        po.status === 'Dikirim' ? 'bg-blue-100 text-blue-700' :
                        po.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'supplier' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Direktori Supplier</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
              <Plus size={16} /> Tambah Supplier
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                  <th className="px-6 py-4 font-semibold text-gray-700">Nama Supplier</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Produk Suplai</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Kontak</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataSupplier.map((sup, idx) => (
                  <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-gray-900">{sup.nama}</td>
                    <td className="px-6 py-4 text-gray-600">{sup.produk}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{sup.kontak}</td>
                    <td className="px-6 py-4">
                      <Badge label={sup.status} type={getStatusColor(sup.status)} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit2 size={16} /></button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'gudang' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Stok Gudang Non-BBM</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
              <Plus size={16} /> Tambah Barang
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                  <th className="px-6 py-4 font-semibold text-gray-700">Nama Barang</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Kategori</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-right">Stok Saat Ini</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-right">Stok Minimum</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Satuan</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataGudang.map((item, idx) => {
                  const isLow = item.stok <= item.stokMinimum;
                  return (
                    <tr key={idx} className={`text-sm transition-colors ${isLow ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.namaBarang}</td>
                      <td className="px-6 py-4 text-gray-600">{item.kategori}</td>
                      <td className={`px-6 py-4 text-right font-bold ${isLow ? 'text-red-600' : 'text-gray-900'}`}>{item.stok}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{item.stokMinimum}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{item.satuan}</td>
                      <td className="px-6 py-4">
                        {isLow ? (
                           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                             <AlertCircle size={12} /> Stok Rendah
                           </div>
                        ) : (
                           <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                             Aman
                           </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODALS */}
      <Modal isOpen={showModalPO} onClose={() => setShowModalPO(false)} title="Buat Purchase Order Baru" size="lg">
        <FormField label="Supplier">
          <select className={selectClass} value={formPO.supplier} onChange={(e) => setFormPO({...formPO, supplier: e.target.value})}>
            <option value="">Pilih Supplier</option>
            {dataSupplier.map(s => <option key={s.id} value={s.nama}>{s.nama}</option>)}
          </select>
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Produk">
            <select className={selectClass} value={formPO.produk} onChange={(e) => setFormPO({...formPO, produk: e.target.value})}>
              <option>Pertamax</option><option>Pertalite</option><option>Solar</option><option>Dexlite</option><option>Pertamina Dex</option><option>Spare Part</option>
            </select>
          </FormField>
          <FormField label="Jumlah (Liter/Unit)">
            <input type="number" className={inputClass} value={formPO.jumlah} onChange={(e) => setFormPO({...formPO, jumlah: e.target.value})} placeholder="8000" />
          </FormField>
        </div>
        <FormField label="Tanggal Kirim Diharapkan">
          <input type="date" className={inputClass} value={formPO.tglKirim} onChange={(e) => setFormPO({...formPO, tglKirim: e.target.value})} />
        </FormField>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setShowModalPO(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">Batal</button>
          <button
            onClick={() => {
              if (!formPO.supplier || !formPO.jumlah) return;
              const newId = `PO-${Date.now().toString().slice(-6)}`;
              setListPO([{ id: newId, ...formPO, jumlah: formPO.jumlah + ' L', status: 'Draft' }, ...listPO]);
              setShowModalPO(false);
              setToast({ show: true, message: `PO baru "${newId}" berhasil dibuat, menunggu approval` });
            }}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300"
          >
            Buat PO
          </button>
        </div>
      </Modal>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: '' })} />

    </div>
  );
};

export default SupplierPengadaan;
