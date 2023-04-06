import React  from 'react'

export default function Popup({content, handleClose, file}) {


  return (
    <div >
        <div className="popup-box" >
            {file!==' ' && <img className='pop-img' src={file} alt=''/>}
             <textarea className={file!==' '?"box-pop-img" : 'box-pop' } value={content}  >
            </textarea>
            <button className='pop-close' onClick={handleClose}>
                Close
            </button>
        </div>
    </div>
  )
}
