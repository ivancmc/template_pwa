import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { UserPlus, ArrowLeft, Loader2 } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      await signUp(email, password);
      setLocation('/');
    } catch (error: any) {
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      if (error.name === 'ConfigurationError') {
        errorMessage = 'Firebase não configurado. Verifique as instruções de configuração.';
      } else if (error.code === 'auth/configuration-not-found') {
        errorMessage = 'Autenticação não habilitada no Firebase. Configure o projeto no console Firebase.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Senha muito fraca.';
      }
      
      console.error('Registration error:', error);
      
      toast({
        title: "Erro de Configuração",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    
    try {
      await signInWithGoogle();
      setLocation('/');
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || 'Erro no login com Google. Tente novamente.',
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Back Button */}
        <Link href="/login" className="mb-4 text-slate-600 hover:text-slate-800 flex items-center">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Criar Conta</h1>
          <p className="text-slate-600 mt-2">Preencha os dados para se cadastrar</p>
        </div>

        {/* Register Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              id="registerEmail" 
              name="email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-4 py-4 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
              data-testid="input-email"
            />
            <label 
              htmlFor="registerEmail" 
              className="floating-label floating-label-active peer-focus:text-emerald-600"
            >
              E-mail
            </label>
          </div>

          <div className="relative">
            <input 
              id="registerPassword" 
              name="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 py-4 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Senha"
              data-testid="input-password"
            />
            <label 
              htmlFor="registerPassword" 
              className="floating-label floating-label-active peer-focus:text-emerald-600"
            >
              Senha (mín. 6 caracteres)
            </label>
          </div>

          <div className="relative">
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer w-full px-4 py-4 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Confirmar Senha"
              data-testid="input-confirm-password"
            />
            <label 
              htmlFor="confirmPassword" 
              className="floating-label floating-label-active peer-focus:text-emerald-600"
            >
              Confirmar Senha
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading || googleLoading}
            className="w-full bg-emerald-500 text-white py-4 px-4 rounded-lg font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            data-testid="button-submit"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-300"></div>
            <div className="mx-4 text-slate-500 text-sm">ou</div>
            <div className="flex-1 border-t border-slate-300"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full flex justify-center items-center py-4 px-4 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            data-testid="button-google-signin"
          >
            {googleLoading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-3" />
            ) : (
              <FaGoogle className="h-5 w-5 mr-3 text-red-500" />
            )}
            Continuar com Google
          </button>
        </form>
      </div>
    </div>
  );
}
