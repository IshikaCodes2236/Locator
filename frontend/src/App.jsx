import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchLocations from './pages/SearchLocations'
import PermissionModal from './components/PermissionModal'
import { useModal } from './context/ModalContext';

function App() {
  const { openModal } = useModal();
  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location:', position.coords);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          openModal();
        }
        else{
          console.error('Geolocation Error:', error);
        }
      }
    );
  }, [openModal]);
  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location:', position.coords);
      },
      (error) => {
        console.error('Error enabling location:', error);
      }
    );
  };

  return (
    <>
      <div className='h4 text-red-400'>
        <PermissionModal onEnableLocation={handleEnableLocation}></PermissionModal>
        <SearchLocations/>
      </div>
    </>
  )
}

export default App
