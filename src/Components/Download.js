import React from 'react';
import Pdf from "react-to-pdf";
const ref = React.createRef();

export default function Download({content,title,handleClose, file}) {
  return (
    <div className="popup-box">
        <div className="box-pop-down">
            <Pdf targetRef={ ref} filename={title!=='' ? `${title}.pdf` : 'note.pdf'}>
                {({ toPdf }) => <button className='pdf-btn' onClick={toPdf}>Generate Pdf</button>}
            </Pdf>
            <div ref={ref} className='pdf' >
                <img src={file} className='pdf-img'  alt=''/>
                <p>{content}</p>
            </div>
            <button className='pop-close-down' onClick={handleClose}>
                Close
            </button>
        </div>
       
    </div>
  )
}
