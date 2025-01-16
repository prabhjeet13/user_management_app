import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { set_want_to_edit, setEditData } from '../slices/EditSlice';
import { setUsers } from '../slices/ProfileSlice';
import axios from 'axios';
const AllUsers = () => {
    const {users} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const editHandler = (data) => {
        dispatch(set_want_to_edit(true));
        dispatch(setEditData(data));
        localStorage.setItem('editdata',JSON.stringify(data));
        navigate('/edit-user');
    }

    const deleteHandler = async (data) => 
    {
        const toastid = toast.loading('wait .... ');
        try {
          const response = await axios.delete(`https://user-management-app-06rt.onrender.com/api/v1/users/deleteuser/${data.id}`);
          if(!response.data.success)
          {
             throw new Error('not able to do');
          }else {
            dispatch(setUsers(response.data.users));
            localStorage.setItem('users',JSON.stringify(response.data.users));
            toast.success('User added successfully!');
            navigate('/');
          }
        }catch(error)
        {
          toast.error('server down try again later');
        }
        toast.dismiss(toastid);
    }
    if (!users) {
        return (
          <div className="flex items-center justify-center text-white w-[82%] min-h-screen p-4 m-4 font-bold text-3xl">
            No Users Found
          </div>
        );
    }  
  return (
    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-center mt-1 p-2 gap-5'>
          <table className='border-2 border-black m-10'>
                <div className='flex gap-16 p-5 bg-lime-200'>
                    <th>username</th>    
                    <th>age</th>    
                    <th>edit</th>    
                    <th>delete</th>    
                </div>
                <div className='flex flex-col gap-4'>
                {
                    users && users.map((user,index) => {
                        return (
                            <tr className=' bg-blue-500 p-2 m-2 rounded-md'>
                                <div className='flex gap-16 items-center'>
                                        <td> {user.username} </td>
                                        <td> {user.age} </td>
                                        <td><CiEdit onClick = {() => editHandler(user)} className='text-lg cursor-pointer'/></td>
                                        <td><MdDeleteOutline onClick = {() => deleteHandler(user)}  className='text-lg cursor-pointer'/></td>
                                </div>
                            </tr>
                        )
                    })
                } 
                </div>
          </table>     
    </div>
  )
}

export default AllUsers