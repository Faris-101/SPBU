// ===== IDENTITAS SPBU =====
export const spbuInfo = {
  nama: "SPBU 34.123.01",
  alamat: "Jl. Merdeka No. 123, Jakarta Pusat",
  pemilik: "PT Energi Jaya Abadi",
  nomorPertamina: "34.123.01",
  jamBuka: "06:00",
  jamTutup: "22:00",
  telepon: "021-5551234",
};

// ===== USER =====
export const currentUser = {
  nama: "Andi Pratama",
  role: "Manager",
  email: "andi.pratama@spbu34123.com",
  avatar: "AP",
};

// ===== DASHBOARD KPI =====
export const dashboardKPI = {
  totalPenjualan: 152850000,
  totalPenjualanKemarin: 135780000,
  totalTransaksi: 1248,
  totalTransaksiKemarin: 1153,
  volumeTerjual: 12450,
  volumeKemarin: 11380,
  stokBBM: 58230,
  statusStok: "Aman",
};

// ===== DATA TANGKI =====
export const dataTangki = [
  { id: 1, produk: "Pertamax", kapasitas: 20000, stok: 15000, persentase: 75, status: "Aman" },
  { id: 2, produk: "Pertalite", kapasitas: 20000, stok: 12000, persentase: 60, status: "Aman" },
  { id: 3, produk: "Solar", kapasitas: 20000, stok: 9000, persentase: 45, status: "Warning" },
  { id: 4, produk: "Dexlite", kapasitas: 20000, stok: 16000, persentase: 80, status: "Aman" },
  { id: 5, produk: "Pertamina Dex", kapasitas: 20000, stok: 6000, persentase: 30, status: "Kritis" },
];

// ===== DATA POMPA =====
export const dataPompa = [
  { id: 1, nama: "Pompa 01", nozzle: ["01A","01B"], produk: "Pertamax", status: "Aktif", totalHari: 3200000 },
  { id: 2, nama: "Pompa 02", nozzle: ["02A","02B"], produk: "Pertalite", status: "Aktif", totalHari: 4500000 },
  { id: 3, nama: "Pompa 03", nozzle: ["03A","03B"], produk: "Solar", status: "Aktif", totalHari: 2800000 },
  { id: 4, nama: "Pompa 04", nozzle: ["04A","04B"], produk: "Dexlite", status: "Aktif", totalHari: 1900000 },
  { id: 5, nama: "Pompa 05", nozzle: ["05A","05B"], produk: "Pertamax", status: "Aktif", totalHari: 3100000 },
  { id: 6, nama: "Pompa 06", nozzle: ["06A","06B"], produk: "Pertalite", status: "Aktif", totalHari: 4200000 },
  { id: 7, nama: "Pompa 07", nozzle: ["07A","07B"], produk: "Solar", status: "Standby", totalHari: 0 },
  { id: 8, nama: "Pompa 08", nozzle: ["08A","08B"], produk: "Pertamina Dex", status: "Offline", totalHari: 0 },
];

// ===== TRANSAKSI TERBARU =====
export const transaksiTerbaru = [
  { id: "INV-291025-001", produk: "Pertamax", jumlah: "10 L", total: 150000, waktu: "11:24", metode: "QRIS" },
  { id: "INV-291025-002", produk: "Pertalite", jumlah: "20 L", total: 180000, waktu: "11:22", metode: "Tunai" },
  { id: "INV-291025-003", produk: "Solar", jumlah: "30 L", total: 198000, waktu: "11:20", metode: "Kartu" },
  { id: "INV-291025-004", produk: "Pertamax", jumlah: "15 L", total: 225000, waktu: "11:18", metode: "E-Wallet" },
  { id: "INV-291025-005", produk: "Dexlite", jumlah: "25 L", total: 340000, waktu: "11:15", metode: "Tunai" },
  { id: "INV-291025-006", produk: "Pertamina Dex", jumlah: "10 L", total: 157000, waktu: "11:10", metode: "QRIS" },
  { id: "INV-291025-007", produk: "Pertalite", jumlah: "40 L", total: 360000, waktu: "11:05", metode: "Tunai" },
  { id: "INV-291025-008", produk: "Solar", jumlah: "50 L", total: 330000, waktu: "11:00", metode: "Kartu" },
];

// ===== GRAFIK PENJUALAN HARIAN (per jam) =====
export const grafikPenjualanHarian = [
  { jam: "06:00", penjualan: 8500000, target: 9000000 },
  { jam: "07:00", penjualan: 14200000, target: 12000000 },
  { jam: "08:00", penjualan: 18900000, target: 16000000 },
  { jam: "09:00", penjualan: 22400000, target: 20000000 },
  { jam: "10:00", penjualan: 28700000, target: 25000000 },
  { jam: "11:00", penjualan: 35100000, target: 30000000 },
  { jam: "12:00", penjualan: 42800000, target: 38000000 },
  { jam: "13:00", penjualan: 48500000, target: 44000000 },
  { jam: "14:00", penjualan: 55200000, target: 50000000 },
  { jam: "15:00", penjualan: 62400000, target: 57000000 },
  { jam: "16:00", penjualan: 72600000, target: 65000000 },
  { jam: "17:00", penjualan: 85300000, target: 75000000 },
  { jam: "18:00", penjualan: 98700000, target: 88000000 },
  { jam: "19:00", penjualan: 112400000, target: 100000000 },
  { jam: "20:00", penjualan: 128900000, target: 115000000 },
  { jam: "21:00", penjualan: 142500000, target: 130000000 },
  { jam: "22:00", penjualan: 152850000, target: 145000000 },
];

// ===== NOTIFIKASI =====
export const dataNotifikasi = [
  { id: 1, tipe: "error", judul: "Pompa 07 Offline", pesan: "Pompa tidak merespon", waktu: "10 menit lalu" },
  { id: 2, tipe: "warning", judul: "Stok Solar di Tank 3", pesan: "Stok tersisa 9.000 L (45%)", waktu: "15 menit lalu" },
  { id: 3, tipe: "info", judul: "Penerimaan BBM Pertamax", pesan: "Pertamax +8.000 L", waktu: "30 menit lalu" },
  { id: 4, tipe: "warning", judul: "Sensor Tank 4 Tidak Tersedia", pesan: "Data level tidak diterima", waktu: "40 menit lalu" },
  { id: 5, tipe: "error", judul: "Koneksi Sensor Terputus", pesan: "Periksa jaringan sensor", waktu: "1 jam lalu" },
];

// ===== GRAFIK MINGGUAN (Laporan) =====
export const grafikMingguan = [
  { hari: "Sen", penjualan: 145000000, volume: 11200 },
  { hari: "Sel", penjualan: 138000000, volume: 10600 },
  { hari: "Rab", penjualan: 162000000, volume: 12400 },
  { hari: "Kam", penjualan: 155000000, volume: 11900 },
  { hari: "Jum", penjualan: 178000000, volume: 13600 },
  { hari: "Sab", penjualan: 195000000, volume: 14900 },
  { hari: "Min", penjualan: 152850000, volume: 12450 },
];

// ===== DISTRIBUSI BBM (Pie chart) =====
export const distribusiProduk = [
  { produk: "Pertamax", persen: 40, warna: "#2563EB" },
  { produk: "Pertalite", persen: 30, warna: "#16A34A" },
  { produk: "Solar", persen: 20, warna: "#D97706" },
  { produk: "Dexlite", persen: 7, warna: "#9333EA" },
  { produk: "Pertamina Dex", persen: 3, warna: "#DC2626" },
];

// ===== DATA KARYAWAN =====
export const dataKaryawan = [
  { id: 1, nama: "Andi Pratama", role: "Manager", shift: "Pagi", status: "Aktif", hadir: 26, absen: 0 },
  { id: 2, nama: "Budi Santoso", role: "Kasir", shift: "Pagi", status: "Aktif", hadir: 25, absen: 1 },
  { id: 3, nama: "Sari Dewi", role: "Operator", shift: "Siang", status: "Aktif", hadir: 24, absen: 2 },
  { id: 4, nama: "Rudi Hermawan", role: "Operator", shift: "Malam", status: "Aktif", hadir: 26, absen: 0 },
  { id: 5, nama: "Lina Marlina", role: "Kasir", shift: "Siang", status: "Aktif", hadir: 23, absen: 3 },
  { id: 6, nama: "Hasan Basri", role: "Operator", shift: "Pagi", status: "Cuti", hadir: 20, absen: 6 },
];

// ===== SUPPLIER =====
export const dataSupplier = [
  { id: 1, nama: "PT Energi Jaya", produk: "Pertamax, Pertalite", kontak: "021-5551111", status: "Aktif" },
  { id: 2, nama: "PT Mitra Bahan Bakar", produk: "Solar, Dexlite", kontak: "021-5552222", status: "Aktif" },
  { id: 3, nama: "PT Pertamina Retail", produk: "Pertamina Dex", kontak: "021-5553333", status: "Aktif" },
];

// ===== PURCHASE ORDER =====
export const dataPO = [
  { id: "PO-291001", supplier: "PT Energi Jaya", produk: "Pertamax", jumlah: "8.000 L", tglKirim: "30 Okt 2025", status: "Dikirim" },
  { id: "PO-291002", supplier: "PT Energi Jaya", produk: "Solar", jumlah: "10.000 L", tglKirim: "31 Okt 2025", status: "Diproses" },
  { id: "PO-291003", supplier: "PT Mitra Bahan Bakar", produk: "Pertalite", jumlah: "8.000 L", tglKirim: "1 Nov 2025", status: "Pending" },
];

// ===== MAINTENANCE =====
export const dataMaintenance = [
  { id: 1, aset: "Pompa 01", jenis: "Servis Rutin", tanggal: "25 Okt 2025", teknisi: "CV Teknik Maju", status: "Selesai" },
  { id: 2, aset: "Pompa 07", jenis: "Perbaikan Nozzle", tanggal: "29 Okt 2025", teknisi: "CV Teknik Maju", status: "Dalam Proses" },
  { id: 3, aset: "Tank 3 Sensor", jenis: "Kalibrasi Sensor", tanggal: "1 Nov 2025", teknisi: "PT Sensor Indo", status: "Terjadwal" },
  { id: 4, aset: "Pompa 03", jenis: "Kalibrasi Flow Meter", tanggal: "5 Nov 2025", teknisi: "PT Metrologi", status: "Terjadwal" },
];

// ===== LOYALITAS PELANGGAN =====
export const dataLoyalitas = {
  totalMember: 2450,
  growthMember: 16.2,
  totalPoin: 125000,
  promoAktif: 3,
  redemptionRate: 68,
};

export const dataMember = [
  { id: "M001", nama: "Budi Santosa", noMember: "MBR-001", poin: 1250, tier: "Gold", status: "Aktif" },
  { id: "M002", nama: "Siti Aminah", noMember: "MBR-002", poin: 3300, tier: "Platinum", status: "Aktif" },
  { id: "M003", nama: "Ahmad Fauzi", noMember: "MBR-003", poin: 870, tier: "Silver", status: "Aktif" },
  { id: "M004", nama: "Dewi Lestari", noMember: "MBR-004", poin: 1780, tier: "Gold", status: "Aktif" },
  { id: "M005", nama: "Rudi Gunawan", noMember: "MBR-005", poin: 450, tier: "Silver", status: "Tidak Aktif" },
];

// ===== E-FAKTUR =====
export const dataEFaktur = {
  totalFaktur: 1250,
  terkirim: 1180,
  pending: 45,
  gagal: 25,
};

export const listEFaktur = [
  { no: "010.001-25.12345678", tanggal: "29 Okt 2025", npwp: "01.234.567.8-901.000", nama: "PT. Maju Bersama", total: 5000000, status: "Terkirim" },
  { no: "010.001-25.12345679", tanggal: "29 Okt 2025", npwp: "02.345.678.9-012.000", nama: "CV. Sejahtera Abadi", total: 2350000, status: "Terkirim" },
  { no: "010.001-25.12345680", tanggal: "29 Okt 2025", npwp: "03.456.789.0-123.000", nama: "PT. Sukses Sentosa", total: 1750000, status: "Pending" },
  { no: "010.001-25.12345681", tanggal: "29 Okt 2025", npwp: "04.567.890.1-234.000", nama: "UD. Rezeki Lancar", total: 2100000, status: "Gagal" },
];

// ===== INTEGRASI EKSTERNAL =====
export const dataIntegrasi = [
  { nama: "API Pertamina", deskripsi: "Sinkronisasi harga BBM", status: "Terhubung", lastSync: "29 Okt 2025, 10:30" },
  { nama: "MyPertamina", deskripsi: "Program loyalitas Pertamina", status: "Terhubung", lastSync: "29 Okt 2025, 10:28" },
  { nama: "e-Faktur (DJP)", deskripsi: "Pelaporan pajak otomatis", status: "Terhubung", lastSync: "29 Okt 2025, 10:25" },
];

// ===== DASHBOARD OWNER (multi-outlet) =====
export const dataOwner = {
  totalOmzet: 5270000000,
  totalVolume: 425230,
  totalTransaksi: 32450,
  totalOutlet: 12,
};

export const performaOutlet = [
  { nama: "SPBU 1", omzet: 1050000000 },
  { nama: "SPBU 2", omzet: 980000000 },
  { nama: "SPBU 3", omzet: 870000000 },
  { nama: "SPBU 4", omzet: 760000000 },
  { nama: "SPBU 5", omzet: 610000000 },
];

// ===== ANTRIAN =====
export const dataAntrian = [
  { noAntrian: "A001", kendaraan: "Motor", plat: "B 1234 XY", waktuMasuk: "11:20", status: "Menunggu" },
  { noAntrian: "A002", kendaraan: "Mobil", plat: "B 5678 AB", waktuMasuk: "11:22", status: "Dilayani" },
  { noAntrian: "A003", kendaraan: "Truk", plat: "B 9012 CD", waktuMasuk: "11:25", status: "Menunggu" },
  { noAntrian: "A004", kendaraan: "Motor", plat: "B 3456 EF", waktuMasuk: "11:27", status: "Menunggu" },
];

// ===== PRODUK NON-BBM =====
export const dataProdukNonBBM = [
  { id: 1, nama: "Oli Pertamina Fastron 1L", kategori: "Pelumas", harga: 95000, stok: 48, terjual: 12 },
  { id: 2, nama: "Oli Shell Helix 1L", kategori: "Pelumas", harga: 110000, stok: 30, terjual: 8 },
  { id: 3, nama: "Air Mineral 600ml", kategori: "Minuman", harga: 5000, stok: 120, terjual: 45 },
  { id: 4, nama: "Minuman Isotonik", kategori: "Minuman", harga: 8000, stok: 80, terjual: 32 },
  { id: 5, nama: "Jasa Tambal Ban", kategori: "Jasa", harga: 20000, stok: null, terjual: 7 },
  { id: 6, nama: "Jasa Cuci Motor", kategori: "Jasa", harga: 25000, stok: null, terjual: 5 },
];

// ===== KONDISI SISTEM =====
export const kondisiSistem = [
  { nama: "Data Kosong", deskripsi: "Belum ada transaksi hari ini", tipe: "info", aksi: "Buat Transaksi" },
  { nama: "Koneksi Terputus", deskripsi: "Koneksi ke sensor terputus", tipe: "error", aksi: "Coba Lagi" },
  { nama: "Sensor Offline", deskripsi: "Sensor Tank 2 Offline", tipe: "warning", aksi: "Periksa Sensor" },
  { nama: "API Error", deskripsi: "API Pertamina tidak merespon", tipe: "error", aksi: "Coba Lagi" },
];

// ===== HARGA BBM =====
export const dataHargaBBM = [
  { produk: "Pertamax", harga: 13900, hargaSebelumnya: 13700, berlakuSejak: "1 Okt 2025" },
  { produk: "Pertalite", harga: 10000, hargaSebelumnya: 10000, berlakuSejak: "1 Sep 2025" },
  { produk: "Solar", harga: 6800, hargaSebelumnya: 6800, berlakuSejak: "1 Sep 2025" },
  { produk: "Dexlite", harga: 14550, hargaSebelumnya: 14300, berlakuSejak: "1 Okt 2025" },
  { produk: "Pertamina Dex", harga: 15700, hargaSebelumnya: 15700, berlakuSejak: "1 Sep 2025" },
];

export const riwayatHargaBBM = [
  { tanggal: "1 Okt 2025", produk: "Pertamax", dari: 13700, ke: 13900, diubahOleh: "Andi Pratama", statusApproval: "Disetujui" },
  { tanggal: "1 Okt 2025", produk: "Dexlite", dari: 14300, ke: 14550, diubahOleh: "Andi Pratama", statusApproval: "Disetujui" },
  { tanggal: "1 Sep 2025", produk: "Semua Produk", dari: 0, ke: 0, diubahOleh: "Sistem Pertamina", statusApproval: "Sinkron Otomatis" },
];

// ===== PENERIMAAN BBM =====
export const dataPenerimaanBBM = [
  { id: "DEL-2025-0142", tanggal: "1 Jul 2026", supplier: "PT Energi Jaya", produk: "Pertamax", noDO: "DO-88213", jumlahDO: 8000, jumlahDiterima: 7950, tangkiTujuan: "Tank 1", status: "Selesai" },
  { id: "DEL-2025-0141", tanggal: "29 Jun 2026", supplier: "PT Mitra Bahan Bakar", produk: "Solar", noDO: "DO-88190", jumlahDO: 10000, jumlahDiterima: 9980, tangkiTujuan: "Tank 3", status: "Selesai" },
  { id: "DEL-2025-0143", tanggal: "3 Jul 2026", supplier: "PT Energi Jaya", produk: "Pertalite", noDO: "DO-88240", jumlahDO: 8000, jumlahDiterima: null, tangkiTujuan: "Tank 2", status: "Dijadwalkan" },
];

// ===== REKONSILIASI BBM =====
export const dataRekonsiliasi = [
  { tanggal: "30 Jun 2026", produk: "Pertamax", stokAwal: 15200, masuk: 7950, keluar: 4980, stokAkhirSistem: 18170, stokAkhirSensor: 18120, selisih: -50, statusSelisih: "Normal" },
  { tanggal: "30 Jun 2026", produk: "Solar", stokAwal: 9800, masuk: 0, keluar: 2490, stokAkhirSistem: 7310, stokAkhirSensor: 7180, selisih: -130, statusSelisih: "Perlu Cek" },
  { tanggal: "30 Jun 2026", produk: "Pertalite", stokAwal: 12500, masuk: 0, keluar: 3735, stokAkhirSistem: 8765, stokAkhirSensor: 8740, selisih: -25, statusSelisih: "Normal" },
];

// ===== JADWAL SHIFT =====
export const dataJadwalShift = [
  { tanggal: "1 Jul 2026", shift: "Pagi (06:00-14:00)", karyawan: ["Rudi Hermawan", "Sari Dewi", "Budi Santoso"] },
  { tanggal: "1 Jul 2026", shift: "Siang (14:00-22:00)", karyawan: ["Lina Marlina", "Hasan Basri"] },
  { tanggal: "1 Jul 2026", shift: "Malam (22:00-06:00)", karyawan: ["Eko Prasetyo", "Dewi Lestari"] },
];

export const dataAbsensi = [
  { nama: "Rudi Hermawan", tanggal: "1 Jul 2026", shift: "Pagi", jamMasuk: "05:55", jamKeluar: "14:05", status: "Tepat Waktu" },
  { nama: "Sari Dewi", tanggal: "1 Jul 2026", shift: "Pagi", jamMasuk: "06:12", jamKeluar: "14:00", status: "Terlambat" },
  { nama: "Budi Santoso", tanggal: "1 Jul 2026", shift: "Pagi", jamMasuk: "05:50", jamKeluar: "14:00", status: "Tepat Waktu" },
];

// ===== PENGGAJIAN =====
export const dataPenggajian = [
  { nama: "Andi Pratama", jabatan: "Manager", gajiPokok: 8500000, tunjangan: 1500000, potongan: 250000, gajiBersih: 9750000, periode: "Jun 2026", status: "Dibayar" },
  { nama: "Budi Santoso", jabatan: "Kasir", gajiPokok: 4200000, tunjangan: 600000, potongan: 100000, gajiBersih: 4700000, periode: "Jun 2026", status: "Dibayar" },
  { nama: "Sari Dewi", jabatan: "Operator", gajiPokok: 4000000, tunjangan: 550000, potongan: 150000, gajiBersih: 4400000, periode: "Jun 2026", status: "Dibayar" },
  { nama: "Rudi Hermawan", jabatan: "Operator", gajiPokok: 4000000, tunjangan: 700000, potongan: 0, gajiBersih: 4700000, periode: "Jun 2026", status: "Diproses" },
];

// ===== JADWAL MAINTENANCE PREVENTIF =====
export const dataJadwalMaintenance = [
  { aset: "Pompa 01", jenis: "Servis Rutin Bulanan", jatuhTempo: "5 Jul 2026", terakhir: "5 Jun 2026", status: "Terjadwal" },
  { aset: "Tank 3 - Sensor ATG", jenis: "Kalibrasi Sensor", jatuhTempo: "10 Jul 2026", terakhir: "10 Jan 2026", status: "Terjadwal" },
  { aset: "Genset Utama", jenis: "Cek Oli & Aki", jatuhTempo: "3 Jul 2026", terakhir: "3 Jun 2026", status: "Mendekati Jatuh Tempo" },
];

// ===== LAPORAN KERUSAKAN (TIKET) =====
export const dataTiketKerusakan = [
  { id: "TKT-0088", aset: "Pompa 07", masalah: "Nozzle tidak mengeluarkan BBM", dilaporkanOleh: "Hasan Basri", tanggal: "29 Jun 2026", teknisi: "CV Teknik Maju", status: "Sedang Ditangani" },
  { id: "TKT-0089", aset: "CCTV Kamera 4", masalah: "Gambar buram", dilaporkanOleh: "Andi Pratama", tanggal: "30 Jun 2026", teknisi: "Belum Ditugaskan", status: "Dilaporkan" },
  { id: "TKT-0087", aset: "Pompa 03", masalah: "Display digital error", dilaporkanOleh: "Sari Dewi", tanggal: "25 Jun 2026", teknisi: "PT Metrologi", status: "Selesai" },
];

// ===== GUDANG NON-BBM =====
export const dataGudang = [
  { nama: "Filter Nozzle Universal", kategori: "Spare Part", stok: 12, stokMinimum: 5, satuan: "pcs" },
  { nama: "Oli Pelumas Pompa", kategori: "Spare Part", stok: 3, stokMinimum: 5, satuan: "liter" },
  { nama: "Seal Karet Nozzle", kategori: "Spare Part", stok: 25, stokMinimum: 10, satuan: "pcs" },
  { nama: "Kabel Listrik NYY 2x2.5", kategori: "Spare Part", stok: 40, stokMinimum: 15, satuan: "meter" },
];

// ===== KAS & BANK =====
export const dataKasBank = {
  saldoKasHariIni: 18500000,
  saldoBank: 142000000,
  setoranHariIni: 12300000,
  pengeluaranHariIni: 2100000,
};

export const mutasiKasBank = [
  { tanggal: "1 Jul 2026", keterangan: "Setoran kasir shift pagi", tipe: "Masuk", jumlah: 8200000 },
  { tanggal: "1 Jul 2026", keterangan: "Pembelian spare part nozzle", tipe: "Keluar", jumlah: 850000 },
  { tanggal: "1 Jul 2026", keterangan: "Transfer dari PT Logistik Nusantara", tipe: "Masuk", jumlah: 15000000 },
  { tanggal: "30 Jun 2026", keterangan: "Bayar listrik PLN", tipe: "Keluar", jumlah: 3200000 },
];

// ===== HUTANG & PIUTANG =====
export const dataPiutang = [
  { pelanggan: "PT Logistik Nusantara", jenis: "Fleet BBM", jumlah: 45000000, jatuhTempo: "10 Jul 2026", status: "Belum Lunas" },
  { pelanggan: "CV Angkutan Sejahtera", jenis: "Fleet BBM", jumlah: 18500000, jatuhTempo: "5 Jul 2026", status: "Belum Lunas" },
];

export const dataHutang = [
  { supplier: "CV Teknik Maju", keterangan: "Spare part & jasa servis", jumlah: 8500000, jatuhTempo: "15 Jul 2026", status: "Belum Lunas" },
  { supplier: "PT Sensor Indo", keterangan: "Kalibrasi sensor ATG", jumlah: 3200000, jatuhTempo: "20 Jul 2026", status: "Belum Lunas" },
];

// ===== LAPORAN KEUANGAN =====
export const dataLabaRugi = {
  pendapatan: 4285000000,
  hpp: 3890000000,
  biayaOperasional: 245000000,
  labaBersih: 150000000,
  periode: "Jun 2026",
};

// ===== LAPORAN OPERASIONAL & COMPLIANCE =====
export const dataIzinOperasional = [
  { jenisIzin: "SITU (Izin Tempat Usaha)", nomorIzin: "SITU/2023/00891", masaBerlaku: "31 Des 2026", status: "Aktif" },
  { jenisIzin: "Tera Pompa (Kalibrasi Resmi)", nomorIzin: "TERA/2026/00456", masaBerlaku: "15 Jul 2026", status: "Segera Berakhir" },
  { jenisIzin: "Izin Lingkungan", nomorIzin: "IL/2022/00234", masaBerlaku: "20 Des 2027", status: "Aktif" },
];

export const dataLaporanPertamina = {
  periode: "Jun 2026",
  totalPenjualanDilaporkan: 4285000000,
  totalVolumeDilaporkan: 371500,
  statusPengiriman: "Terkirim",
  batasWaktu: "10 Jul 2026",
};
