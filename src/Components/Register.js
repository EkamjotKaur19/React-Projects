import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';

import registerService from '../services/register'

export default function Register({handleReg2, toggleReg}) {
  const responseMessage = (response) => {
      console.log(response);
  };
  const errorMsg = (error) => {
      console.log(error);
  };
  const navigate = useNavigate;
  const [username, setUsername] = useState('') 
  const [name, setName] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(false)

  


  const handleReg = async (event) => {
    event.preventDefault()
    console.log('reg in with', username, password);
    try {
        const useri = registerService.register({
          name, username, password,
        })
        console.log(useri);
        alert('CLICK ON CLOSE TO LOGIN')
        
      } catch (exception) {
        alert('error');
        console.log('error');
      }
  }

  
  return (
    <div className="reg-cont">
        <div className="reg-wrapper">
          <h2 className="log-title">Register</h2>
          <form className="log" onSubmit={handleReg}>
          <input
            type="text"
            value={name}
            name="name"
            className="log"
            onChange={({ target }) => setName(target.value)}/>
          <button className="reg-btn" type="submit">register</button>
          <h3 className={user? 'show' : 'hide'} >Registered Successfully</h3>
          
      </form>
      <Link to='/React-Projects/' ><button className='reg-btn' onClick={toggleReg}>
          Close
        </button></Link>
        <GoogleLogin onSuccess={responseMessage} onError={errorMsg} />
      </div>
      </div>
  )
}
