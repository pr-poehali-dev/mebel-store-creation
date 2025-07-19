import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Category {
  name: string;
  icon: string;
  description: string;
  image: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  isVisible: { [key: string]: boolean };
  setFilters: React.Dispatch<React.SetStateAction<{
    category: string;
    priceRange: number[];
    material: string;
    sortBy: string;
  }>>;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  isVisible,
  setFilters
}) => {
  return (
    <section id="catalog" className="py-16" data-animate>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${isVisible.catalog ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Каталог мебели
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-500 hover-scale border-0 shadow-lg ${isVisible.catalog ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${index * 100}ms`}}>
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Icon name={category.icon} size={24} className="mb-2" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Button 
                    onClick={() => setFilters(prev => ({...prev, category: category.name}))}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Смотреть
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;