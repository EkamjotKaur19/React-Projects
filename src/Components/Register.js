import React, {useState} from 'react'

import registerService from '../services/register'

export default function Register({reg, handleClose}) {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [name, setName] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(false)

  const setReg = ()=> {
    reg=!reg;
  }


  const handleReg = async (event) => {
    event.preventDefault()
    console.log('reg in with', username, password);
    try {
        const useri = registerService.register({
          name, username, password,
        })
        setUser(!user)
        console.log(useri)
        
      } catch (exception) {
        console.log('error');
      }
  }

  
  return (
    <div className="reg-box">
        <div className="reg-box2">

        

      <h2>Register</h2>
      <form onSubmit={handleReg}>
        <div>
          Name
            <input
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">register</button>
        <button className='pop-close' onClick={handleClose}>
                Close
            </button>
      </form>
      </div>
      </div>
  )
}
