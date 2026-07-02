import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { dataIntegrasi } from '../../data/mockData';
import { RefreshCw, TriangleAlert } from 'lucide-react';

const IntegrasiEksternal = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Integrasi Eksternal" 
        subtitle="Manajemen koneksi ke sistem pihak ketiga (API)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataIntegrasi.map((integ, idx) => {
          const isError = integ.status !== 'Terhubung';

          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${isError ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                  {isError ? <TriangleAlert size={24} /> : <RefreshCw size={24} />}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  isError ? 'bg-red-100 text-red-700' : 'text-green-600'
                }`}>
                  {integ.status}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-900 text-lg mb-2">{integ.nama}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">{integ.deskripsi}</p>
              
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Terakhir sinkron:</span>
                  <span className="font-medium text-gray-700">{integ.lastSync}</span>
                </div>
                <button className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isError 
                    ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}>
                  Cek Koneksi
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default IntegrasiEksternal;
