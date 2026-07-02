import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, Droplets, ShoppingCart, Activity, Fuel, AlertCircle, Camera, Zap, Clock, ChevronRight, ThumbsUp, Wifi, Server, Radio, Battery,
  MapPin, Calendar, Sun, Bell, Send, CheckCircle, XCircle, Info, MoreHorizontal, Truck, FileText, Wrench, FileBarChart, Printer
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { 
  dashboardKPI, grafikPenjualanHarian, dataTangki, dataPompa, transaksiTerbaru, dataNotifikasi, currentUser, spbuInfo, dataHargaBBM 
} from '../data/mockData';
import gsap from 'gsap';
import { motion, useReducedMotion } from 'framer-motion';

const formatRupiah = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const formatLiter = (n) => Math.round(n).toLocaleString('id-ID') + ' L';

// Component for CountUp Animation
const CountUp = ({ value, formatFn, prefersReducedMotion }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (nodeRef.current) nodeRef.current.textContent = formatFn(value);
      return;
    }
    const node = nodeRef.current;
    if (!node) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = formatFn(obj.val);
        }
      });
    });
    return () => ctx.revert();
  }, [value, formatFn, prefersReducedMotion]);

  return <span ref={nodeRef}>{prefersReducedMotion ? formatFn(value) : formatFn(0)}</span>;
};

// Component for 3D Tilt Card
const TiltCard = ({ children, className, prefersReducedMotion }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -8);
    setRotateY(((x - centerX) / centerX) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className={`kpi-card col-span-1 ${className}`} style={{ perspective: prefersReducedMotion ? 'none' : 1000 }}>
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full rounded-2xl shadow-sm border border-gray-100 bg-white"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function Dashboard() {
  const dashboardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const pompaAktif = dataPompa.filter(p => p.status === 'Aktif').length;
  const pompaOffline = dataPompa.filter(p => p.status === 'Offline').length;
  const tankAman = dataTangki.filter(t => t.status === 'Aman').length;
  const tankWarning = dataTangki.length - tankAman;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set('.kpi-card', { y: 30, opacity: 0 });
      gsap.set('.dashboard-row', { y: 30, opacity: 0 });
      // If there was a header bar it would be animated here, but it's removed
      
      const tl = gsap.timeline();
      
      // Stagger KPI Cards
      tl.to('.kpi-card', {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out"
      });

      // Stagger subsequent rows
      tl.to('.dashboard-row', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.2");
      
    }, dashboardRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="space-y-5 pb-8 overflow-hidden" ref={dashboardRef}>
      {/* BAGIAN 2: 6 KPI CARD */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1 — Health Score SPBU */}
        <div className="kpi-card col-span-1" style={{ perspective: prefersReducedMotion ? 'none' : 1000 }}>
          <motion.div className="h-full bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">HEALTH SCORE SPBU</p>
            <p className="text-5xl font-black font-['Outfit'] mt-1">
              <CountUp value={97} formatFn={(v) => Math.round(v)} prefersReducedMotion={prefersReducedMotion} />
            </p>
            <span className="bg-white/20 text-white text-xs rounded-full px-2 py-0.5 mt-2 inline-block">Excellent</span>
            <p className="text-xs opacity-70 mt-2">+12,5% dari kemarin</p>
          </motion.div>
        </div>

        {/* Card 2 — Total Penjualan */}
        <TiltCard prefersReducedMotion={prefersReducedMotion}>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-2/3">TOTAL PENJUALAN HARI INI</p>
              <div className="p-1.5 bg-blue-50 rounded-full"><TrendingUp size={16} className="text-blue-500" /></div>
            </div>
            <p className="text-2xl font-black text-gray-900 font-['Outfit'] mt-2">
              <CountUp value={dashboardKPI.totalPenjualan} formatFn={formatRupiah} prefersReducedMotion={prefersReducedMotion} />
            </p>
            <p className="text-xs text-green-500 font-medium mt-1">+12,5% dari kemarin</p>
          </div>
        </TiltCard>

        {/* Card 3 — Liter Terjual */}
        <TiltCard prefersReducedMotion={prefersReducedMotion}>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-2/3">VOLUME TERJUAL (LITER)</p>
              <div className="p-1.5 bg-blue-50 rounded-full"><Droplets size={16} className="text-blue-500" /></div>
            </div>
            <p className="text-2xl font-black text-gray-900 font-['Outfit'] mt-2">
              <CountUp value={dashboardKPI.volumeTerjual} formatFn={formatLiter} prefersReducedMotion={prefersReducedMotion} />
            </p>
            <p className="text-xs text-green-500 font-medium mt-1">+9,1% dari kemarin</p>
          </div>
        </TiltCard>

        {/* Card 4 — Jumlah Transaksi */}
        <TiltCard prefersReducedMotion={prefersReducedMotion}>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-2/3">JUMLAH TRANSAKSI</p>
              <div className="p-1.5 bg-blue-50 rounded-full"><ShoppingCart size={16} className="text-blue-500" /></div>
            </div>
            <p className="text-2xl font-black text-gray-900 font-['Outfit'] mt-2">
              <CountUp value={dashboardKPI.totalTransaksi} formatFn={(v) => Math.round(v).toLocaleString('id-ID')} prefersReducedMotion={prefersReducedMotion} />
            </p>
            <p className="text-xs text-green-500 font-medium mt-1">+8,2% dari kemarin</p>
          </div>
        </TiltCard>

        {/* Card 5 — Pompa Aktif */}
        <TiltCard prefersReducedMotion={prefersReducedMotion}>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-2/3">STATUS POMPA AKTIF</p>
              <div className="p-1.5 bg-blue-50 rounded-full"><Fuel size={16} className="text-blue-500" /></div>
            </div>
            <p className="text-2xl font-black text-gray-900 font-['Outfit'] mt-2">{pompaAktif} / {dataPompa.length}</p>
            {pompaOffline > 0 ? (
              <p className="text-xs text-red-500 font-medium mt-1">● {pompaOffline} Offline</p>
            ) : (
              <p className="text-xs text-green-500 font-medium mt-1">● Semua Online</p>
            )}
          </div>
        </TiltCard>

        {/* Card 6 — Tank Aman */}
        <TiltCard prefersReducedMotion={prefersReducedMotion}>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-2/3">STATUS TANGKI BBM</p>
              <div className="p-1.5 bg-green-50 rounded-full"><Droplets size={16} className="text-green-500" /></div>
            </div>
            <p className="text-2xl font-black text-gray-900 font-['Outfit'] mt-2">{tankAman} / {dataTangki.length}</p>
            {tankWarning > 0 ? (
              <p className="text-xs text-yellow-500 font-medium mt-1">● {tankWarning} Warning</p>
            ) : (
              <p className="text-xs text-green-500 font-medium mt-1">● Semua Normal</p>
            )}
          </div>
        </TiltCard>
      </div>

      {/* BAGIAN 3: GRAFIK + CHART + PENJUALAN PER POMPA */}
      <div className="dashboard-row grid grid-cols-12 gap-4">
        {/* Grafik Penjualan Hari Ini (col-span-12 lg:col-span-5) */}
        <div className="col-span-12 lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Penjualan Hari Ini</h3>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 outline-none bg-gray-50">
              <option>Hari Ini</option>
              <option>Kemarin</option>
              <option>Minggu Ini</option>
            </select>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-xs text-gray-500">Penjualan (Rp)</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300"></span><span className="text-xs text-gray-500">Target</span></div>
          </div>
          <div className="flex-1 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={grafikPenjualanHarian} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35}/>
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.12}/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="jam" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} tickFormatter={(val) => `${val/1000000}M`} dx={-10} />
                <Tooltip formatter={(value) => formatRupiah(value)} labelStyle={{ color: '#374151', fontWeight: 'bold', marginBottom: '4px' }} contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="penjualan" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#gradBlue)" dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: '#3B82F6' }} />
                <Area type="monotone" dataKey="target" stroke="#E5E7EB" strokeWidth={2} strokeDasharray="4 4" fill="none" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Penjualan per Produk (col-span-12 md:col-span-6 lg:col-span-3) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-gray-900">Penjualan per Produk</h3>
            <p className="text-xs text-gray-500 mt-0.5">Total {formatLiter(dashboardKPI.volumeTerjual)}</p>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="h-40 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[
                    { name: 'Pertamax', value: 40, fill: '#3B82F6' },
                    { name: 'Pertalite', value: 30, fill: '#10B981' },
                    { name: 'Solar', value: 20, fill: '#F59E0B' },
                    { name: 'Dexlite', value: 10, fill: '#8B5CF6' }
                  ]} cx="50%" cy="50%" innerRadius={55} outerRadius={75} dataKey="value" stroke="none" paddingAngle={2} cornerRadius={4}>
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text for Donut */}
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-xl font-bold font-['Outfit'] text-gray-800">100%</span>
                <span className="text-[10px] text-gray-400">Total</span>
              </div>
            </div>
            
            <div className="w-full mt-4 space-y-2">
              {[
                { name: 'Pertamax', val: '40%', liter: '4.980 L', color: 'bg-blue-500' },
                { name: 'Pertalite', val: '30%', liter: '3.735 L', color: 'bg-green-500' },
                { name: 'Solar', val: '20%', liter: '2.490 L', color: 'bg-orange-500' },
                { name: 'Dexlite', val: '10%', liter: '1.245 L', color: 'bg-purple-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                    <span className="text-gray-600 font-medium">{item.name}</span>
                  </div>
                  <div className="flex gap-3 text-gray-500">
                    <span>{item.liter}</span>
                    <span className="font-bold text-gray-900 w-8 text-right">{item.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Penjualan per Pompa (col-span-12 md:col-span-6 lg:col-span-4) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Penjualan per Pompa</h3>
            <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Lihat semua →</a>
          </div>
          <div className="space-y-5">
            {[
              { nama: 'Pompa 01', liter: 3245, persen: 26 },
              { nama: 'Pompa 03', liter: 2890, persen: 23.2 },
              { nama: 'Pompa 02', liter: 2540, persen: 20.4 },
              { nama: 'Pompa 05', liter: 2100, persen: 16.8 },
              { nama: 'Pompa 04', liter: 1675, persen: 13.6 },
            ].map((p, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-gray-700">{p.nama}</span>
                  <div className="text-gray-500 gap-2 flex">
                    <span>{p.liter.toLocaleString('id-ID')} L</span>
                    <span className="font-bold text-gray-900 w-8 text-right">{p.persen}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full" style={{ width: `${p.persen}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BAGIAN 4: STATUS POMPA + STATUS TANGKI + HARGA BBM + ALERT */}
      <div className="dashboard-row grid grid-cols-12 gap-4">
        {/* Status Pompa Saat Ini (col-span-12 lg:col-span-5) */}
        <div className="col-span-12 lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Status Pompa Saat Ini</h3>
            <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Lihat semua pompa →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-semibold">Pompa</th>
                  <th className="pb-2 font-semibold">Produk</th>
                  <th className="pb-2 font-semibold">Nozzle</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Liter Hari Ini</th>
                  <th className="pb-2 font-semibold">Transaksi</th>
                  <th className="pb-2 font-semibold">Operator</th>
                  <th className="pb-2 font-semibold">Shift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dataPompa.slice(0, 8).map((p, i) => (
                  <tr key={i} className="text-xs text-gray-700">
                    <td className="py-2.5 font-medium text-gray-900">{p.id}</td>
                    <td className="py-2.5">{Array.isArray(p.produk) ? p.produk.join(', ') : p.produk}</td>
                    <td className="py-2.5">{Array.isArray(p.nozzle) ? p.nozzle.join(', ') : p.nozzle}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        p.status === 'Aktif' ? 'bg-green-100 text-green-700' :
                        p.status === 'Offline' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2.5">{p.volumeHariIni ? p.volumeHariIni.toLocaleString('id-ID') : (p.totalHari ? (p.totalHari / 10000).toFixed(0) : '-')} L</td>
                    <td className="py-2.5">{p.transaksiHariIni || Math.floor(Math.random() * 50) + 10}</td>
                    <td className="py-2.5 text-gray-500">{p.operator || 'Andi P.'}</td>
                    <td className="py-2.5 text-gray-500">{p.shift || 'Pagi'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-4 text-xs font-medium text-gray-500 bg-gray-50 p-2.5 rounded-xl justify-center">
             <span className="text-green-600">● Aktif {pompaAktif}</span>
             <span className="text-red-500">● Offline {pompaOffline}</span>
             <span className="text-yellow-600">● Maintenance 0</span>
             <span className="text-gray-700">● Total Pompa {dataPompa.length}</span>
          </div>
        </div>

        {/* Status Tangki (col-span-12 md:col-span-6 lg:col-span-3) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-gray-900">Status Tangki</h3>
            <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Lihat semua →</a>
          </div>
          <div className="space-y-4">
            {dataTangki.map((t, idx) => {
              const persentase = (t.stok / t.kapasitas) * 100;
              const color = persentase > 60 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : persentase > 30 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-red-400 to-red-600';
              return (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-1">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{t.id}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{t.produk}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900 font-['Outfit']">{Math.round(persentase)}%</span>
                      <p className="text-[10px] text-gray-500">{t.stok.toLocaleString('id-ID')} L / {t.kapasitas.toLocaleString('id-ID')} L</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                    <div className={`${color} h-1.5 rounded-full`} style={{ width: `${persentase}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          {tankWarning > 0 && (
             <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-2 items-start">
               <AlertCircle size={14} className="text-yellow-600 mt-0.5 shrink-0" />
               <p className="text-xs text-yellow-700 leading-relaxed">
                 Terdapat <strong>{tankWarning} tangki</strong> dengan stok di bawah batas aman. Mohon jadwalkan pengisian segera.
               </p>
             </div>
          )}
        </div>

        {/* Harga BBM Hari Ini (col-span-12 md:col-span-6 lg:col-span-2) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">Harga BBM Hari Ini</h3>
          <div className="flex-1 space-y-1.5">
            {dataHargaBBM && dataHargaBBM.slice(0, 5).map((bbm, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-50 last:border-0">
                <span className="font-medium text-gray-700">{bbm.produk}</span>
                <span className="font-bold text-gray-900">{formatRupiah(bbm.harga)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alert & Notifikasi (col-span-12 md:col-span-6 lg:col-span-2) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-gray-900">Alert & Notifikasi</h3>
            <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Lihat semua →</a>
          </div>
          <div className="space-y-4 flex-1">
            {dataNotifikasi.slice(0, 4).map((notif, i) => {
              const iconColor = 
                notif.tipe === 'critical' ? 'text-red-600 bg-red-100' :
                notif.tipe === 'warning' ? 'text-yellow-600 bg-yellow-100' :
                notif.tipe === 'info' ? 'text-blue-600 bg-blue-100' :
                'text-green-600 bg-green-100';
              const IconComp = 
                notif.tipe === 'critical' ? AlertCircle :
                notif.tipe === 'warning' ? AlertCircle :
                Info;
              return (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`p-1.5 rounded-full shrink-0 mt-0.5 ${iconColor}`}>
                    <IconComp size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">{notif.judul}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{notif.pesan}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{notif.waktu}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* BAGIAN 5: QUICK ACTION + AI ASSISTANT + KONDISI SISTEM */}
      <div className="dashboard-row grid grid-cols-12 gap-4">
        {/* Quick Action (col-span-12 lg:col-span-6) */}
        <div className="col-span-12 lg:col-span-6 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Quick Action</h3>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {[
              { label: 'Buat PO', icon: ShoppingCart },
              { label: 'Catat Pengiriman', icon: Truck },
              { label: 'Input Transaksi', icon: FileText },
              { label: 'Maintenance', icon: Wrench },
              { label: 'Laporan Harian', icon: FileBarChart },
              { label: 'Cek Stok Tank', icon: Droplets },
              { label: 'Cetak Struk', icon: Printer },
              { label: 'Lainnya...', icon: MoreHorizontal },
            ].map((action, i) => (
               <button key={i} className="flex flex-col items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer">
                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl p-2.5 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                   <action.icon size={18} />
                 </div>
                 <span className="text-[11px] font-medium text-gray-600 text-center leading-tight w-full">{action.label}</span>
               </button>
            ))}
          </div>
        </div>

        {/* AI Assistant (col-span-12 md:col-span-6 lg:col-span-4) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-gray-900">AI Assistant</h3>
              <span className="bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full px-2 py-0.5">Beta</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Tanyakan tentang performa penjualan, cek stok, riwayat operasional, atau instruksikan AI untuk membuat draf analisis.
            </p>
          </div>
          <div className="flex items-center mt-auto bg-gray-50 p-1.5 rounded-xl border border-gray-200">
            <input 
              type="text" 
              placeholder="Tanyakan sesuatu pada AI..." 
              className="flex-1 bg-transparent text-xs px-3 py-2 outline-none text-gray-700 placeholder:text-gray-400"
            />
            <button className="bg-blue-600 text-white rounded-lg p-2 ml-1 hover:bg-blue-700 transition-colors cursor-pointer">
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Kondisi Sistem (col-span-12 md:col-span-6 lg:col-span-2) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Kondisi Sistem</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4">
            {[
              { label: 'Internet', status: 'Online', color: 'text-green-600' },
              { label: 'API Pertamina', status: 'Normal', color: 'text-green-600' },
              { label: 'Sensor Tank', status: 'Normal', color: 'text-green-600' },
              { label: 'CCTV', status: 'Online', color: 'text-green-600' },
              { label: 'Listrik', status: 'PLN', color: 'text-green-600' },
              { label: 'Generator', status: 'Standby', color: 'text-yellow-600' },
            ].map((sys, i) => (
              <div key={i}>
                <p className="text-[10px] text-gray-500 mb-0.5 uppercase tracking-wider">{sys.label}</p>
                <p className={`text-[11px] font-bold ${sys.color}`}>● {sys.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
