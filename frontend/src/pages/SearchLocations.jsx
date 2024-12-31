import React from 'react';
import Sidebar from '../components/Sidebar';
import LocationPicker from '../components/LocationPicker';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const SearchLocations = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('token');
      if(!token)
      {
        navigate('auth/login');
      }
    })
    
  return (
    <div className="flex h-screen w-full">
  
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1">
        <LocationPicker />
      </div>
    </div>
  );
};

export default SearchLocations;
