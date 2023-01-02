import React, { useState } from 'react'
import Download from './Download';

export default function Popup({content, handleClose, file}) {


  return (
    <div >
        <div className="popup-box" >
            {file!=='' && <img className='pop-img' src={file} alt=''/>}
             <textarea className={file===''?"box-pop" : 'box-pop-img' } value={content}>
            </textarea>
            <button className='pop-close' onClick={handleClose}>
                Close
            </button>
        </div>
    </div>
  )
}
