
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Heart, Calendar, MessageCircle, Info, Book, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation, Link } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/" },
    { title: "Resources", icon: Book, path: "/resources" },
    { title: "Symptom Tracker", icon: Calendar, path: "/symptom-tracker" },
    { title: "AI Assistant", icon: MessageCircle, path: "/assistant" },
    { title: "Community", icon: Heart, path: "/community" },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <div className="h-16 flex items-center justify-center border-b border-border p-2">
            <Link to="/" className="focus-ring rounded-md">
              <h1 className="text-xl font-semibold text-primary">MeNova</h1>
            </Link>
            {isMobile && (
              <button 
                onClick={() => setSidebarOpen(false)}
                className="ml-auto p-1 rounded-md hover:bg-secondary smooth-transition"
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <SidebarContent className="p-0">
            <nav className="space-y-1 p-2">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ease-in-out ${
                    isActive(item.path) 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <p>© {new Date().getFullYear()} MeNova</p>
              <p>v1.0.0</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col flex-1 min-w-0">
          <Navbar>
            <SidebarTrigger 
              className="mr-2" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={20} />
            </SidebarTrigger>
          </Navbar>
          <main className="flex-1 overflow-auto p-4 md:p-6 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
