import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  time: string;
  icon: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: 'Открытие нового спортивного комплекса',
      description: 'В Воротынске состоялось торжественное открытие современного спортивного комплекса с бассейном',
      category: 'Спорт',
      time: '2 часа назад',
      icon: 'Trophy'
    },
    {
      id: 2,
      title: 'Фестиваль народного творчества',
      description: 'На центральной площади пройдет ежегодный фестиваль с участием местных коллективов',
      category: 'Культура',
      time: '5 часов назад',
      icon: 'Music'
    },
    {
      id: 3,
      title: 'Благоустройство парка завершено',
      description: 'Завершены работы по благоустройству центрального парка: новые дорожки, скамейки и освещение',
      category: 'Благоустройство',
      time: '1 день назад',
      icon: 'Trees'
    },
    {
      id: 4,
      title: 'Школьная олимпиада по математике',
      description: 'Ученики местных школ приняли участие в региональной олимпиаде, показав отличные результаты',
      category: 'Образование',
      time: '2 дня назад',
      icon: 'GraduationCap'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ['Все', 'Спорт', 'Культура', 'Благоустройство', 'Образование'];

  const filteredNews = selectedCategory === 'Все' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Спорт': 'bg-gradient-to-r from-orange-400 to-red-500',
      'Культура': 'bg-gradient-to-r from-purple-400 to-pink-500',
      'Благоустройство': 'bg-gradient-to-r from-green-400 to-emerald-500',
      'Образование': 'bg-gradient-to-r from-blue-400 to-cyan-500'
    };
    return colors[category] || 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  return (
    <div className={`transition-all duration-700 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] p-3 rounded-2xl">
          <Icon name="Newspaper" size={28} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Новости Воротынска</h2>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300
              ${selectedCategory === category 
                ? 'bg-white text-[#8B5CF6] shadow-lg scale-105' 
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredNews.map((item, index) => (
          <Card 
            key={item.id}
            className="bg-white/20 backdrop-blur-xl border-white/30 overflow-hidden hover:bg-white/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className={`${getCategoryColor(item.category)} p-3 rounded-2xl flex-shrink-0`}>
                  <Icon name={item.icon as any} size={24} className="text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge className={`${getCategoryColor(item.category)} text-white border-0`}>
                      {item.category}
                    </Badge>
                    <span className="text-white/60 text-sm flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {item.time}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  <button className="mt-3 text-white font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300">
                    Читать далее
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Icon name="SearchX" size={48} className="text-white/40 mx-auto mb-4" />
          <p className="text-white/60 text-lg">Новостей в этой категории пока нет</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
