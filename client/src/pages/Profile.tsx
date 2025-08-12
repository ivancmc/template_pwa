import { useState } from 'react';
import { User, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { userProfile, updateProfile, changePassword } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(userProfile?.name || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    
    try {
      await updateProfile({ name, phone });
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar perfil. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos de senha.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoadingPassword(true);
    
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso!",
        variant: "default",
      });
    } catch (error: any) {
      let errorMessage = 'Erro ao alterar senha. Tente novamente.';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha atual incorreta.';
      }
      
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="h-20 w-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Meu Perfil</h1>
          <p className="text-slate-600" data-testid="text-email">{userProfile?.email}</p>
        </div>

        {/* Profile Form */}
        <form className="space-y-6" onSubmit={handleSaveProfile}>
          {/* Name Field */}
          <div className="relative">
            <input 
              id="profileName" 
              name="name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full px-4 py-4 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Seu nome"
              data-testid="input-name"
            />
            <label 
              htmlFor="profileName" 
              className="floating-label floating-label-active peer-focus:text-blue-600"
            >
              Nome completo
            </label>
          </div>

          {/* Phone Field */}
          <div className="relative">
            <input 
              id="profilePhone" 
              name="phone" 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="peer w-full px-4 py-4 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="(11) 99999-9999"
              data-testid="input-phone"
            />
            <label 
              htmlFor="profilePhone" 
              className="floating-label floating-label-active peer-focus:text-blue-600"
            >
              Telefone
            </label>
          </div>

          {/* Email Field (Read-only) */}
          <div className="relative">
            <input 
              id="profileEmail" 
              name="email" 
              type="email" 
              readOnly
              value={userProfile?.email || ''}
              className="peer w-full px-4 py-4 border border-slate-300 rounded-lg bg-slate-50 placeholder-transparent text-slate-500 cursor-not-allowed"
            />
            <label 
              htmlFor="profileEmail" 
              className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-slate-500"
            >
              E-mail (não pode ser alterado)
            </label>
          </div>

          {/* Save Button */}
          <button 
            type="submit" 
            disabled={loadingProfile}
            className="w-full bg-blue-500 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            data-testid="button-save-profile"
          >
            {loadingProfile ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                Salvando...
              </>
            ) : (
              'Salvar alterações'
            )}
          </button>
        </form>

        {/* Change Password Section */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Alterar senha</h3>
          
          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div className="relative">
              <input 
                id="currentPassword" 
                name="currentPassword" 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="peer w-full px-4 py-3 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Senha atual"
                data-testid="input-current-password"
              />
              <label 
                htmlFor="currentPassword" 
                className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-slate-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
              >
                Senha atual
              </label>
            </div>

            <div className="relative">
              <input 
                id="newPassword" 
                name="newPassword" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer w-full px-4 py-3 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Nova senha"
                data-testid="input-new-password"
              />
              <label 
                htmlFor="newPassword" 
                className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-slate-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
              >
                Nova senha (mín. 6 caracteres)
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loadingPassword}
              className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              data-testid="button-change-password"
            >
              {loadingPassword ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                  Alterando...
                </>
              ) : (
                'Alterar senha'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
