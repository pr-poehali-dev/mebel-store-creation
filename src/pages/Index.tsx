import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [compareItems, setCompareItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    category: 'Все',
    priceRange: [0, 200000],
    material: 'Все',
    sortBy: 'popular'
  });
  const [isVisible, setIsVisible] = useState({});

  const categories = [
    { name: 'Спальни', icon: 'Bed', description: 'Кровати, матрасы, шкафы', image: '/img/0079d8be-1f28-49d1-863c-764215ecf8c9.jpg' },
    { name: 'Гостиные', icon: 'Sofa', description: 'Диваны, кресла, столы', image: '/img/dd6e41ff-7164-4947-87a8-5694e20f2fb9.jpg' },
    { name: 'Кухни', icon: 'ChefHat', description: 'Гарнитуры, столы, стулья', image: '/img/5a7d699e-ee82-42d6-821b-2adc4eced8f3.jpg' },
    { name: 'Детские', icon: 'Baby', description: 'Кроватки, столы, шкафы', image: '/img/dd6e41ff-7164-4947-87a8-5694e20f2fb9.jpg' },
    { name: 'Офисная', icon: 'Briefcase', description: 'Столы, кресла, шкафы', image: '/img/dd6e41ff-7164-4947-87a8-5694e20f2fb9.jpg' }
  ];

  const allFurnitureItems = [
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
    },
    {
      id: 4,
      name: 'Шкаф "Элегант"',
      price: 64990,
      category: 'Спальни',
      image: '/img/0079d8be-1f28-49d1-863c-764215ecf8c9.jpg',
      specs: {
        material: 'ЛДСП',
        size: '200x60x220 см',
        mechanism: 'Распашной',
        warranty: '24 месяца'
      }
    },
    {
      id: 5,
      name: 'Стол обеденный "Семейный"',
      price: 32990,
      category: 'Кухни',
      image: '/img/5a7d699e-ee82-42d6-821b-2adc4eced8f3.jpg',
      specs: {
        material: 'Массив сосны',
        size: '150x90x75 см',
        mechanism: 'Раздвижной',
        warranty: '18 месяцев'
      }
    },
    {
      id: 6,
      name: 'Кресло "Комфорт"',
      price: 45990,
      category: 'Гостиные',
      image: '/img/dd6e41ff-7164-4947-87a8-5694e20f2fb9.jpg',
      specs: {
        material: 'Ткань',
        size: '85x90x95 см',
        mechanism: 'Поворотный',
        warranty: '24 месяца'
      }
    }
  ];

  // Filter and cart functions
  const filteredItems = allFurnitureItems.filter(item => {
    const matchesCategory = filters.category === 'Все' || item.category === filters.category;
    const matchesPrice = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
    const matchesMaterial = filters.material === 'Все' || item.specs.material.includes(filters.material);
    return matchesCategory && matchesPrice && matchesMaterial;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i);
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === itemId ? {...i, quantity} : i));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 relative">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Корзина
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-gradient-to-r from-green-500 to-emerald-600">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина покупок</SheetTitle>
                    <SheetDescription>
                      {cartCount > 0 ? `${cartCount} товаров на сумму ${cartTotal.toLocaleString()} ₽` : 'Корзина пуста'}
                    </SheetDescription>
                  </SheetHeader>
                  
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Icon name="ShoppingCart" size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Добавьте товары в корзину</p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {cartItems.map(item => (
                        <Card key={item.id} className="p-4">
                          <div className="flex items-start space-x-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-500">{item.category}</p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Icon name="Minus" size={12} />
                                  </Button>
                                  <span className="text-sm font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Icon name="Plus" size={12} />
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Icon name="X" size={12} />
                                </Button>
                              </div>
                              <p className="text-sm font-semibold text-blue-600 mt-1">
                                {(item.price * item.quantity).toLocaleString()} ₽
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span>Итого:</span>
                        <span className="text-blue-600">{cartTotal.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Оформить заказ
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
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

      {/* Products with Filters */}
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

      {/* Services */}
      <section className="py-16" id="services" data-animate>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Наши услуги
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'Truck', title: 'Быстрая доставка', description: 'Доставим за 1-3 дня по всей России' },
              { icon: 'Wrench', title: 'Сборка мебели', description: 'Профессиональная сборка на дому' },
              { icon: 'Shield', title: 'Гарантия качества', description: 'До 3 лет гарантии на всю мебель' },
              { icon: 'CreditCard', title: 'Рассрочка 0%', description: 'Беспроцентная рассрочка до 24 месяцев' }
            ].map((service, index) => (
              <Card key={index} className={`text-center p-6 hover:shadow-lg transition-all duration-500 hover-scale ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${index * 150}ms`}}>
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