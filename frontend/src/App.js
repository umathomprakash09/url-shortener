//import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import { AuthorizedUser } from './middleware/auth';



function App() {

  const [isLoggedIn,setIsLoggedIn]= useState(false)
 
  return (
      <BrowserRouter>
        
        <div className="App">
          <Routes>
          <Route path="/" element= { <LoginSignup />} />
          <Route path="/home" element= { <AuthorizedUser>  <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></AuthorizedUser>} />
          </Routes>
        </div>
        
      </BrowserRouter>
     
  );
}

export default App;
