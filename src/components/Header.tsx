import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

interface CompareItem {
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

interface HeaderProps {
  cartItems: CartItem[];
  compareItems: CompareItem[];
  cartTotal: number;
  cartCount: number;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  toggleCompare: (item: CompareItem) => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItems,
  compareItems,
  cartTotal,
  cartCount,
  removeFromCart,
  updateQuantity,
  toggleCompare
}) => {
  return (
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
  );
};

export default Header;