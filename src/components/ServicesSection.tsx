import React from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ServicesSectionProps {
  isVisible: { [key: string]: boolean };
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isVisible }) => {
  const services = [
    { icon: 'Truck', title: 'Быстрая доставка', description: 'Доставим за 1-3 дня по всей России' },
    { icon: 'Wrench', title: 'Сборка мебели', description: 'Профессиональная сборка на дому' },
    { icon: 'Shield', title: 'Гарантия качества', description: 'До 3 лет гарантии на всю мебель' },
    { icon: 'CreditCard', title: 'Рассрочка 0%', description: 'Беспроцентная рассрочка до 24 месяцев' }
  ];

  return (
    <section className="py-16" id="services" data-animate>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Наши услуги
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
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
  );
};

export default ServicesSection;