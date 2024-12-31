import { faMagnifyingGlass, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavedAddress = () => {
    const [addresses, setAddresses] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const navigate = useNavigate();

  
    useEffect(() => {
        const fetchAddresses = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                alert('You are not authorized. Please login.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/location/savedAddress`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                
                setAddresses(response.data);  // Assuming the response has the addresses in the data field
            } catch (error) {
                console.error('Error fetching addresses:', error);
                alert('Failed to load saved addresses.');
            }
        };

        fetchAddresses();
    }, [navigate]);

    const handleDeleteAddress = async (addressId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not authorized.');
            navigate('/login');
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/location/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Remove deleted address from the state
            setAddresses((prevAddresses) => prevAddresses.filter((address) => address._id !== addressId));
            alert('Address deleted successfully.');
        } catch (error) {
            console.error('Error deleting address:', error);
            alert('Failed to delete address.');
        }
    };

    // Filter addresses based on search query
    const filteredAddresses = addresses.filter((address) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            address.address.street.toLowerCase().includes(searchLower) ||
            address.address.state.toLowerCase().includes(searchLower) ||
            address.address.country.toLowerCase().includes(searchLower) ||
            address.addressType.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <div className="text-xl font-bold text-slate-800">Saved Addresses</div>
                                <button
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2"
                                    onClick={() => navigate('/location')}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    <p>Add New Address</p>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="relative mb-6 flex justify-center items-center">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-2" />
                                <input
                                    type="text"
                                    placeholder="Search saved addresses..."
                                    value={searchQuery}  // Bind the search query state to the input
                                    onChange={(e) => setSearchQuery(e.target.value)}  // Update the search query state
                                    className="w-full bg-slate-200 pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-4">
                                {filteredAddresses.length > 0 ? (
                                    filteredAddresses.map((address) => (
                                        <div
                                            key={address._id}
                                            className="group p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                                    <FontAwesomeIcon icon={faPen} className="text-blue-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-semibold text-slate-800">{address.addressType}</h3>
                                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-2 bg-slate-200 hover:bg-blue-100 hover:border-blue-400 rounded-lg transition-all text-blue-400">
                                                                <FontAwesomeIcon icon={faPen} />
                                                            </button>
                                                            <button
                                                                className="p-2 bg-slate-200 hover:bg-red-100 rounded-lg hover:border-red-400 transition-all text-red-700"
                                                                onClick={() => handleDeleteAddress(address._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="text-slate-600 text-sm mb-1">{address.address.street}</p>
                                                    <p className="text-slate-600 text-sm">
                                                        {address.address.state} {address.address.country}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-slate-600">No saved addresses found.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedAddress;
