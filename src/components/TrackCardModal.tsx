import React, { useState } from 'react';
import { X, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { trackCard, Card } from '../api/cardApi';
import { toast } from 'react-hot-toast';

interface TrackCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrackCardModal: React.FC<TrackCardModalProps> = ({ isOpen, onClose }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [cardData, setCardData] = useState<Card | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!cardNumber.trim()) {
      toast.error('Please enter a card number');
      return;
    }

    setIsSearching(true);
    setError('');
    setCardData(null);

    try {
      const result = await trackCard(cardNumber.trim());
      if (result.found && result.card) {
        setCardData(result.card);
        toast.success('Card found!');
      } else {
        setError('Card number not found. Please check your card number and try again.');
        toast.error('Card not found');
      }
    } catch (err: any) {
      console.error('Error tracking card:', err);
      setError(err.message || 'Failed to track card');
      toast.error(err.message || 'Failed to track card');
    } finally {
      setIsSearching(false);
    }
  };

  const handleClose = () => {
    setCardNumber('');
    setCardData(null);
    setError('');
    onClose();
  };

  const getCardImage = (type: string) => {
    switch (type) {
      case 'National Carers Card':
        return '/Nationality-Carers-Card.jpg';
      case 'National Disability Card':
        return '/National-Disability-Carde.jpg';
      case 'National Support Card':
        return '/National-Support-Card.jpg';
      default:
        return '/National-Disability-Carde.jpg';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Track My Card</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!cardData ? (
            /* Search Form */
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-uae-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Your Card Number</h3>
                <p className="text-gray-600">Please enter your card number to track your card status and view details</p>
              </div>

              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter card number (e.g., ND-123456789)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green text-center text-lg font-mono"
                    disabled={isSearching}
                  />
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                <button
                  onClick={handleSearch}
                  disabled={!cardNumber.trim() || isSearching}
                  className={`w-full mt-4 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    !cardNumber.trim() || isSearching
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-uae-green text-white hover:bg-green-700 transform hover:scale-105'
                  }`}
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    'Track Card'
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Card Details Display */
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Card Found!</h3>
                <p className="text-gray-600">Here are your card details</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Card Image */}
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={getCardImage(cardData.cardType)}
                      alt={cardData.cardType}
                      className="w-full max-w-md rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex flex-col justify-between p-6 text-white">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{cardData.cardNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold">{cardData.cardholderName}</p>
                        <div className="flex justify-between text-sm">
                          <span>Issued: {new Date(cardData.issuedDate).toLocaleDateString()}</span>
                          <span>Expires: {new Date(cardData.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Card Information</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Card Number:</span>
                        <span className="font-semibold text-gray-900">{cardData.cardNumber}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Cardholder Name:</span>
                        <span className="font-semibold text-gray-900">{cardData.cardholderName}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Card Type:</span>
                        <span className="font-semibold text-gray-900">{cardData.cardType}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Issued Date:</span>
                        <span className="font-semibold text-gray-900">{new Date(cardData.issuedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Expiry Date:</span>
                        <span className="font-semibold text-gray-900">{new Date(cardData.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          cardData.status.toLowerCase() === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {cardData.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setCardData(null);
                        setCardNumber('');
                      }}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Search Another Card
                    </button>
                    <button
                      onClick={handleClose}
                      className="flex-1 px-4 py-2 bg-uae-green text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackCardModal;
