import './App.css';

import CreateNote from './Components/CreateNote';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './Components/Header';
import React, {useState, useEffect} from 'react';
import Register from './Components/Register'
import Signup from './Components/Signup';
import Footer from './Components/Footer';



function App() {
  
  const[dark, setDark]=useState(false);
  const [reg, setReg]=useState(false);
  const [logged, setLogged]=useState(false);

  

  const toggleReg = () => {
    console.log(reg);
    setReg(!reg);
    console.log(reg)
  }

  
  
  
  useEffect(() => {
    if(dark){
      document.body.classList.add('dark');
      

    }
    else{
      document.body.classList.remove('dark');
    }
  }, [dark]);

  return (
    <>
      <Router>
        <div className={!dark?"App": "App-dark"}>
        <Header dark={dark}/>
        <button type="button" className={dark? "btn btn-light pos mode":"btn btn-dark pos mode"} data-bs-toggle="button" onClick={() => setDark(!dark)} >{dark?'Light Mode' : 'Dark Mode'}</button>
        
        <Routes>
          <Route path='/React-Projects/' exact element={<CreateNote dark={dark} logged={logged} setLogged={setLogged} />} />
          <Route path='/register' exact element={ <Register toggleReg={toggleReg}  />} />
          <Route path='/signup' exact element={ <Signup logged={logged} setLogged={setLogged} />  } />
        </Routes>
        <Footer />
        
        
      
        
        
      </div>
      </Router>
    </>
    
  );
}

export default App;
