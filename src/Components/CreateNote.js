import React, {useState, useEffect} from 'react';
import Note from './Note';
import noteService from '../services/notes'
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
}
from 'mdb-react-ui-kit';

import userService from '../services/users'
import loginService from '../services/login'
import { useNavigate, Link } from 'react-router-dom';

export default function CreateNote({dark, reg}) {
  const [notes, setNotes] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const [color, setColor] = useState('white');
  const [searchTerm, setSearchTerm]=useState('');
  const [file, setFile] = useState('');
  const [pin, setPin] = useState(false);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(false)
  const [cook, setCook]=useState(false);
  const navigate=useNavigate();
  const [note, setNote] = useState({
    title:"",
    content:"",
    colors:'white',
    searched:false,
    file:"",
    pin:false
  });


  const handlePin= (note) =>{
    setPin(true)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      console.log('ekam')
      const user = JSON.parse(loggedUserJSON)
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
        }
      setLogged(!logged);
      
    })
      
    }
    
  }, [])

  const handleLogin = async (event) => {
    
    event.preventDefault()
    console.log('logging in with', username, password);
    setLogged(!logged);
    
    try {
          const user = await loginService.login({
          username, password,


        })
        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        )
        
        noteService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('');
        console.log(user.id)
        if(cook==false){
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
          }
        setLogged(!logged);
        
      })}
      } catch (exception) {
        alert('Wrong credentials')
        setTimeout(() => {
        }, 5000)
      }
  }

  

  

  const addNote = (newNote) =>{ 
    note.colors=color
    note.file=file
    note.pin=pin
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

  const handleSearchChange = (id) => {
    setNotes(null);
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
  })
  }

  const handleLogout = () =>{
    window.localStorage.removeItem('loggedNoteappUser')
    setLogged(!logged);
    navigate('/React-Projects')
    setNotes(null);
  }

  return (
    <>
      {!logged && 
      <form onSubmit={handleLogin} > 
      <MDBContainer fluid className="p-3  my-2">
  
        <MDBRow >
  
          <MDBCol col='6' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt=''/>
          </MDBCol>
  
          <MDBCol col='6' md='5'>
          <p className="text-center h2 fw-bold mx-1 mx-md-3 mt-2 mb-2">Sign In</p>
  
  
            <MDBInput wrapperClass='mb-1' label='Username' id='formControlLg' type='text' size="lg" value={username} onChange={({ target }) => setUsername(target.value)}/>
            <MDBInput wrapperClass='mb-1' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={({ target }) => setPassword(target.value)}/>
  
  
            {/* <div className="d-flex justify-content-between mx-3 mb-2">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>*/}
  
            <button className="mb-2 w-100 log-btn" size="lg">Sign in</button>
  
            <Link to='/signup' >
            <button className="mb-4 w-100 log-btn" size="lg" >
              New User? Register First
            </button>
            </Link>
          </MDBCol>
  
        </MDBRow>
  
      </MDBContainer>
      </form>
       }
    
    
    {logged &&   <div className={dark?"dark":"white"}>
      <div className="search-box">
        <button className={!dark?"search-btn": 'search-btn dark'} onClick={(id)=>{searchNote(id)}} ><i className="fa-solid fa-magnifying-glass"></i></button>
        <input className={!dark?'search-bar':'search-bar-dark'} type='text' onChange={(event) => setSearchTerm(event.target.value)} />
        <button className={!dark?"search-cross": 'search-cross-dark'} onClick={(id) => { handleSearchChange(id)}} ><i className="fa-solid fa-xmark"></i></button>
      </div>

      


      <button onClick={handleLogout} className=" logout-btn" size="lg" >
        LOGOUT
      </button>
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
          <input  type="file" className='image ' onChange={handleUpload}  /> 
          <div className="colors">
            <button type="button" className="col col-1 btn " onClick={handleBlue} ></button>
            <button type="button" className="col col-2 btn " onClick={handleGreen}></button>
            <button type="button" className="col col-3 btn " onClick={handleYellow}></button>
            <button type="button" className="col col-4 btn " onClick={handleFourth} ></button>
            <button type="button" className="col col-5 btn " onClick={handleFifth}></button>
            <button type="button" className="col col-6 btn " onClick={handleSixth}></button>
            
          </div>
          <div className="btnss">
            

            <button type='button' className='pin-btn btns' onClick={handlePin} >
              Pin
            </button>

            <button className='pin-btn btns' onClick={submitButton}>
              Close
            </button>
          </div>
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
            icons='true'
          />
      )) : null}
    </div> }
    </>
  )
}