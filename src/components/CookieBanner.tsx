import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem('cookieAccepted', 'true');
      setIsVisible(false);
    }, 300);
  };

  const handleDecline = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem('cookieAccepted', 'false');
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <Card 
        className={`
          max-w-md w-full bg-white shadow-2xl border-0 pointer-events-auto
          transition-all duration-300 ease-out
          ${isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100 animate-fade-in'}
        `}
      >
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-gradient-to-br from-[#8B5CF6] to-[#0EA5E9] p-3 rounded-2xl flex-shrink-0">
              <Icon name="Cookie" size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Мы используем cookie
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Этот сайт использует cookie для улучшения вашего опыта. 
                Продолжая использовать сайт, вы соглашаетесь с нашей политикой конфиденциальности.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Принять
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-medium transition-all duration-300"
            >
              Отклонить
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;
