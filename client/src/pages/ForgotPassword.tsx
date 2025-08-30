import { useState } from 'react';
import { Link } from 'wouter';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, digite seu e-mail.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      await resetPassword(email);
      setEmailSent(true);
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || 'Erro ao enviar e-mail. Tente novamente.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-slate-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Back Button */}
          <Link href="/login" className="mb-4 text-slate-600 hover:text-slate-800 flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao login
          </Link>

          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">E-mail Enviado!</h1>
            <p className="text-slate-600 mt-2">
              Enviamos um link para redefinir sua senha para:
            </p>
            <p className="text-blue-600 font-medium mt-1">{email}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-800 mb-2">Próximos passos:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>1. Verifique sua caixa de entrada</li>
              <li>2. Clique no link recebido por e-mail</li>
              <li>3. Defina sua nova senha</li>
              <li>4. Faça login com a nova senha</li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={() => setEmailSent(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
              data-testid="button-send-again"
            >
              Não recebeu? Enviar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Back Button */}
        <Link href="/login" className="mb-4 text-slate-600 hover:text-slate-800 flex items-center">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar ao login
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Esqueceu a Senha?</h1>
          <p className="text-slate-600 mt-2">
            Digite seu e-mail e enviaremos um link para redefinir sua senha
          </p>
        </div>

        {/* Reset Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              id="resetEmail" 
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
              htmlFor="resetEmail" 
              className="floating-label floating-label-active peer-focus:text-blue-600"
            >
              E-mail
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-reset-password"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                Enviando...
              </>
            ) : (
              'Enviar Link de Redefinição'
            )}
          </button>

          {/* Info */}
          <div className="text-center text-sm text-slate-600">
            Lembrou da senha?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Fazer login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}