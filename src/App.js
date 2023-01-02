import './App.css';
import CreateNote from './Components/CreateNote';
import Header from './Components/Header';
import Image from './Components/Image';
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CanvasP from './Components/CanvasP';

function App() {
  
  const[dark, setDark]=useState(false);
  useEffect(() => {
    if(dark){
      document.body.classList.add('dark');
      

    }
    else{
      document.body.classList.remove('dark');
    }
  }, [dark]);

  return (
    <Router>
      
      <div className={!dark?"App": "App-dark"}>
      
        <Header dark={dark}/>
        <button type="button" className={dark? "btn btn-light pos mode":"btn btn-dark pos mode"} data-bs-toggle="button" onClick={() => setDark(!dark)} >{dark?'Light Mode' : 'Dark Mode'}</button>
        <CreateNote dark={dark}/>
        <Routes>
          <Route path='/draw' element={<CanvasP />} >
          </Route>
        </Routes>
      
        
        
      </div>
    
    </Router>
  );
}

export default App;
