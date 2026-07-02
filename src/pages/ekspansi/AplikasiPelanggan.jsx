import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { Smartphone, Download, MapPin, Tag, Star, CalendarDays } from 'lucide-react';

const AplikasiPelanggan = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Aplikasi Pelanggan" 
        subtitle="Manajemen dan pratinjau aplikasi mobile MyPertamina/SPBU"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Kiri: Mockup Mobile App */}
        <div className="flex justify-center items-center bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="w-[320px] h-[640px] bg-white rounded-[2.5rem] shadow-xl border-[8px] border-gray-900 overflow-hidden relative flex flex-col">
            {/* Status Bar Mockup */}
            <div className="h-6 w-full bg-blue-600 flex justify-center items-center">
              <div className="w-16 h-1.5 bg-black/20 rounded-full"></div>
            </div>
            
            {/* App Header */}
            <div className="bg-blue-600 p-5 text-white rounded-b-3xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg tracking-wide">SPBU Apps</h2>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold text-sm">AP</span>
                </div>
              </div>
              <p className="text-blue-100 text-xs">Total Poin Anda</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">1.250</span>
                <span className="text-sm font-medium pb-1">Pts</span>
              </div>
            </div>

            {/* App Body */}
            <div className="flex-1 p-5 bg-gray-50 overflow-y-auto">
              
              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 border border-blue-50">
                    <Tag size={20} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-600">Cek Harga</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 border border-blue-50">
                    <Star size={20} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-600">Poin</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 border border-blue-50">
                    <CalendarDays size={20} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-600">Booking</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 border border-blue-50">
                    <MapPin size={20} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-600">Lokasi</span>
                </div>
              </div>

              {/* Promo Banner */}
              <h3 className="font-bold text-gray-900 text-sm mb-3">Promo Spesial</h3>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-sm mb-6">
                <p className="font-bold mb-1 text-sm">Cashback 50%!</p>
                <p className="text-xs text-blue-100 mb-3">Untuk pengisian Pertamax minimal 10L.</p>
                <button className="bg-white text-blue-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">Klaim Sekarang</button>
              </div>

              {/* Recent Transaction */}
              <h3 className="font-bold text-gray-900 text-sm mb-3">Transaksi Terakhir</h3>
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Smartphone size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Isi Pertamax 10L</p>
                  <p className="text-[10px] text-gray-500">Hari ini, 11:24</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-bold text-gray-900">Rp 150.000</p>
                  <p className="text-[10px] text-green-600 font-medium">+15 Pts</p>
                </div>
              </div>
            </div>

            {/* Bottom Nav Mockup */}
            <div className="bg-white border-t border-gray-200 flex justify-around p-3 pb-5">
              <div className="w-6 h-6 rounded bg-blue-600/20"></div>
              <div className="w-6 h-6 rounded bg-gray-200"></div>
              <div className="w-6 h-6 rounded bg-gray-200"></div>
              <div className="w-6 h-6 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Kanan: Info Download */}
        <div className="flex flex-col justify-center bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Download Aplikasi SPBU</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Ajak pelanggan untuk mengunduh aplikasi resmi kami. Dapatkan poin dari setiap pengisian bahan bakar, nikmati promo eksklusif, dan temukan lokasi SPBU terdekat dengan mudah.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-8">
            <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center text-gray-400 p-2">
              <QrCodePlaceholder />
            </div>
            
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-3 px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors">
                <Download size={20} />
                <div className="text-left">
                  <p className="text-[10px] text-gray-300">GET IT ON</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>
              <button className="flex items-center justify-center gap-3 px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors">
                <Download size={20} />
                <div className="text-left">
                  <p className="text-[10px] text-gray-300">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h4 className="font-bold text-gray-900 text-sm mb-3">Statistik Penggunaan App</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Download</p>
                <p className="text-lg font-bold text-blue-600">12.540</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Active Users (MAU)</p>
                <p className="text-lg font-bold text-green-600">8.230</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const QrCodePlaceholder = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-30">
    <path d="M0,0 v30 h30 v-30 z m5,5 h20 v20 h-20 z" />
    <path d="M70,0 v30 h30 v-30 z m5,5 h20 v20 h-20 z" />
    <path d="M0,70 v30 h30 v-30 z m5,5 h20 v20 h-20 z" />
    <path d="M40,0 h20 v10 h-20 z" />
    <path d="M40,20 h10 v20 h-10 z" />
    <path d="M60,40 h40 v10 h-40 z" />
    <path d="M0,40 h30 v10 h-30 z" />
    <path d="M40,60 h20 v10 h-20 z" />
    <path d="M80,60 h20 v40 h-20 z" />
    <path d="M40,80 h30 v20 h-30 z" />
  </svg>
)

export default AplikasiPelanggan;
