import { Home as HomeIcon, User, ShieldCheck, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HomeProps {
  onSwitchToProfile: () => void;
}

export default function Home({ onSwitchToProfile }: HomeProps) {
  const { userProfile } = useAuth();

  return (
    <div className="px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <HomeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                Olá, {userProfile?.name || 'Usuário'}!
              </h1>
              <p className="text-slate-600 text-sm">Bem-vindo de volta</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center">
            <div className="h-8 w-8 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm text-slate-600">Perfil</p>
            <p className="font-semibold text-slate-800">Ativo</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center">
            <div className="h-8 w-8 bg-emerald-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-sm text-slate-600">Segurança</p>
            <p className="font-semibold text-slate-800">Ok</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Configure seu perfil</h3>
            <p className="text-blue-100 text-sm mb-4">Complete suas informações para uma melhor experiência</p>
            <button 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              onClick={onSwitchToProfile}
              data-testid="button-profile"
            >
              Acessar perfil
            </button>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center mb-3">
              <Info className="h-5 w-5 text-slate-400 mr-3" />
              <h3 className="font-medium text-slate-800">Funcionalidades em breve</h3>
            </div>
            <p className="text-slate-600 text-sm">Novas funcionalidades serão adicionadas em breve. Fique atento às atualizações!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
