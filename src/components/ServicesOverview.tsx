import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Heart, Headphones, CheckCircle } from 'lucide-react';

// 👉 Import your card images (ensure these files live in src/assets)
import DisabilityCardImg from '/National-Disability-Carde.jpg';
import CarersCardImg from '/Nationality-Carers-Card.jpg';
import SupportCardImg from '/National-Support-Card.jpg';

const ServicesOverview: React.FC = () => {
  const services = [
    {
      icon: CreditCard,
      title: 'Disabilities Card',
      description:
        'Official recognition and access to comprehensive support services and benefits across the UAE.',
      image: DisabilityCardImg,
      features: [
        'Priority access to services',
        'Healthcare discounts',
        'Transportation benefits',
        'Shopping discounts',
        'Entertainment perks',
      ],
      link: '/disabilities-card',
    },
    {
      icon: Heart,
      title: 'Carers Card',
      description:
        'Recognition and support for dedicated caregivers who provide essential care to individuals with disabilities.',
      image: CarersCardImg,
      features: [
        'Respite care services',
        'Training programs',
        'Support networks',
        'Wellness benefits',
        'Recognition rewards',
      ],
      link: '/carers-card',
    },
    {
      icon: Headphones,
      title: 'Customer Support Card',
      description:
        'Enhanced assistance and priority support for individuals requiring additional help with daily activities.',
      image: SupportCardImg,
      features: [
        '24/7 priority support',
        'Dedicated helpline',
        'Personal assistance',
        'Quick resolution',
        'Enhanced services',
      ],
      link: '/customer-support-card',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-uae-black mb-4">
          Our Card Services
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          Choose from our range of specialized cards designed to provide
          comprehensive support and benefits tailored to your specific needs.
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform hover:-translate-y-1"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70"></div>
                {/* Card content */}
                <div className="relative p-6 h-full flex flex-col justify-between text-left">
                  <div>
                    <IconComponent className="h-8 w-8 text-uae-green mb-3" />
                    <h3 className="text-2xl font-semibold text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-gray-200 mb-4">
                      {service.description}
                    </p>
                  </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Key Benefits:
                      </h4>
                      <ul className="space-y-1 mb-4">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-gray-200"
                          >
                            <CheckCircle className="h-4 w-4 text-uae-green mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex space-x-2">
                        <Link
                          to={service.link}
                          className="px-4 py-2 bg-uae-green text-white rounded shadow hover:bg-uae-red transition-colors"
                        >
                          Learn More
                        </Link>
                        <Link
                          to="/apply"
                          className="px-4 py-2 bg-white text-uae-green rounded shadow hover:bg-gray-100 transition-colors"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
