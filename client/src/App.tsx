import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Landing from './pages/landing/Landing';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Landing />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/login' element={<Login />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App