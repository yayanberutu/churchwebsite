import { 
  Users, 
  Calendar, 
  BookOpen, 
  TrendingUp,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { Card } from '../../components/admin/UI';
import { cn } from '../../utils/cn';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <Card className="flex items-start justify-between">
    <div>
      <p className="text-xs font-bold text-on-surface/50 uppercase tracking-wider mb-2">{title}</p>
      <h3 className="text-3xl font-headline font-bold text-on-surface mb-2">{value}</h3>
      <div className="flex items-center gap-1.5">
        <span className={cn("flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full", trend > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
          <TrendingUp size={12} className={cn(trend < 0 && "rotate-180")} />
          {Math.abs(trend)}%
        </span>
        <span className="text-[11px] font-medium text-on-surface/40">vs bulan lalu</span>
      </div>
    </div>
    <div className={cn("p-4 rounded-2xl", color)}>
      <Icon className="text-white" size={24} />
    </div>
  </Card>
);

const DashboardOverview = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Jemaat" 
          value="1,284" 
          icon={Users} 
          trend={12} 
          color="bg-primary shadow-lg shadow-primary/30" 
        />
        <StatCard 
          title="Jadwal Ibadah" 
          value="8" 
          icon={Calendar} 
          trend={0} 
          color="bg-secondary shadow-lg shadow-secondary/30" 
        />
        <StatCard 
          title="Ayat Harian" 
          value="31" 
          icon={BookOpen} 
          trend={5} 
          color="bg-amber-600 shadow-lg shadow-amber-600/30" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="p-0 overflow-hidden">
          <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between">
            <h3 className="font-headline font-bold text-xl text-on-surface">Aktivitas Terakhir</h3>
            <button className="text-primary text-sm font-bold flex items-center gap-1 group">
              Lihat Semua <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="p-6 flex items-center gap-4 hover:bg-surface-container-low/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Update Jadwal Ibadah Minggu</p>
                  <p className="text-xs text-on-surface/40 font-medium">Oleh Sekretaris Gereja • 2 jam yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-primary relative overflow-hidden flex flex-col justify-end min-h-[320px] p-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mb-4">Tips Admin</p>
            <h3 className="text-3xl font-headline font-bold text-white mb-6 leading-tight">
              Selalu periksa Ayat Harian <br /> untuk menyapa jemaat setiap pagi.
            </h3>
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-all">
              Atur Sekarang
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
