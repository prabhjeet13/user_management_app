import React from 'react'
import UserForm from '../components/UserForm';
const AddUser = () => {
  return (
    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-center'>
        <p className='text-white underline text-xl mt-2 uppercase font-mono font-bold'> Add User</p>
        <div>
                <UserForm />
        </div>
    </div>
  )
}

export default AddUser