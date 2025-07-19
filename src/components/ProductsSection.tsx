import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface FurnitureItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  specs: {
    material: string;
    size: string;
    mechanism: string;
    warranty: string;
  };
}

interface Filters {
  category: string;
  priceRange: number[];
  material: string;
  sortBy: string;
}

interface ProductsSectionProps {
  filteredItems: FurnitureItem[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isVisible: { [key: string]: boolean };
  addToCart: (item: FurnitureItem) => void;
  toggleCompare: (item: FurnitureItem) => void;
  isInCompare: (itemId: number) => boolean;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  filteredItems,
  filters,
  setFilters,
  isVisible,
  addToCart,
  toggleCompare,
  isInCompare
}) => {
  return (
    <section className="py-16 bg-white/50" id="products" data-animate>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Наши товары
        </h2>
        
        {/* Filters */}
        <Card className="mb-8 p-6 bg-white/80 backdrop-blur-sm">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Категория</Label>
              <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({...prev, category: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Все">Все категории</SelectItem>
                  <SelectItem value="Спальни">Спальни</SelectItem>
                  <SelectItem value="Гостиные">Гостиные</SelectItem>
                  <SelectItem value="Кухни">Кухни</SelectItem>
                  <SelectItem value="Детские">Детские</SelectItem>
                  <SelectItem value="Офисная">Офисная</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Материал</Label>
              <Select value={filters.material} onValueChange={(value) => setFilters(prev => ({...prev, material: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Все">Все материалы</SelectItem>
                  <SelectItem value="Массив">Массив дерева</SelectItem>
                  <SelectItem value="МДФ">МДФ</SelectItem>
                  <SelectItem value="Экокожа">Экокожа</SelectItem>
                  <SelectItem value="Ткань">Ткань</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Сортировка</Label>
              <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({...prev, sortBy: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-low">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-high">Цена: по убыванию</SelectItem>
                  <SelectItem value="name">По названию</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-4 block">
                Цена: {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()} ₽
              </Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters(prev => ({...prev, priceRange: value}))}
                max={200000}
                min={0}
                step={5000}
                className="w-full"
              />
            </div>
          </div>
        </Card>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card key={item.id} className={`group hover:shadow-xl transition-all duration-500 hover-scale border-0 shadow-lg ${isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${index * 100}ms`}}>
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600">
                    {item.price < 50000 ? 'Хит цены' : 'Премиум'}
                  </Badge>
                  <Button
                    variant={isInCompare(item.id) ? "default" : "secondary"}
                    size="sm"
                    onClick={() => toggleCompare(item)}
                    className="absolute top-4 right-4"
                  >
                    <Icon name="BarChart3" size={16} />
                  </Button>
                </div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-2">{item.category}</Badge>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Материал:</span>
                      <span>{item.specs.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Размер:</span>
                      <span>{item.specs.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Гарантия:</span>
                      <span>{item.specs.warranty}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      {item.price.toLocaleString()} ₽
                    </span>
                    <Button 
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Товары не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры фильтра</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;