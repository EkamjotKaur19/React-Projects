import React  from 'react'
import ref from "../images/p4.png"

export default function Header({dark}) {
    const logo = (
        <img
        src={ref}
        alt="logo"
        className='logo'
        />
    );
    return (
        <>
        <div className={!dark?'header':'header-dark'}>
            {logo}
        </div>
        <hr className={!dark?'head-hr':'head-hr-dark'}/>
        </>
    );
}
