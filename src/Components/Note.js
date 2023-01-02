import React, { useState } from 'react'
import Header from './Header'
import Popup from './Popup'
import EditPop from './EditPop'
import files from '../images/p1.jpg'
import Download from './Download'

export default function Note({ onDelete, id, setNote, editNote, note, color, file, pin}) {
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


  return (
    <>
    <div className="note" style={{backgroundColor:color}} >
    <p>{pin ? <i class="pin fa-solid fa-map-pin"></i> : ""}</p>
      <div>
        {file!='' && <img className='note-img' src={file} alt='' onClick={handlePop} />}
        <h1 >{note.title}</h1>
        
        <p className={note.searched ?"high-text":null} onClick={togglePopup}>{file===''? note.content.substring(0,150):note.content.substring(0,21)}</p>
      </div>
      
      
      <button className={!displayForm? 'note-button show' : 'hide'}  onClick={() => onDelete(id)}>
      <i className="fa-solid fa-trash"></i>
      </button>

      <button className={!displayForm? 'note-button show' : 'hide'} onClick={() => setForm(!displayForm)}>
        Edit
      </button>

      <button className={!displayForm? 'note-button show' : 'hide'} onClick={() => setDownPop(!downPop)}>
        Download
      </button>


      
    </div> 

    { displayForm && <EditPop displayForm={displayForm} handleEdit={handleEdit} setForm={setForm}/>}

    { downPop && <Download content={note.content} title={note.title} file={file} handleClose={toggleDown} />}

    { isOpen && <Popup content={note.content} handleClose={togglePopup} color={color} setNote={setNote} file={file} />}
    </>
  )
}
