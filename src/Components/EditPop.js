import React,{ useState }from 'react'

export default function Popup({displayForm, handleEdit, setForm}) {

    const handleClose = () => {
        setForm(!displayForm);
    }
  return (
    <div >
        <div className="popup-box">
            <form
                onSubmit={handleEdit}
                className={displayForm ? "edit-form show" : " hide"}>
                <input placeholder="title"  />
                <input placeholder="content"  />
                <input type="submit" />
                <input type="button" onClick={handleClose} value="Close"/>
            </form>
            </div>
            </div>
  )
}
