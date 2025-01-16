import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
const Home = () => {

  const [users,setusers] = useState([]);


  return (
     <div className='flex gap-10 w-11/12 max-w-[1260px] mx-auto'>
            <Sidebar/>
            <MainContent/>
     </div>         
  )
}

export default Home