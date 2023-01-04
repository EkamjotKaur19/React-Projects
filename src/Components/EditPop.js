import React, { useState } from 'react'

export default function EditPop({displayForm, handleEdit, setForm, note}) {
    const [inpCon, setInpCon]=useState(note.content);
    const handleClose = () => {
        setForm(!displayForm);
    }


    const handleChange= (e) => {
        setInpCon(e.target.value);
    }

    const handlePin = (e) => {
        note.pin=!note.pin;
    }

  return (
    <div >
        <div className="popup-box">
            <form
                onSubmit={handleEdit}
                className={displayForm ? "edit-form show" : " hide"}>
                <p onClick={handlePin} ><i className="pin fa-solid fa-map-pin"></i> </p>
                <input placeholder="title" value={note.title}  />
                <input placeholder="content" value={inpCon} onChange={handleChange} />
                <input type="submit" />
                <input type="button" onClick={handleClose} value="Close"/>
            </form>
            </div>
            </div>
  )
}
