import React, { useState } from 'react';
import { Handshake } from 'lucide-react';
import { Search } from 'lucide-react';

const partnerData = [
  {
    name: 'Disneyland Paris',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Disneyland_Paris_logo.svg/640px-Disneyland_Paris_logo.svg.png',
    discount: '25%',
    offer: '25% off your Park Ticket',
    category: 'Days Out',
  },
  {
    name: 'Warner Bros. Studio Tour',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Warner_Bros_logo.svg/640px-Warner_Bros_logo.svg.png',
    discount: '',
    offer: 'Free carer ticket to Warner Bros. Studio Tour',
    category: 'Leisure & Entertainment',
  },
  {
    name: 'No7 Beauty',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/No7Brand.svg/640px-No7Brand.svg.png',
    discount: '22%',
    offer: 'Exclusive 22% off',
    category: 'Health & Beauty',
  },
  {
    name: 'Odeon',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Odeon_logo.svg/640px-Odeon_logo.svg.png',
    discount: '',
    offer: 'Complimentary carer ticket',
    category: 'Leisure & Entertainment',
  },
  {
    name: 'Better',
    image: '', // No reliable public image available, so we display text only
    discount: '',
    offer:
      'Discounted Gym Membership for National Disability Cardholders',
    category: 'Sports & Fitness',
  },
  {
    name: 'Iceland',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Iceland_Foods.svg/640px-Iceland_Foods.svg.png',
    discount: '5%',
    offer: '£5 off when you spend £45+ online',
    category: 'Food & Drink',
  },
  {
    name: 'LEGOLAND',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Legoland_logo.svg/640px-Legoland_logo.svg.png',
    discount: '',
    offer: 'Free carer ticket',
    category: 'Days Out',
  },
];

const categories = [
  'All',
  'Days Out',
  'Leisure & Entertainment',
  'Health & Beauty',
  'Sports & Fitness',
  'Food & Drink',
];

const Partners: React.FC = () => {
  const stats = [
    { number: '150+', label: 'Partner Companies' },
    { number: '500+', label: 'Locations' },
    { number: '25%', label: 'Average Discount' },
    { number: '24/7', label: 'Support Available' },
  ];

  // Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredPartners = partnerData.filter(
    (partner) =>
      (selectedCategory === 'All' || partner.category === selectedCategory) &&
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const displayedPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      {/* Hero Section with new background image */}
      <div className="relative text-white py-20">
        {/* Abu Dhabi skyline with UAE flag */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Abu_Dhabi_Skyline_UAE_Flag.jpg/1280px-Abu_Dhabi_Skyline_UAE_Flag.jpg"
          alt="Abu Dhabi skyline with UAE flag"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for readability and brand colours */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-black/40 to-green-700 opacity-80"></div>
        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Handshake className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Partners
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover the extensive network of UAE businesses offering exclusive benefits to our cardholders
          </p>
        </div>
      </div>


      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="relative lg:w-1/3">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search partners"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 border rounded-full text-sm transition-colors ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white border-green-600'
                    : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPartners.map((partner, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {partner.discount && (
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  {partner.discount}
                </span>
              )}
              {/* Logo area */}
              <div className="flex items-center justify-center bg-green-50 h-32">
                {partner.image ? (
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="h-20 object-contain"
                  />
                ) : (
                  <span className="text-5xl text-green-600">
                    {partner.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {partner.offer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>
        )}
      </div>

      {/* Become a Partner CTA (unchanged) */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Become Our Partner
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join our network of partners and help create a more inclusive UAE
            while growing your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Partnership Information
            </button>
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Apply to Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
