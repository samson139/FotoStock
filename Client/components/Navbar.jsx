
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCameraRetro, FaBars, FaTimes } from 'react-icons/fa';
import Logout from './Logout';
import CartIcon from './CartIcon';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center text-white">
          <FaCameraRetro size={'2em'} />
          <span className="ml-2 text-2xl font-bold font-sans tracking-wider">FotoStock</span>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden text-white flex">
          <div className=" text-teal-200 hover:text-white text-md mx-2">
            <NavLink to="cartitems"><CartIcon size={26} /></NavLink>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none transition-transform duration-300 ease-in-out p-1"
          >
            <span
              className={`inline-block transform transition-transform duration-300 ${menuOpen ? 'rotate-180 opacity-100' : 'rotate-0 opacity-100'
                }`}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </span>
          </button>
        </div>

        {/* Full Nav (visible on lg+) */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink to="/signin" className="text-white text-xl hover:text-yellow-200">Home</NavLink>
          <NavLink to="upload" className="text-white text-xl hover:text-yellow-200">Upload</NavLink>
          <NavLink to="search" className="text-white text-xl hover:text-yellow-200">Search</NavLink>
          <NavLink to="contact" className="text-white text-xl hover:text-yellow-200">Contact me</NavLink>

          <div className="text-teal-200 hover:text-white text-xl">
            <NavLink to="cartitems"><CartIcon /></NavLink>
          </div>
          <div className="text-teal-200 hover:text-white text-xl">
            <Logout />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <>


          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden">

            <div className="fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg p-4 flex flex-col">

              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold">Menu</span>

                <button onClick={() => setMenuOpen(false)} className="text-white">
                  <FaTimes size={24} />
                </button>
              </div>


              {/* Links */}
              <div className="flex flex-col justify-center items-center">
                <NavLink to="/" className="py-2 text-xl hover:text-yellow-200" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink to="upload" className="py-2 text-xl hover:text-yellow-200" onClick={() => setMenuOpen(false)}>Upload</NavLink>
                <NavLink to="search" className="py-2 text-xl hover:text-yellow-200" onClick={() => setMenuOpen(false)}>Search</NavLink>
                <NavLink to="contact" className="py-2 text-xl hover:text-yellow-200" onClick={() => setMenuOpen(false)}>Contact me</NavLink>


                <div className="py-2 text-teal-200 hover:text-white text-xl">
                  <Logout />
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;


