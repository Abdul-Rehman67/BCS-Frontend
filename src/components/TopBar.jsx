import React from 'react';
// import { FaSignOutAlt } from 'react-icons/fa'; // Ensure you have react-icons installed

const NavBar = ({ userName }) => {
  return (
    <nav className="bg-blue-400 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Book Collection</h1>
      <div className="flex items-center">
        <a href="/" className="mx-4 hover:underline">
          Home
        </a>
        <a href="/stats" className="mx-4 hover:underline">
          Dashboard
        </a>
        <span className="mx-4 font-semibold">{userName}</span>
        <button className="flex items-center mx-4 hover:text-yellow-300">
          {/* <div className='h-4 w-4'> */}

          <img src="./logout.svg" alt="" />
          {/* </div> */}
          <a href='/login' className="ml-1">Logout</a>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
