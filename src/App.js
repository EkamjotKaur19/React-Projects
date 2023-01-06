import './App.css';

import CreateNote from './Components/CreateNote';
import Header from './Components/Header';
import React, {useState, useEffect} from 'react';

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
      
      <div className={!dark?"App": "App-dark"}>
      
        <Header dark={dark}/>
        <button type="button" className={dark? "btn btn-light pos mode":"btn btn-dark pos mode"} data-bs-toggle="button" onClick={() => setDark(!dark)} >{dark?'Light Mode' : 'Dark Mode'}</button>
        <CreateNote dark={dark}/>
      
        
        
      </div>
    
  );
}

export default App;
