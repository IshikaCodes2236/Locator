import React from 'react'
import SavedAddress from '../components/SavedAddress'
import Sidebar from '../components/Sidebar'
const SavedAddress = () => {
  return (
 
       <div className="flex h-screen w-full">
    
    <div className="w-64">
        <Sidebar />
    </div>

    <div className="flex-1">
        <SavedAddress />
    </div>
    </div>
    
  )
}

export default SavedAddress