import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { Users, UserCheck, CalendarOff, Activity, Plus, Download } from 'lucide-react';
import { dataJadwalShift, dataAbsensi, dataPenggajian } from '../../data/mockData';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';
import { FormField, inputClass, selectClass } from '../../components/ui/FormField';

const SDMKaryawan = () => {
  const [activeTab, setActiveTab] = useState('karyawan');
  const [filterPeriode, setFilterPeriode] = useState('Juni 2026'); // untuk filter gaji

  const [listKaryawan, setListKaryawan] = useState([
    { id: 1, nama: 'Andi Pratama', inisial: 'AP', role: 'Manager', shift: 'Pagi', status: 'Aktif', hadir: 26, absen: 0 },
    { id: 2, nama: 'Budi Santoso', inisial: 'BS', role: 'Kasir', shift: 'Pagi', status: 'Aktif', hadir: 25, absen: 1 },
    { id: 3, nama: 'Sari Dewi', inisial: 'SD', role: 'Operator', shift: 'Siang', status: 'Aktif', hadir: 24, absen: 2 },
    { id: 4, nama: 'Rudi Hermawan', inisial: 'RH', role: 'Operator', shift: 'Malam', status: 'Aktif', hadir: 26, absen: 0 },
    { id: 5, nama: 'Lina Marlina', inisial: 'LM', role: 'Kasir', shift: 'Siang', status: 'Aktif', hadir: 23, absen: 3 },
    { id: 6, nama: 'Hasan Basri', inisial: 'HB', role: 'Operator', shift: 'Pagi', status: 'Cuti', hadir: 20, absen: 6 },
  ]);
  const [showModalTambah, setShowModalTambah] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [karyawanEdit, setKaryawanEdit] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState({ nama: '', role: 'Operator', shift: 'Pagi', status: 'Aktif' });

  const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

  return (
    <div className="space-y-6">
      <PageHeader 
        title="SDM & Karyawan" 
        subtitle="Manajemen data karyawan, shift, absensi, dan penggajian" 
      />

      {/* Baris 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Karyawan" value="6" icon={Users} />
        <StatCard title="Hadir Hari Ini" value="5" icon={UserCheck} badge="Aktif" badgeType="success" />
        <StatCard title="Cuti" value="1" icon={CalendarOff} badge="Cuti" badgeType="warning" />
        <StatCard title="Absensi Rata-rata" value="95%" icon={Activity} badge="Baik" badgeType="success" />
      </div>

      {/* Baris 2: Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {[
          { id: 'karyawan', label: 'Data Karyawan' },
          { id: 'shift', label: 'Jadwal Shift' },
          { id: 'gaji', label: 'Penggajian' }
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

      {/* Tab Content 1: Karyawan */}
      {activeTab === 'karyawan' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Daftar Karyawan</h3>
            <button onClick={() => { setFormData({ nama: '', role: 'Operator', shift: 'Pagi', status: 'Aktif' }); setShowModalTambah(true); }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all duration-300">
              <Plus size={16} /> Tambah Karyawan
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                  <th className="px-5 py-3 font-semibold text-gray-700">No</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Nama</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Role</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Shift</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Hadir/Absen</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Status</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listKaryawan.map((karyawan, idx) => (
                  <tr key={idx} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-5 py-3 font-medium text-gray-900">{idx + 1}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          {karyawan.inisial}
                        </div>
                        <span className="font-medium text-gray-900">{karyawan.nama}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge label={karyawan.role} type="primary" />
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium border border-gray-200">
                        {karyawan.shift}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-700 font-medium">
                      {karyawan.hadir}/{karyawan.absen}
                    </td>
                    <td className="px-5 py-3">
                      <Badge 
                        label={karyawan.status} 
                        type={karyawan.status === 'Aktif' ? 'success' : 'warning'} 
                      />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => { setKaryawanEdit(karyawan); setFormData(karyawan); setShowModalEdit(true); }} className="px-3 py-1.5 text-xs font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
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

      {/* Tab Content 2: Jadwal Shift */}
      {activeTab === 'shift' && (
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900">Jadwal Hari Ini ({dataJadwalShift[0]?.tanggal})</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataJadwalShift.map((shift, i) => {
              const bgHeader = i === 0 ? 'bg-blue-600 border-blue-700' : i === 1 ? 'bg-green-600 border-green-700' : 'bg-purple-600 border-purple-700';
              const textSub = i === 0 ? 'text-blue-100' : i === 1 ? 'text-green-100' : 'text-purple-100';
              
              return (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className={`p-4 text-white border-b ${bgHeader}`}>
                    <h3 className="font-bold text-lg">{shift.shift.split(' ')[0]}</h3>
                    <p className={`text-sm ${textSub}`}>{shift.shift.split(' ')[1]}</p>
                  </div>
                  <div className="p-4 divide-y divide-gray-100">
                    {shift.karyawan.map((nama, idx) => (
                      <div key={idx} className="py-3">
                        <p className="font-semibold text-gray-900 text-sm">{nama}</p>
                        <p className="text-xs text-gray-500">Karyawan</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Data Absensi Hari Ini</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                    <th className="px-5 py-3 font-semibold text-gray-700">Nama</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Tanggal</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Shift</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Jam Masuk</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Jam Keluar</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataAbsensi.map((abs, i) => (
                    <tr key={i} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                      <td className="px-5 py-4 font-medium text-gray-900">{abs.nama}</td>
                      <td className="px-5 py-4 text-gray-600">{abs.tanggal}</td>
                      <td className="px-5 py-4 text-gray-600">{abs.shift}</td>
                      <td className="px-5 py-4 text-gray-900 font-medium">{abs.jamMasuk}</td>
                      <td className="px-5 py-4 text-gray-900 font-medium">{abs.jamKeluar}</td>
                      <td className="px-5 py-4">
                        <Badge label={abs.status} type={abs.status === 'Tepat Waktu' ? 'success' : 'warning'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Penggajian */}
      {activeTab === 'gaji' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-gray-900">Rekap Penggajian</h3>
              <select 
                value={filterPeriode}
                onChange={(e) => setFilterPeriode(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 text-gray-700 font-medium cursor-pointer"
              >
                <option value="Juni 2026">Juni 2026</option>
                <option value="Mei 2026">Mei 2026</option>
                <option value="April 2026">April 2026</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm">
              <Download size={16} /> Export Slip Gaji
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200 text-sm">
                  <th className="px-5 py-3 font-semibold text-gray-700">Nama</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Jabatan</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 text-right">Gaji Pokok</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 text-right">Tunjangan</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 text-right">Potongan</th>
                  <th className="px-5 py-3 font-semibold text-gray-700 text-right">Gaji Bersih</th>
                  <th className="px-5 py-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataPenggajian.map((gaji, i) => (
                  <tr key={i} className="text-sm hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors duration-200">
                    <td className="px-5 py-4 font-medium text-gray-900">{gaji.nama}</td>
                    <td className="px-5 py-4 text-gray-600">{gaji.jabatan}</td>
                    <td className="px-5 py-4 text-right text-gray-600">{formatRupiah(gaji.gajiPokok)}</td>
                    <td className="px-5 py-4 text-right text-green-600">+{formatRupiah(gaji.tunjangan)}</td>
                    <td className="px-5 py-4 text-right text-red-600">-{formatRupiah(gaji.potongan)}</td>
                    <td className="px-5 py-4 text-right font-bold text-gray-900">{formatRupiah(gaji.gajiBersih)}</td>
                    <td className="px-5 py-4">
                      <Badge label={gaji.status} type={gaji.status === 'Dibayar' ? 'success' : 'warning'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODALS */}
      <Modal isOpen={showModalTambah} onClose={() => setShowModalTambah(false)} title="Tambah Karyawan Baru">
        <FormField label="Nama Lengkap">
          <input className={inputClass} value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} placeholder="Contoh: Rina Kartika" />
        </FormField>
        <FormField label="Jabatan">
          <select className={selectClass} value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option>Manager</option>
            <option>Supervisor</option>
            <option>Kasir</option>
            <option>Operator</option>
            <option>Teknisi</option>
          </select>
        </FormField>
        <FormField label="Shift">
          <select className={selectClass} value={formData.shift} onChange={(e) => setFormData({...formData, shift: e.target.value})}>
            <option>Pagi</option>
            <option>Siang</option>
            <option>Malam</option>
          </select>
        </FormField>
        <FormField label="Status">
          <select className={selectClass} value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option>Aktif</option>
            <option>Cuti</option>
            <option>Nonaktif</option>
          </select>
        </FormField>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setShowModalTambah(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button
            onClick={() => {
              if (!formData.nama) return;
              const newId = listKaryawan.length > 0 ? Math.max(...listKaryawan.map(k => k.id)) + 1 : 1;
              const inisial = formData.nama.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2);
              setListKaryawan([...listKaryawan, { id: newId, inisial, ...formData, hadir: 0, absen: 0 }]);
              setShowModalTambah(false);
              setToast({ show: true, message: `Karyawan "${formData.nama}" berhasil ditambahkan` });
            }}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all hover:opacity-90"
          >
            Simpan Karyawan
          </button>
        </div>
      </Modal>

      <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)} title={`Edit Data — ${karyawanEdit?.nama}`}>
        <FormField label="Nama Lengkap">
          <input className={inputClass} value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} />
        </FormField>
        <FormField label="Jabatan">
          <select className={selectClass} value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option>Manager</option><option>Supervisor</option><option>Kasir</option><option>Operator</option><option>Teknisi</option>
          </select>
        </FormField>
        <FormField label="Shift">
          <select className={selectClass} value={formData.shift} onChange={(e) => setFormData({...formData, shift: e.target.value})}>
            <option>Pagi</option><option>Siang</option><option>Malam</option>
          </select>
        </FormField>
        <FormField label="Status">
          <select className={selectClass} value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option>Aktif</option><option>Cuti</option><option>Nonaktif</option>
          </select>
        </FormField>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setShowModalEdit(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button
            onClick={() => {
              const inisial = formData.nama.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2);
              setListKaryawan(listKaryawan.map(k => k.id === karyawanEdit.id ? { ...k, ...formData, inisial } : k));
              setShowModalEdit(false);
              setToast({ show: true, message: `Data "${formData.nama}" berhasil diperbarui` });
            }}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/25 transition-all hover:opacity-90"
          >
            Simpan Perubahan
          </button>
        </div>
      </Modal>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: '' })} />

    </div>
  );
};

export default SDMKaryawan;
