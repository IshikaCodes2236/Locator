import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHome, faBuilding, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AddressForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { location } = state || {};

  
    const [houseNumber, setHouseNumber] = useState('');
    const [area, setArea] = useState('');
    const [addressType, setAddressType] = useState('Home');

  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!houseNumber || !area || !location) {
            alert('Please fill all required fields');
            return;
        }
    
        const addressData = {
            location,
            houseNumber,
            area,
            addressType,
        };
    
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not authorized');
            navigate('/login'); // redirect to login if no token
            return;
        }
    
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/location/save`,
                addressData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Location saved successfully!');
            navigate('/location');
        } catch (error) {
            console.error('Error saving location:', error.response || error);
            alert('Failed to save location.');
        }
    };
    
    return (
        <div className="bg-slate-100">
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center space-x-4">
                            <button
                                className="p-2 bg-slate-100 border-blue-400 hover:bg-slate-100 rounded-lg transition-all"
                                onClick={() => navigate('/location')}
                            >
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} className="w-6 h-6 text-slate-600" />
                            </button>
                            <h2 className="text-xl font-bold text-slate-800">Add Delivery Address</h2>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="mb-8">
                            <p className="text-slate-600 mb-4">Selected Location:</p>
                            <div className="flex items-start space-x-3">
                                <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5 text-blue-500 mt-1" />
                                <p className="text-slate-800 font-medium">{location}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* House/Flat/Block Number */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    House/Flat/Block No. *
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-100 border-blue-400 px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="Enter house/flat/block number"
                                    value={houseNumber}
                                    onChange={(e) => setHouseNumber(e.target.value)}
                                />
                            </div>

                            {/* Apartment/Road/Area */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Apartment/Road/Area *
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-100 border-blue-400 px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="Enter apartment/road/area"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                />
                            </div>

                            {/* Address Type */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-4">
                                    Save address as *
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    <button
                                        type="button"
                                        className="group p-4 rounded-xl border-2 bg-slate-100 border-blue-400 hover:bg-blue-100 transition-all"
                                        onClick={() => setAddressType('Home')}
                                    >
                                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-all">
                                            <FontAwesomeIcon className="w-6 h-6 text-blue-500" icon={faHome} />
                                        </div>
                                        <p className="text-sm font-medium text-blue-500 text-center">Home</p>
                                    </button>

                                    <button
                                        type="button"
                                        className="group p-4 rounded-xl bg-slate-100 border-blue-400 border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                                        onClick={() => setAddressType('Office')}
                                    >
                                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-all">
                                            <FontAwesomeIcon className="w-6 h-6 text-slate-500 group-hover:text-blue-500" icon={faBuilding} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-600 group-hover:text-blue-500 text-center">Office</p>
                                    </button>

                                    <button
                                        type="button"
                                        className="group p-4 rounded-xl bg-slate-100 border-blue-400 border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                                        onClick={() => setAddressType('Other')}
                                    >
                                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-all">
                                            <FontAwesomeIcon className="w-6 h-6 text-slate-500 group-hover:text-blue-500" icon={faUsers} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-600 group-hover:text-blue-500 text-center">Other</p>
                                    </button>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                            >
                                Save Address
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
