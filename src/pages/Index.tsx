import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/CategoriesSection';
import ProductsSection from '@/components/ProductsSection';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';

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
      <Header
        cartItems={cartItems}
        compareItems={compareItems}
        cartTotal={cartTotal}
        cartCount={cartCount}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        toggleCompare={toggleCompare}
      />
      
      <Hero />
      
      <CategoriesSection
        categories={categories}
        isVisible={isVisible}
        setFilters={setFilters}
      />
      
      <ProductsSection
        filteredItems={filteredItems}
        filters={filters}
        setFilters={setFilters}
        isVisible={isVisible}
        addToCart={addToCart}
        toggleCompare={toggleCompare}
        isInCompare={isInCompare}
      />
      
      <ServicesSection isVisible={isVisible} />
      
      <Footer />
    </div>
  );
};

export default Index;