import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';
import { FormField, inputClass } from '../../components/ui/FormField';
import { dataPompa, dataHargaBBM } from '../../data/mockData';
import { Fuel, CheckCircle, Clock, AlertCircle, Power } from 'lucide-react';

const PompaNozzle = () => {
  const [activeTab, setActiveTab] = useState('pompa');
  const [listPompa, setListPompa] = useState(dataPompa);
  const [listHarga, setListHarga] = useState(dataHargaBBM);
  const [showModalHarga, setShowModalHarga] = useState(false);
  const [hargaEdit, setHargaEdit] = useState(null);
  const [hargaBaru, setHargaBaru] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const aktif = listPompa.filter(p => p.status === 'Aktif').length;
  const standby = listPompa.filter(p => p.status === 'Standby').length;
  const offline = listPompa.filter(p => p.status === 'Offline').length;

  const getProductColor = (produk) => {
    switch(produk) {
      case 'Pertamax': return 'info';
      case 'Pertalite': return 'success';
      case 'Solar': return 'warning';
      case 'Dexlite': return 'primary'; // Or purple if added to Badge
      case 'Pertamina Dex': return 'danger';
      default: return 'info';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aktif': return 'success';
      case 'Standby': return 'warning';
      case 'Offline': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Pompa & Nozzle" subtitle="Monitoring status dan aktivitas pompa" />

      {/* Baris 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pompa" value={listPompa.length} icon={Fuel} />
        <StatCard title="Aktif" value={aktif} badge="Normal" badgeType="success" icon={CheckCircle} />
        <StatCard title="Standby" value={standby} badge="Perhatian" badgeType="warning" icon={Clock} />
        <StatCard title="Offline" value={offline} badge="Kritis" badgeType="danger" icon={AlertCircle} />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {[
          { id: 'pompa', label: 'Status Pompa' },
          { id: 'harga', label: 'Harga BBM' }
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

      {/* Baris 2: Grid Pompa */}
      {activeTab === 'pompa' && (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {listPompa.map((pompa, index) => (
          <div
            key={pompa.id}
            className={`
              relative rounded-xl p-4 border card-hover cursor-pointer
              animate-fade-in-up
              ${pompa.status === 'Aktif'    ? 'bg-white border-green-200' : ''}
              ${pompa.status === 'Standby'  ? 'bg-yellow-50 border-yellow-200' : ''}
              ${pompa.status === 'Offline'  ? 'bg-red-50 border-red-200' : ''}
            `}
            style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}
          >
            {/* Status dot */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">{pompa.nama}</span>
              <span className={`
                w-2.5 h-2.5 rounded-full
                ${pompa.status === 'Aktif'   ? 'bg-green-500 animate-pulse' : ''}
                ${pompa.status === 'Standby' ? 'bg-yellow-500' : ''}
                ${pompa.status === 'Offline' ? 'bg-red-500' : ''}
              `} />
            </div>

            {/* Produk badge */}
            <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-2 font-medium bg-blue-100 text-blue-700">
              {pompa.produk}
            </span>

            {/* Nozzle */}
            <p className="text-xs text-gray-400 mb-3">
              Nozzle: {pompa.nozzle.join(', ')}
            </p>

            {/* Total penjualan */}
            <p className="text-sm font-bold text-gray-800">
              {pompa.status !== 'Offline'
                ? 'Rp ' + pompa.totalHari.toLocaleString('id-ID')
                : '—'
              }
            </p>
            <p className="text-xs text-gray-400">hari ini</p>

            {/* Status label */}
            <div className={`
              absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full
              ${pompa.status === 'Aktif'   ? 'bg-green-100 text-green-700' : ''}
              ${pompa.status === 'Standby' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${pompa.status === 'Offline' ? 'bg-red-100 text-red-700 animate-glow-pulse' : ''}
            `}>
              {pompa.status}
            </div>
            {/* Toggle Status Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setListPompa(listPompa.map(p => p.id === pompa.id ? { ...p, status: p.status === 'Aktif' ? 'Standby' : 'Aktif' } : p));
                setToast({ show: true, message: `Pompa "${pompa.nama}" diubah menjadi ${pompa.status === 'Aktif' ? 'Standby' : 'Aktif'}` });
              }}
              className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700"
            >
              <Power size={14} />
              {pompa.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
            </button>
          </div>
        ))}
      </div>
      )}

      {/* Tab Harga BBM */}
      {activeTab === 'harga' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Daftar Harga BBM</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                  <th className="px-6 py-4 font-semibold text-gray-700">Produk</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-right">Harga Saat Ini</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-right">Harga Sebelumnya</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Berlaku Sejak</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listHarga.map((item, idx) => (
                  <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.produk}</td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600">Rp {item.harga.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-right text-gray-500">Rp {item.hargaSebelumnya.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-gray-600">{item.berlakuSejak}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => { setHargaEdit(item); setHargaBaru(item.harga.toString()); setShowModalHarga(true); }} className="px-3 py-1.5 text-xs font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODALS */}
      <Modal isOpen={showModalHarga} onClose={() => setShowModalHarga(false)} title={`Update Harga — ${hargaEdit?.produk}`}>
        <FormField label="Harga Saat Ini">
          <input className={inputClass} value={`Rp ${hargaEdit?.harga.toLocaleString('id-ID')}`} disabled />
        </FormField>
        <FormField label="Harga Baru (Rp/Liter)">
          <input type="number" className={inputClass} value={hargaBaru} onChange={(e) => setHargaBaru(e.target.value)} placeholder="14000" />
        </FormField>
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700 mb-2">
          ⚠️ Perubahan harga memerlukan approval dari Owner sebelum berlaku efektif.
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => setShowModalHarga(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button
            onClick={() => {
              if (!hargaBaru) return;
              setListHarga(listHarga.map(h => h.produk === hargaEdit.produk ? { ...h, hargaSebelumnya: h.harga, harga: parseInt(hargaBaru), berlakuSejak: 'Menunggu Approval' } : h));
              setShowModalHarga(false);
              setToast({ show: true, message: `Perubahan harga ${hargaEdit.produk} diajukan, menunggu approval` });
            }}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all hover:opacity-90"
          >
            Ajukan Perubahan
          </button>
        </div>
      </Modal>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: '' })} />

    </div>
  );
};

export default PompaNozzle;
