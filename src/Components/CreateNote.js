import React, {useState, useEffect} from 'react';
import Note from './Note';
import 'react-canvas-paint/dist/index.css'
import axios from 'axios';
import noteService from '../services/notes'

export default function CreateNote({dark}) {
  const [notes, setNotes] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const [color, setColor] = useState('white');
  const [searchTerm, setSearchTerm]=useState('');
  const [file, setFile] = useState('');
  const [pin, setPin] = useState(false);
  const [showpin, setShowPin] = useState(false);
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
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')



  const addNote = (newNote) =>{
    note.colors=color
    note.file=file
    note.pin=pin
    
    setColor('white');
    noteService.create(newNote).then(response => setNotes((prevValue) => {
      return [...prevValue, newNote];
    }))
    
  }

  

  
  function editNote(note, title, content) {
    note.title = title;
    note.content = content;    
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

  const changeColors = (notes) => {
    notes.map((note) => {
      return note.colors='yellow'
    })
  }



  const searchNote = () => {
    changeColors(notes.filter((note)=>note.content.toLowerCase().includes(searchTerm.toLowerCase())));
  }

  const handlePin = () => {
    note.pin=true;
    setPin(true);
  }

  const handlePinned = () => {
    setShowPin(!showpin);
  }

  

  return (
    <div className={dark?"dark":"white"}>
      <div className="search-box">
        <button className={!dark?"search-btn": 'search-btn dark'} onClick={searchNote}><i className="fa-solid fa-magnifying-glass"></i></button>
        <input className={!dark?'search-bar':'search-bar-dark'} type='text' onChange={(event) => setSearchTerm(event.target.value)} />
      </div>

      <button type="button" className="col col-1 btn " onClick={handlePinned}>Show only Pinned</button>
      
      <form className='create-form' style={{backgroundColor:color}} >{ isExpanded && 
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
          {/*} {console.log(canvas)}
          <Link to='/draw' className="canvas btns">Draw</Link>
      {console.log(canvas)} */}
          
          <button className='close btns' onClick={submitButton}>
            Close
          </button>

          <button type='button' className='pin-btn btns' onClick={handlePin}>
            Pin
          </button>

          
              

          
        </div>}
        
      </form>


          
        {notes.map((note,index) => (
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
            file={note.file}
            pin={note.pin}
            showpin={showpin}
          />
        ))}
    </div>
  )
}
