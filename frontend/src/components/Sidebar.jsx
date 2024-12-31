import { faBookmark, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'; 
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        window.location.reload();
    }
  return (
    <div className="fixed h-screen w-64 bg-slate-50 border-r border-slate-200 hidden lg:block">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="flex items-center">
            <div className="bg-[#3B82F6] px-3 py-1 text-white font-bold text-lg rounded-lg transition-opacity duration-300 opacity-100">
              L
            </div>
            <span className="ml-3 text-xl font-semibold text-slate-800">Locator</span>
          </div>
        </div>
        <div className="space-y-2">
          <Link
            to={'/location'}
            className="flex items-center px-4 py-3 text-md font-medium text-slate-700 rounded-lg bg-slate-100"
          >
            <FontAwesomeIcon icon={faLocationPin} className="mr-3" />
            <span>Location</span>
          </Link>
          <Link
            to={'/saved'}
            className="flex items-center px-4 py-3 text-md font-medium text-slate-700 rounded-lg bg-slate-100"
          >
            <FontAwesomeIcon icon={faBookmark} className="mr-3" />
            <span>Saved</span>
          </Link>
          <Link
            to={'/profile'}
            className="flex items-center px-4 py-3 text-md font-medium text-slate-700 rounded-lg bg-slate-100"
          >
            <FontAwesomeIcon icon={faUserCircle} className="mr-3" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
      <button className='absolute bottom-0 left-0' onClick={()=>{handleLogout}}>Logout</button>
    </div>
  );
};

export default Sidebar;
