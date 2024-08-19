import React from 'react';
import logo from '../assets/logo.png';
import '../App.css';

const Nav = () => {
  return (
    <header className="py-8 w-full bg-header-gradient">
        <nav className="flex justify-start gap-2 items-center max-container bg-white shadow-lg p-4 rounded-lg relative top-1">
            <a href="#" className='flex'>
                <img src={logo} alt="logo" className='shadow-sm rounded-xl w-10 vibrate-on-hover' />
            </a>
            <div className='font-bold text-2xl gradient-text'>Memories</div>
        </nav>
    </header>
  )
}

export default Nav;