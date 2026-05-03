import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  FileText, 
  Bell, 
  CalendarClock,
  LogOut,
  ChevronRight,
  Camera
} from 'lucide-react';
import { cn } from '../utils/cn';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Jadwal Ibadah', icon: Calendar, path: '/admin/worship-schedules' },
  { name: 'Ayat Harian', icon: BookOpen, path: '/admin/daily-verses' },
  { name: 'Warta', icon: FileText, path: '/admin/wartas' },
  { name: 'Pengumuman', icon: Bell, path: '/admin/announcements' },
  { name: 'Kegiatan Pelayanan', icon: Camera, path: '/admin/activities' },
  { name: 'Kegiatan Mendatang', icon: CalendarClock, path: '/admin/upcoming-activities' },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background font-body">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-outline-variant/15 bg-surface flex flex-col fixed inset-y-0">
        <div className="p-8">
          <h1 className="text-primary font-headline font-bold text-xl tracking-tight">
            HKBP Kernolong
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-on-surface/70 hover:bg-surface-container-low hover:text-on-surface"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-primary")} />
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && <ChevronRight size={16} className="ml-auto opacity-70" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant/15">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-on-surface/70 hover:bg-secondary/10 hover:text-secondary transition-colors">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <header className="h-[72px] glass border-b border-outline-variant/15 flex items-center justify-between px-10 sticky top-0 z-30">
          <h2 className="font-headline font-bold text-lg text-on-surface">
            {sidebarItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-sm font-bold text-on-surface leading-tight">Sekretaris Gereja</p>
              <p className="text-[11px] text-on-surface/50 font-medium">HKBP Kernolong</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              SG
            </div>
          </div>
        </header>

        <div className="p-10 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
