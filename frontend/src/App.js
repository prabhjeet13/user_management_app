import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Routes , Route } from 'react-router-dom';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import AllUsers from './pages/AllUsers';

function App() {
  return (
    <div className="mx-auto min-h-screen bg-gradient-to-r from-gray-300 to-gray-500 border-2 border-black ">
        <Navbar/>
        <Routes>
            <Route path = '/' element = {<Home/>} />
            <Route path = '/add-user' element = {<AddUser/>} />
            <Route path = '/edit-user' element = {<EditUser/>} />
            <Route path = '/all-user' element = {<AllUsers/>} />
        </Routes>
    </div>
  );
}

export default App;
