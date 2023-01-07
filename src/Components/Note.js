import React, { useState } from 'react'
import Popup from './Popup'
import EditPop from './EditPop'
import Download from './Download'
import axios from 'axios'
import noteService from '../services/notes'

export default function Note({ onDelete, id, setNote, setNotes, notes, editNote, note, color, file, pin, showpin, icons}) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayForm, setForm] = useState(false);
  const [downPop, setDownPop]=useState(false)
  

  function handleEdit(e) {
    e.preventDefault();
    const title = e.target.children[0].value;
    const content = e.target.children[1].value;
    editNote(note, title, content);

    setForm(false);
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const toggleDown = () => {
    setDownPop(!downPop);
  }

  const handlePop = () => {
    setIsOpen(!isOpen);
  }
  {/*
  console.log(id);
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    console.log(note);
    const changedNote = { ...note, pin: !note.pin }
    

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
*/}

  const togglePin = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    console.log(note);
    const changedNote = { ...note, pin: !note.pin }

    noteService.update(url, changedNote).then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })

  }

  const handleEditForm = () => {
    icons=!icons;
    setForm(!displayForm);
  }

  const handleDownPop = () => {
    icons=!icons;
    setDownPop(!downPop);
  }


  return (
    <>
    <div className="note" style={{backgroundColor:color}} >
    <p onClick={togglePin} >{pin ? <i className="pin fa-solid fa-map-pin"></i> : ""}</p>
      <div>
        {file!==" " && <img className='note-img' src={file}  onClick={handlePop} />}
        <h1 >{note.title}</h1>
        
        <p onClick={togglePopup}>{file===" " && note.content!==undefined? note.content.substring(0,200):note.content.substring(0,21)}</p>
      </div>
      
      
      <button className={icons? 'note-button show' : 'note-button hide'}  onClick={() => onDelete(id, note)}>
      <i className="fa-solid fa-trash"></i>
      </button>

      <button className={icons? 'note-button show' : 'hide'} onClick={() => handleEditForm()}>
        Edit
      </button>

      <button className={icons? 'note-button show' : 'hide'} onClick={() =>  handleDownPop()}>
        Download
      </button>



      
    </div>
    

    { displayForm && <EditPop displayForm={displayForm} handleEdit={handleEdit} setForm={setForm} note={note}/>}

    { downPop && <Download content={note.content} title={note.title} file={file} handleClose={toggleDown} />}

    { isOpen && <Popup content={note.content} handleClose={togglePopup} color={color} setNote={setNote} file={file} />}
    </>
  )
}
