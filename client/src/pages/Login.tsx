import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { UserCheck, Loader2 } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      await signIn(email, password);
      setLocation('/');
    } catch (error: any) {
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido.';
      }
      
      toast({
        title: "Erro",
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
        {/* App Logo/Title */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <UserCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Bem-vindo</h1>
          <p className="text-slate-600 mt-2">Entre na sua conta para continuar</p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-4 py-4 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
              data-testid="input-email"
            />
            <label 
              htmlFor="email" 
              className="floating-label floating-label-active peer-focus:text-blue-600"
            >
              E-mail
            </label>
          </div>

          <div className="relative">
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 py-4 border border-slate-300 rounded-lg bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Senha"
              data-testid="input-password"
            />
            <label 
              htmlFor="password" 
              className="floating-label floating-label-active peer-focus:text-blue-600"
            >
              Senha
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading || googleLoading}
            className="w-full bg-blue-500 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-submit"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                Entrando...
              </>
            ) : (
              'Entrar'
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
            className="w-full flex justify-center items-center py-4 px-4 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            data-testid="button-google-signin"
          >
            {googleLoading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-3" />
            ) : (
              <FaGoogle className="h-5 w-5 mr-3 text-red-500" />
            )}
            Continuar com Google
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
              Esqueceu a senha?
            </Link>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-slate-600">Não tem uma conta?</span>
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
