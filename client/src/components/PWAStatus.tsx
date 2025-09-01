import { Wifi, WifiOff, Download, Share2 } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { useToast } from '@/hooks/use-toast';

export default function PWAStatus() {
  const { isOnline, isStandalone, isInstallable, installPWA, shareApp } = usePWA();
  const { toast } = useToast();

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      toast({
        title: "App Instalado!",
        description: "AuthFlow foi adicionado à sua tela inicial.",
      });
    } else {
      toast({
        title: "Instalação",
        description: "Não foi possível instalar o app no momento.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const success = await shareApp();
    if (success) {
      toast({
        title: "Compartilhado!",
        description: "Link copiado para a área de transferência.",
      });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível compartilhar o app.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Connection Status */}
      <div className="flex items-center gap-1 text-xs">
        {isOnline ? (
          <Wifi className="w-4 h-4 text-green-500" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-500" />
        )}
      </div>

      {/* Install Button */}
      {isInstallable && (
        <button
          onClick={handleInstall}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
          title="Instalar App"
          data-testid="button-install-app"
        >
          <Download className="w-4 h-4" />
        </button>
      )}

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-700"
        title="Compartilhar App"
        data-testid="button-share-app"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Standalone Mode Indicator */}
      {isStandalone && (
        <div className="w-2 h-2 bg-blue-500 rounded-full" title="Modo App"></div>
      )}
    </div>
  );
}