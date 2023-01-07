import React, {useState, useEffect} from 'react';
import Note from './Note';
import noteService from '../services/notes'

import userService from '../services/users'
import loginService from '../services/login'
import Register from './Register';
import Login from './Login';
import { Link } from 'react-router-dom';

export default function CreateNote({dark, reg}) {
  const [notes, setNotes] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const [color, setColor] = useState('white');
  const [searchTerm, setSearchTerm]=useState('');
  
  const [file, setFile] = useState('');
  const [pin, setPin] = useState(false);
  const [showpin, setShowPin] = useState(false);
  const [icons, setIcons] = useState(true);
  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(false)
  const [note, setNote] = useState({
    title:"",
    content:"",
    colors:'white',
    searched:false,
    file:"",
    pin:false
  });

  useEffect(() => {
    console.log('effect')
    
  }, [])

  

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);
    setLogin(!login);
    console.log(login)
    try {
        const user = await loginService.login({
          username, password,
        })
        noteService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('');
        console.log(user.id)
        userService.getOne(user.id).then(noteList => {
          for(let i=0; i<noteList.length; i++){
           setNotes((prevValue)=>{
            if(prevValue){
              return [...prevValue, noteList[i]];
            }
            else{
              return [noteList[i]]
            }
           })
           console.log(notes)
          }
        setLogged(!login);
      })
      } catch (exception) {
        alert('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  }

  

  const handleSearchChange = () => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }

  const addNote = (newNote) =>{ 
    note.colors=color
    note.file=file
    note.pin=pin
    {console.log(pin)}
    
    setColor('white');
    noteService.create(newNote).then(response => setNotes((prevValue) => {
      if(prevValue){
        return [...prevValue, newNote];
      }
      else{
        return [newNote]
      }
    }))
    
  }
  
  function editNote(note, title, content, pin) {
    note.title = title;
    note.content = content;  
    note.pin=pin;  
    noteService.update(note.id, note).then(response => {
      setNotes([...notes]);
    })
  }


  const deleteNotes =(id, note) =>{
    noteService.delNote(id, note).then( response => {
      setNotes((preValue) => {
        return [...preValue.filter((note, index) => index !== id)];
      });
    })
  }

  

  const handleChange = (e) => {
    const {name, value } = e.target;
    

    setNote((prevVal) => {
      return {
        ...prevVal,
        [name]:value,
      
      };
    });

    
  }

  const handleUpload = (e) => {

      console.log(e.target.files[0]);
      note.file=URL.createObjectURL(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]))
    
  }

  const handleBlue = () => {
    setColor('rgb(204, 248, 233)');
  }

  const handleGreen = () => {
    setColor('rgb(246, 226, 248)');
  }

  const handleYellow = () => {
    setColor('rgb(240, 226, 150)');
  }

  const handleFourth = () => {
    setColor('rgb(247, 184, 182)');
  }

  const handleFifth = () => {
    setColor('rgb(185, 245, 170)');
  }

  const handleSixth = () => {
    setColor('rgb(256,256,256)');
  }

  const handleExpanded = () =>  {
    setExpanded(true);
  }

  const  submitButton = (event) => {
    console.log('ok')
    addNote(note);
    setNote({
      title: "",
      content: "",
      file:note.file,
      pin:note.pin
    });
    setFile('');
    setPin(false);
    
    event.preventDefault();
  }

  const searchNote = (id) => {
    console.log(id);
    noteService.getOne(id, note).then(response => {
      setNotes(notes.filter((note)=>note.content.toLowerCase().includes(searchTerm.toLowerCase())));
    })
    
  }

  const handlePin = () => {
    note.pin=true;
    setPin(true);
  }

  
  

  return (
    <>
      {!logged && 
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
          <Link to='/register' ><button className="log-text" > New user? Register First</button></Link> 
          </form>
      </div>
    </div>
       }
    
    
    {logged &&   <div className={dark?"dark":"white"}>
      <div className="search-box">
        <button className={!dark?"search-btn": 'search-btn dark'} onClick={(id)=>{searchNote(id)}} ><i className="fa-solid fa-magnifying-glass"></i></button>
        <input className={!dark?'search-bar':'search-bar-dark'} type='text' onChange={(event) => setSearchTerm(event.target.value)} />
        <button className={!dark?"search-cross": 'search-cross-dark'} onClick={handleSearchChange} ><i className="fa-solid fa-xmark"></i></button>
      </div>

      


      
    <form className='create-form' style={{backgroundColor:color}} >
        { isExpanded && 
        (<input  value={note.title} type='text' placeholder='Take a note' name='title' onChange={handleChange}  style={{backgroundColor:color} } />) }
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
            style={{backgroundColor:color}} >
          </textarea>

          
          
        </p>
        {isExpanded && <div className="bottom">
          <div className="colors">
            <input  type="file" className='col image ' onChange={handleUpload}  /> 
            <button type="button" className="col col-1 btn " onClick={handleBlue} ></button>
            <button type="button" className="col col-2 btn " onClick={handleGreen}></button>
            <button type="button" className="col col-3 btn " onClick={handleYellow}></button>
            <button type="button" className="col col-4 btn " onClick={handleFourth} ></button>
            <button type="button" className="col col-5 btn " onClick={handleFifth}></button>
            <button type="button" className="col col-6 btn " onClick={handleSixth}></button>
            
          </div>
          <button className='close btns' onClick={submitButton}>
            Close
          </button>

          <button type='button' className='pin-btn btns' onClick={handlePin}>
            Pin
          </button>

          
              

          
        </div>}
        
      </form>
      
       {notes ? notes.map((note,index) => (
          <Note 
            key={index}
            onDelete={deleteNotes}
            id={index}
            setNote={setNote}
            setNotes={setNotes}
            notes={notes}
            editNote={editNote}
            note={note}
            color={note.colors}
            file={note.file!=='' ? note.file : ' ' }
            pin={note.pin}
            showpin={showpin}
            icons={icons}
          />
      )) : null}
    </div> }
    </>
  )
}
