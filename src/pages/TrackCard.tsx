import React, { useState } from 'react';
import { Search, CreditCard, Calendar, User, Mail, Phone, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { trackCard, Card } from '../api/cardApi';

const TrackCard: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState<Card | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber.trim()) {
      toast.error('Please enter a card number');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const result = await trackCard(cardNumber.trim());
      if (result.found && result.card) {
        setCardData(result.card);
        toast.success('Card found!');
      } else {
        setCardData(null);
        toast.error('Card not found. Please check your card number.');
      }
    } catch (error: any) {
      console.error('Error tracking card:', error);
      if (error.message?.includes('404')) {
        toast.error('Card not found. Please check your card number.');
      } else {
        toast.error(error.message || 'Failed to track card');
      }
      setCardData(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-yellow-600 bg-yellow-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track My Card</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your card number below to check the status and details of your disability, carers, or support card.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Enter your card number (e.g., ND-123456789, NC-123456789, NS-123456789)"
                  disabled={loading}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Track Card
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {cardData ? (
              <div className="p-8">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{cardData.cardNumber}</h2>
                      <p className="text-gray-600">{cardData.cardType}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full flex items-center ${getStatusColor(cardData.status)}`}>
                    {getStatusIcon(cardData.status)}
                    <span className="ml-2 font-medium capitalize">{cardData.status}</span>
                  </div>
                </div>

                {/* Card Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2 text-green-600" />
                      Cardholder Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-lg text-gray-900">{cardData.cardholderName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-600" />
                      Card Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Issue Date</label>
                        <p className="text-lg text-gray-900">
                          {new Date(cardData.issuedDate).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Expiry Date</label>
                        <div className="flex items-center">
                          <p className="text-lg text-gray-900 mr-2">
                            {new Date(cardData.expiryDate).toLocaleDateString('en-GB', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          {isExpired(cardData.expiryDate) && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                              EXPIRED
                            </span>
                          )}
                          {!isExpired(cardData.expiryDate) && getDaysUntilExpiry(cardData.expiryDate) <= 60 && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs font-medium rounded">
                              Expires in {getDaysUntilExpiry(cardData.expiryDate)} days
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Information */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                        cardData.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <p className="text-sm font-medium text-gray-700">Active</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                        !isExpired(cardData.expiryDate) ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <p className="text-sm font-medium text-gray-700">Valid</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                        getDaysUntilExpiry(cardData.expiryDate) > 60 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <p className="text-sm font-medium text-gray-700">Renewed</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {cardData.notes && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-green-600" />
                      Additional Notes
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700">{cardData.notes}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  {isExpired(cardData.expiryDate) && (
                    <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Renew Card
                    </button>
                  )}
                  <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Contact Support
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Card Not Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find a card with the number "{cardNumber}". 
                  Please check your card number and try again.
                </p>
                <div className="text-left bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Tips:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Make sure you're entering the complete card number</li>
                    <li>• Card numbers usually start with ND-, NC-, or NS-</li>
                    <li>• Check for any typos or missing characters</li>
                    <li>• Contact support if you continue to have issues</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contact Support</h4>
              <p className="text-gray-600 mb-2">
                If you can't find your card or need assistance, our support team is here to help.
              </p>
              <div className="flex items-center text-green-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>+971-xxx-xxxx</span>
              </div>
              <div className="flex items-center text-green-600 mt-1">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@uae-cards.gov.ae</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Card Types</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• <strong>ND-</strong> National Disability Cards</li>
                <li>• <strong>NC-</strong> National Carers Cards</li>
                <li>• <strong>NS-</strong> National Support Cards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
