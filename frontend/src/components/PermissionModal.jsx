import React from 'react';
import { useModal } from '../context/ModalContext';
import { faBolt, faInfoCircle, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PermissionModal = ({ onEnableLocation }) => {
    const { isModalOpen, closeModal } = useModal();
    if (!isModalOpen) return null;
  
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg overflow-hidden p-8">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faLocationDot} className="text-4xl text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Enable Location Services</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Please enable location services to help us provide you with accurate delivery options and better service.
            </p>
            <div className="space-y-4">
              <button
                className="w-full group relative overflow-hidden px-6 py-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                onClick={() => {
                  onEnableLocation();
                  closeModal();
                }}
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-300 ease-out skew-x-12">
                  <div className="flex items-center justify-center space-x-2">
                    <FontAwesomeIcon icon={faBolt} className="text-lg" />
                    <p>Enable Location</p>
                  </div>
                </div>
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="text-slate-500 hover:text-slate-600 text-sm font-medium flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  Why do we need your location?
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-700" />
                <p className="text-sm text-blue-700">
                  Your location helps us show nearby delivery options and provide accurate delivery time estimates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
