import React from 'react';
import Icon from '@/components/ui/icon';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;