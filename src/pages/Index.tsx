import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [compareItems, setCompareItems] = useState([]);

  const categories = [
    { name: 'Спальни', icon: 'Bed', description: 'Кровати, матрасы, шкафы', image: '/img/0079d8be-1f28-49d1-863c-764215ecf8c9.jpg' },
    { name: 'Гостиные', icon: 'Sofa', description: 'Диваны, кресла, столы', image: '/img/dd6e41ff-7164-4947-87a8-5694e20f2fb9.jpg' },
    { name: 'Кухни', icon: 'ChefHat', description: 'Гарнитуры, столы, стулья', image: '/img/5a7d699e-ee82-42d6-821b-2adc4eced8f3.jpg' },
    { name: 'Детские', icon: 'Baby', description: 'Кроватки, столы, шкафы', image: '/img/dd6e41ff-7164-4947-87a8-5694e20f2fb9.jpg' },
    { name: 'Офисная', icon: 'Briefcase', description: 'Столы, кресла, шкафы', image: '/img/dd6e41ff-7164-4947-87a8-5694e20f2fb9.jpg' }
  ];

  const furnitureItems = [
    {
      id: 1,
      name: 'Диван "Комфорт Плюс"',
      price: 89990,
      category: 'Гостиные',
      image: '/img/dd6e41ff-7164-4947-87a8-5694e20f2fb9.jpg',
      specs: {
        material: 'Экокожа',
        size: '220x90x85 см',
        mechanism: 'Еврокнижка',
        warranty: '24 месяца'
      }
    },
    {
      id: 2,
      name: 'Кровать "Мечта"',
      price: 54990,
      category: 'Спальни',
      image: '/img/0079d8be-1f28-49d1-863c-764215ecf8c9.jpg',
      specs: {
        material: 'Массив дуба',
        size: '160x200 см',
        mechanism: 'Подъемный',
        warranty: '36 месяцев'
      }
    },
    {
      id: 3,
      name: 'Кухонный гарнитур "Модерн"',
      price: 129990,
      category: 'Кухни',
      image: '/img/5a7d699e-ee82-42d6-821b-2adc4eced8f3.jpg',
      specs: {
        material: 'МДФ с покрытием',
        size: '3.2 метра',
        mechanism: 'Доводчики',
        warranty: '12 месяцев'
      }
    }
  ];

  const toggleCompare = (item) => {
    setCompareItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      if (prev.length < 3) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const isInCompare = (itemId) => compareItems.some(i => i.id === itemId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="Home" className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                МебельПро
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Главная</a>
              <a href="#catalog" className="text-gray-700 hover:text-blue-600 transition-colors">Каталог</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Доставка</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Icon name="BarChart3" size={16} />
                    Сравнить
                    {compareItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-gradient-to-r from-blue-600 to-purple-600">
                        {compareItems.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Сравнение товаров</SheetTitle>
                    <SheetDescription>
                      Сравните характеристики выбранных товаров
                    </SheetDescription>
                  </SheetHeader>
                  
                  {compareItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Icon name="BarChart3" size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Добавьте товары для сравнения</p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {compareItems.map(item => (
                        <Card key={item.id} className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleCompare(item)}
                              className="h-6 w-6 p-0"
                            >
                              <Icon name="X" size={12} />
                            </Button>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Материал:</span>
                              <span>{item.specs.material}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Размер:</span>
                              <span>{item.specs.size}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Механизм:</span>
                              <span>{item.specs.mechanism}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Гарантия:</span>
                              <span>{item.specs.warranty}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-2">
                              <span>Цена:</span>
                              <span className="text-blue-600">{item.price.toLocaleString()} ₽</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </SheetContent>
              </Sheet>
              
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Мебель Вашей Мечты
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Современные решения для дома и офиса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8">
              <Icon name="Search" size={20} className="mr-2" />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8">
              <Icon name="Phone" size={20} className="mr-2" />
              Консультация
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Каталог мебели
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover-scale border-0 shadow-lg">
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
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Смотреть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Популярные товары
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {furnitureItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 hover-scale border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600">
                      Хит продаж
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
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Наши услуги
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'Truck', title: 'Быстрая доставка', description: 'Доставим за 1-3 дня по всей России' },
              { icon: 'Wrench', title: 'Сборка мебели', description: 'Профессиональная сборка на дому' },
              { icon: 'Shield', title: 'Гарантия качества', description: 'До 3 лет гарантии на всю мебель' },
              { icon: 'CreditCard', title: 'Рассрочка 0%', description: 'Беспроцентная рассрочка до 24 месяцев' }
            ].map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow hover-scale">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={service.icon} className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="Home" className="text-white" size={16} />
                </div>
                <span className="text-xl font-bold">МебельПро</span>
              </div>
              <p className="text-gray-400">Качественная мебель для вашего дома</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Спальни</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гостиные</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Кухни</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Детские</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center"><Icon name="Phone" size={16} className="mr-2" /> +7 (495) 123-45-67</p>
                <p className="flex items-center"><Icon name="Mail" size={16} className="mr-2" /> info@mebelpro.ru</p>
                <p className="flex items-center"><Icon name="MapPin" size={16} className="mr-2" /> Москва, ул. Мебельная, 1</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 МебельПро. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;