import React from 'react';
import Sidebar from '../components/Sidebar';
import LocationPicker from '../components/LocationPicker';

const SearchLocations = () => {
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
