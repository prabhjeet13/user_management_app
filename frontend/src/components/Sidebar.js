import React ,{useState} from 'react'
import { IoSearch } from "react-icons/io5";
import {hobbies_collection} from '../utils/hobbies';
const Sidebar = () => {
  const [hob,sethob] = useState('');
  const [hobbies_array,set_hobbies_array] = useState(hobbies_collection);
  const SearchHandler = (e) => {
        
        let searchItem = e.target.value;
        console.log(searchItem);
        sethob(searchItem);

        if (searchItem === '') {
            // Reset 
            set_hobbies_array(hobbies_collection);
        }else {
            const filter_hobbies = hobbies_collection.filter((hobby) => (hobby.toLowerCase()).includes(searchItem.toLowerCase()));
            set_hobbies_array(filter_hobbies);
        } 

  }

  const dragHandler = (e,hobby) => {
        e.dataTransfer.setData('hobby',hobby);
  }

  return (
    <div className='w-[18%] min-h-screen border-2 border-black bg-blue-600'>
        
        <div className='m-1 p-1 relative rounded-md'>
            <IoSearch className='text-gray-500 text-sm absolute right-2 top-3'/>
            <input onChange = {(e) => SearchHandler(e)} value = {hob} placeholder = 'hobbies' type = 'text' id = 'search' name = 'search' className='text-sm p-1 w-full rounded-md transition-all duration-200 hover:scale-90 cursor-pointer'/>
        </div>    

        <div className='grid grid-cols-2 gap-1 p-1'>
            {
                hobbies_array.map((hob,index) => {
                    return (
                        <p key={index} 
                        className='p-1 border-2 border-blue-400 text-white rounded-md cursor-pointer'
                        draggable
                        onDragStart={(e) => dragHandler(e,hob)}>
                               {hob} 
                        </p>
                    )
                })
            }
        </div>        
    </div>
  )
}

export default Sidebar