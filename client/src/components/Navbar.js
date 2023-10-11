import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFacebook, BsSearch } from 'react-icons/bs';
import { IoMdNotifications } from 'react-icons/io';
import { VscHome } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import userImag from '../../src/assets/userImg.png';


const Navbar = () => {
    return (
      <header className='pb-2'>
        <div className="w-full navbar justify-between bg-base-100 border border-b-2 border-gray-100">

              <div className="navbar-start flex-1 gap-2">
                <BsFacebook className='text-3xl lg:text-4xl text-blue-600'/>
                <div className='bg-main py-2 px-4 relative rounded sm-none'>
                    <input type="text" placeholder="Search Profile" className="p-2 border bg-gray-200 border-gray-200 rounded-3xl w-full px-2 lg:px-8" />
                    <p><BsSearch className='text-color z-10 text-xl absolute top-5 mx-2'/></p>
                </div>
                <BsSearch className='text-3xl lg:text-4xl bg-gray-200 rounded-full p-2 active:text-blue-600 lg:hidden'/>
                <label for="my-drawer" className='lg:hidden'>
                  <AiOutlineMenu className='text-3xl cursor-pointer'/>
                </label>
              </div>
              
              <div className="navbar-center flex justify-center sm-none">
                <Link to="/" className='text-xl'><VscHome size={32}/></Link>
              </div>
              <div className="navbar-end">
                  <ul className="flex justify-center items-center gap-2">
                    <li className='text-md lg:text-2xl p-2 bg-gray-200 rounded-full active:text-blue-600 cursor-pointer'><a ><IoMdNotifications /></a></li>
                    <li><Link className='hover:bg-transparent cursor-pointer' to="/">
                      <img alt="name" src={userImag} className="w-10 rounded-full"/>
                    </Link></li>
                  </ul>
              </div>
            </div>
      </header>
    );
};

export default Navbar;