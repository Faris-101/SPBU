import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

import PompaNozzle from './pages/operasional/PompaNozzle';
import StokBBM from './pages/operasional/StokBBM';
import TransaksiPOS from './pages/operasional/TransaksiPOS';
import Pembayaran from './pages/operasional/Pembayaran';

import SDMKaryawan from './pages/manajemen/SDMKaryawan';
import MaintenanceAset from './pages/manajemen/MaintenanceAset';
import SupplierPengadaan from './pages/manajemen/SupplierPengadaan';
import PajakKeuangan from './pages/manajemen/PajakKeuangan';
import LaporanCompliance from './pages/manajemen/LaporanCompliance';

import PengaturanSistem from './pages/pengaturan/PengaturanSistem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="operasional/pompa-nozzle" element={<PompaNozzle />} />
          <Route path="operasional/stok-bbm" element={<StokBBM />} />
          <Route path="operasional/transaksi-pos" element={<TransaksiPOS />} />
          <Route path="operasional/pembayaran" element={<Pembayaran />} />

          <Route path="manajemen/sdm-karyawan" element={<SDMKaryawan />} />
          <Route path="manajemen/maintenance-aset" element={<MaintenanceAset />} />
          <Route path="manajemen/supplier-pengadaan" element={<SupplierPengadaan />} />
          <Route path="manajemen/pajak-keuangan" element={<PajakKeuangan />} />
          <Route path="manajemen/laporan-compliance" element={<LaporanCompliance />} />

          <Route path="pengaturan/sistem" element={<PengaturanSistem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
