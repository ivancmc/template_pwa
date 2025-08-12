import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { UserCheck, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();
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
            disabled={loading}
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
