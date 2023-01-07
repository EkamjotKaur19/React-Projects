import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

import registerService from '../services/register'

export default function Register({handleReg2, toggleReg}) {
  const navigate = useNavigate;
  const [errorMessage, setErrorMessage] = useState(null)
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
          <input
            type="text"
            value={username}
            name="Username"
            className="log"
            onChange={({ target }) => setUsername(target.value)}/>
          <input
            type="password"
            value={password}
            name="Password"
            className="log"
            onChange={({ target }) => setPassword(target.value)}/>
          <button className="reg-btn" type="submit">register</button>
          <h3 className={user? 'show' : 'hide'} >Registered Successfully</h3>
          
      </form>
      <Link to='/React-Projects/' ><button className='reg-btn' onClick={toggleReg}>
          Close
        </button></Link>
      </div>
      </div>
  )
}
