import { Home, User, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import PWAStatus from '@/components/PWAStatus';

interface BottomNavigationProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export default function BottomNavigation({ onTabChange, activeTab }: BottomNavigationProps) {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setLocation('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {/* PWA Status - left corner */}
          <div className="absolute left-2 top-2">
            <PWAStatus />
          </div>
          {/* Home Tab */}
          <button 
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'home' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => onTabChange('home')}
            data-testid="tab-home"
          >
            <Home className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>

          {/* Profile Tab */}
          <button 
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => onTabChange('profile')}
            data-testid="tab-profile"
          >
            <User className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Perfil</span>
          </button>

          {/* Logout Tab */}
          <button 
            className="flex flex-col items-center justify-center flex-1 py-2 text-slate-400 hover:text-red-500 transition-colors"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Sair</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
