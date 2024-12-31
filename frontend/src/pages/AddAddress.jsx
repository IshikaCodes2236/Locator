import React from 'react'
import Sidebar from '../components/Sidebar'
import AddressForm from '../components/AddressForm'

const AddAddress = () => {
  return (
    <div className="flex h-screen w-full">
  
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1">
        <AddAddress />
      </div>
    </div>
  )
}

export default AddAddress