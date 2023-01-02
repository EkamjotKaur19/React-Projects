import React from 'react'

export default function Header({dark}) {

    

    const logo = (
        <img
        src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
        alt="logo"
        className='logo'
        />
    );
    return (
        <>
        <div className={!dark?'header':'header-dark'}>
            {logo}
            <span className={!dark?'head':'head darker'}>Keep</span>

            
              
        </div>
        <hr className={!dark?'head-hr':'head-hr-dark'}/>
        </>
    );
}
