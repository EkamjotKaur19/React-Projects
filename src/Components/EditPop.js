import React, { useState } from 'react'

export default function EditPop({displayForm, handleEdit, setForm, note}) {
    const [inpCon, setInpCon]=useState(note.content);
    const handleClose = () => {
        setForm(!displayForm);
    }


    const handleChange= (e) => {
        setInpCon(e.target.value);
    }

  return (
    <div >
        <div className="popup-box">
            <form
                onSubmit={handleEdit}
                className={displayForm ? "edit-form show" : " hide"}>
                <input placeholder="title" value={note.title}  />
                <input placeholder="content" value={inpCon} onChange={handleChange} />
                <input type="submit" />
                <input type="button" onClick={handleClose} value="Close"/>
            </form>
            </div>
            </div>
  )
}
