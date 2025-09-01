import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export default function OfflineIndicator() {
  const { isOnline } = usePWA();
  const [showOffline, setShowOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowOffline(true);
      setWasOffline(true);
    } else if (wasOffline) {
      // Show "back online" message briefly
      setShowOffline(true);
      const timer = setTimeout(() => {
        setShowOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowOffline(false);
    }
  }, [isOnline, wasOffline]);

  if (!showOffline) return null;

  return (
    <div className={`offline-indicator ${showOffline ? 'show' : ''} ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Conectado novamente</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Sem conexão - Modo offline ativo</span>
          </>
        )}
      </div>
    </div>
  );
}