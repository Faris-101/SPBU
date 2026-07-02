# SPBU — Sistem Manajemen SPBU

Ini adalah dashboard frontend untuk manajemen operasional SPBU (demo version). Aplikasi ini dibangun dengan React, Vite, dan Tailwind CSS.

## Fitur Utama

- **Operasional**: Manajemen pompa, transaksi kasir (POS), pembayaran, stok BBM, antrian kendaraan, dan notifikasi sistem.
- **Manajemen**: Laporan analitik penjualan harian & mingguan, ringkasan pajak & keuangan, audit & rekonsiliasi log sistem, manajemen supplier & pengadaan, jadwal pemeliharaan aset, dan monitor keamanan CCTV.
- **Ekspansi**: Sistem loyalitas member, penjualan produk non-BBM, dashboard owner multi-outlet, integrasi API eksternal (MyPertamina, DJP), pratinjau aplikasi pelanggan, dan e-Faktur.
- **Pengaturan**: Konfigurasi profil SPBU dan status sistem (koneksi database, API, backup).

## Teknologi

- React 18
- Vite
- React Router DOM v6
- Tailwind CSS
- Recharts (untuk grafik & chart)
- Lucide React (untuk ikon)

## Cara Menjalankan

1. Pastikan Anda telah menginstal Node.js di komputer Anda.
2. Buka terminal dan arahkan ke direktori proyek ini.
3. Instal semua dependensi:

```bash
npm install
```

4. Jalankan development server:

```bash
npm run dev
```

5. Buka tautan lokal yang diberikan di terminal (biasanya `http://localhost:5173`) di browser Anda.

## Struktur File

Semua file komponen dan halaman berlokasi di dalam folder `src/`.
- `src/components/`: Berisi komponen-komponen yang dapat digunakan ulang (layout, stat card, badge, dll).
- `src/pages/`: Berisi kode untuk setiap halaman dalam aplikasi, dikelompokkan sesuai dengan kategori menu (Operasional, Manajemen, Ekspansi, Pengaturan).
- `src/data/mockData.js`: Semua data fiktif untuk demo aplikasi (tidak ada API call ke backend asli).
