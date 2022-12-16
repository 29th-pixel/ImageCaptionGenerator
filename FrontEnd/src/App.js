import './App.css';

import {About} from './components/About';
import {Contact} from './components/Contact';
import {Home} from "./components/Home";
import {Navbar} from './components/Navbar';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path = "*" element = {<Navigate to = "/" />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
