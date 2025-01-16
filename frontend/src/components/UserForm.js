import React, { useState ,useEffect} from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { set_want_to_edit, setEditData } from '../slices/EditSlice';
import { setUsers } from '../slices/ProfileSlice';
const UserForm = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {want_to_edit,editData} = useSelector((state) => state.edit);
  const {users} = useSelector((state) => state.profile);
  const {handleSubmit,setValue,register} = useForm();

  const [hobby, setHobby] = useState('');
  const [hobbies,sethobbies] = useState([]);

  useEffect(() => {
    if (editData && want_to_edit) {
      setValue('username', editData.username);
      setValue('age', editData.age);
      sethobbies(editData.hobbies);
      
    }
  }, [editData]);


  const addHobbyHandler = () => {
    if (hobby === '') {
        toast.error('Hobby cannot be empty');
        return;
    }
    sethobbies((prev) => [...prev,hobby]);
    setHobby(''); // Clear the hobby input
  };

  const removeHobbyHandler = (hob) => {
      if(hob)
      {
         let filterhobbies = hobbies.filter((h) => h !== hob);
         sethobbies(filterhobbies);
      }
  };

  const submitHandler = async (data) => {
  
    if (!data.username || !data.age || hobbies.length === 0) {
      toast.error('Please fill in all the details');
      return;
    }

    if (data.age <= 0) {
      toast.error('Age should be positive');
      return;
    }

    if (data.username.length !== 6) {
      toast.error('Username should be of length 6');
      return;
    }

    if(editData && want_to_edit)
    {
         const formData = {
             ...data,
             id : editData.id,
             hobbies,
         }

         // database calling
         const toastid = toast.loading('wait .... ');
         try {
           const response = await axios.post(`https://user-management-app-06rt.onrender.com/api/v1/users/edituser/${formData.id}`,formData);
           if(!response.data.success)
           {
              throw new Error('not able to do');
           }else {
             dispatch(setUsers(response.data.users));
             localStorage.setItem('users',JSON.stringify(response.data.users));
             toast.success('User editing successfully!');
             navigate('/');
           }
         }catch(error)
         {
           toast.error('server down try again later');
         }
         toast.dismiss(toastid);

         dispatch(set_want_to_edit(false));
         dispatch(setEditData(null));
         localStorage.removeItem('editData');
         return;
    }

    const formData = {
      ...data,
      hobbies,
    }
    
    const toastid = toast.loading('wait .... ');
    try {
      const response = await axios.post('https://user-management-app-06rt.onrender.com/api/v1/users/adduser',formData);
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
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="border-2 bg-white flex flex-col border-black p-10 m-10 gap-4 rounded-md"
    >
      <div className="flex flex-col gap-2 ">
        <label htmlFor="username" className='font-mono font-semibold'>Username</label>
        <input className="p-2 rounded-md bg-gray-500 text-white" placeholder="username" type="text" id="username" name="username"  required 
         {...register('username')} 
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="age" className='font-mono font-semibold'>Age</label>
        <input className="p-2 rounded-md bg-gray-500 text-white" placeholder="age" type="number" id="age" name="age"  required 
          {...register('age')}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="hobby" className='font-mono font-semibold'>Hobby</label>
        <input
          onChange={(e) => setHobby(e.target.value)} className="p-2 rounded-md bg-gray-500 text-white" placeholder="hobby" type="text" id="hobby" name="hobby" value={hobby}
        />
        <div
          onClick={addHobbyHandler}
          className="p-2 bg-yellow-300 transition-all duration-200 hover:scale-90 cursor-pointer w-fit rounded-md font-semibold"
        >
          <span>Add Hobby</span>
        </div>
        <div className='flex flex-col gap-2'>
          {hobbies.map((hob, index) => (
            <div
              key={index}
              className="flex items-center gap-2 w-fit justify-around text-black border-2 rounded-md border-black px-3"
            >
              <p>{hob}</p>
              <p
                onClick={() => removeHobbyHandler(hob)}
                className="cursor-pointer text-red-500"
              >
                x
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="p-2 rounded-full bg-green-500 text-black transition-all duration-200 hover:scale-90 font-semibold"
      >
        {want_to_edit ? "Edit User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
