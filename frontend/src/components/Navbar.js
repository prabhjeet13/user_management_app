import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[90%] max-w-[1260px] mx-auto flex items-center justify-evenly bg-gradient-to-r from-blue-900 to-blue-500 border-2 border-red-500 p-2'>
            <p onClick = {() => navigate('/')} className='text-white bg-black p-1 rounded-md transition-all duration-200 hover:scale-90 cursor-pointer'>User Management</p>
            <p onClick = {() => navigate('/all-user')} className='text-white bg-black p-1 rounded-md transition-all duration-200 hover:scale-90 cursor-pointer'>All Users</p>
            <p onClick = {() => navigate('/add-user')} className='text-white bg-black p-1 rounded-md transition-all duration-200 hover:scale-90 cursor-pointer'>Add New User</p>
    </div>
  )
}

export default Navbar