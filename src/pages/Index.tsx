import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import CookieBanner from '@/components/CookieBanner';

const Index = () => {
  const [weather, setWeather] = useState({
    temp: 22,
    condition: 'Ясно',
    humidity: 65,
    windSpeed: 12,
    feelsLike: 20,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateWeather = () => {
      const temps = [18, 20, 22, 24, 19, 21, 23];
      const conditions = ['Ясно', 'Облачно', 'Переменная облачность', 'Солнечно'];
      
      setWeather({
        temp: temps[Math.floor(Math.random() * temps.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 10) + 8,
        feelsLike: temps[Math.floor(Math.random() * temps.length)] - 2,
      });
    };

    const interval = setInterval(updateWeather, 30000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Ясно') || condition.includes('Солнечно')) return 'Sun';
    if (condition.includes('Облачно')) return 'Cloud';
    if (condition.includes('Переменная')) return 'CloudSun';
    return 'Sun';
  };

  return (
    <>
      <CookieBanner />
      <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#0EA5E9] flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Воротынск
          </h1>
          <p className="text-white/80 text-lg">
            {new Date().toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </p>
        </div>

        <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-2xl overflow-hidden animate-scale-in">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-white/30 p-4 rounded-3xl backdrop-blur-sm">
                  <Icon 
                    name={getWeatherIcon(weather.condition)} 
                    size={56} 
                    className="text-white drop-shadow-md"
                  />
                </div>
                <div>
                  <div className="text-7xl font-bold text-white drop-shadow-lg">
                    {weather.temp}°
                  </div>
                  <div className="text-white/90 text-xl mt-1">
                    {weather.condition}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <Icon name="Droplets" size={24} className="text-white/80 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{weather.humidity}%</div>
                <div className="text-white/70 text-sm mt-1">Влажность</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <Icon name="Wind" size={24} className="text-white/80 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{weather.windSpeed} м/с</div>
                <div className="text-white/70 text-sm mt-1">Ветер</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <Icon name="Thermometer" size={24} className="text-white/80 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{weather.feelsLike}°</div>
                <div className="text-white/70 text-sm mt-1">Ощущается</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Обновлено: {new Date().toLocaleTimeString('ru-RU', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;