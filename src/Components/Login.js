import React  from 'react'

export default function Login({handleLogin, setUsername, setPassword, username, password}) {

  return (
    <>
    <div className="log-cont">
      <div className="log-wrapper">
          <h1 className="log-title">SIGN IN</h1>
          <form className="log" onSubmit={handleLogin} >
          <input  type="text"
              value={username}
              name="Username"
              className="log"
              onChange={({ target }) => setUsername(target.value)}/>
          <input  type="password"
              value={password}
              name="Password"
              className="log"
              onChange={({ target }) => setPassword(target.value)}/>
          <button className="log-btn" type="submit">LOGIN</button>
          </form>
      </div>
    </div>
    </>
  )
}
