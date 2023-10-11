import React from 'react';
import { BiWorld } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { FaHeart, FaThumbsUp } from 'react-icons/fa';
import { FiThumbsUp } from 'react-icons/fi';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import userImag from '../../src/assets/userImg.png';
import domingo from '../assets/domingo.jpg';

const Post = () => {
    return (

            <div className="flex flex-col flex-start gap-2 bg-white pb-2 mb-4 border rounded-lg">
                <div className='flex justify-between items-start gap-1 px-2 py-2 w-full mb-2'>
                    {/* ==Profile== */}
                    <div className='flex justify-center gap-x-2'>
                        <Link href='#'>
                        <img alt="name" src={userImag} className="w-10 h-10 rounded-full"/>
                        </Link>
                        <div className='flex flex-col'>
                            <p>Emah John</p>
                            <p className='flex items-center gap-2 text-gray-700 text-sm'><span>6hr</span> <span><BiWorld/></span></p> 
                        </div>
                    </div>
                    {/* Dropdown menu */}
                    <div className="dropdown dropdown-end px-2">
                        <label tabindex="0" className="rounded-full">
                        <div className='text-md lg:text-2xl cursor-pointer px-2'>
                        <BsThreeDots/>
                        </div>
                        </label>
                        <ul tabindex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>Edit</li>
                        <li>Delete</li>
                        </ul>
                    </div>
                </div>

                {/* Post Content */}
                <div className="post-content">
                    <article>
                        <div className='px-4 py-0'>
                            <h1>টি-টোয়েন্টি থেকে দেয়া হয়েছে বিশ্রাম; দায়িত্ব পালন করবেন ওয়ানডে এবং টেস্টে, চোখ রাখবেন ঘরোয়া ক্রিকেটে....</h1>
                        </div>
                        <div className='w-full'>
                            <img alt="name" src={domingo} className='w-full' />
                        </div>
                    </article>

                    {/* == Like/Comment ===*/}
                    <div className="comment px-4 py-2">

                        {/* Show Like/Comment */}
                        <div className="flex justify-between">
                            <nav className='flex items-center text-sm text-gray-600 list-none'>
                                <span className='bg-blue-700 text-white p-1 rounded-full'><FaThumbsUp/></span>
                                <span className='bg-red-700 text-white p-1 rounded-full'><FaHeart/></span>
                                <span className='pl-1 text-lg'>1.5k Johns and 5 othes</span>
                            </nav>
                            <div className="flex items-center gap-x-2 text-md text-gray-600">
                                <p>12k Comments</p>
                                <p>103 Shares</p>
                            </div>
                        </div>

                        {/* Show Like/Comment */}
                        <div className="flex justify-center items-center border-y py-2 mt-2">
                            <nav className='flex items-center gap-16 text-gray-600 list-none'>
                                <button className='flex items-center gap-1'> <span className='text-xl'><FiThumbsUp/></span><span className='text-md font-semibold'>Like</span></button>
                                <button className='flex items-center gap-1'> <span className='text-xl'><GoComment/></span><span className='text-md font-semibold'>Comments</span></button>
                                <button className='flex items-center gap-1'> <span className='text-xl'><RiShareForwardLine/></span><span className='text-md font-semibold'>Share</span> </button>
                            </nav>
                            {/* <div className="flex justify-self-end">
                               <img alt="name" src="https://placeimg.com/80/80/people" className="w-6 h-6 rounded-full"/>
                            </div> */}
                        </div>

                        {/* Post Comment */}
                        <div className='flex items-center gap-1px-2 py-2 w-full mt-2'>
                            <Link to="/">
                                <img alt="name" src={userImag} className="w-7 h-7 rounded-full"/>
                            </Link>
                            <div className="flex w-full px-2">
                                <input type="text" placeholder="Write a comment..." className="py-2 pl-3 border-0 focus:border-0 hover:border-0 rounded-full bg-gray-100 input-bordered w-full" />
                            </div>
                        </div>

                        {/* All Comment */}
                        <nav className='flex flex-col bg-transparent gap-2'>
                                {/* ==Comment== */}
                                <li className='flex justify-between items-start gap-1 w-full'>
                                    <ul className='flex justify-center gap-x-2'>
                                         <Link to="/">
                                            <img alt="name" src={userImag} className="w-7 h-7 rounded-full"/>
                                        </Link>
                                        <li className='flex flex-col'>
                                            <div className='flex flex-col bg-gray-100 py-2 px-4 rounded-3xl'>
                                                <p className='font-semibold'>Emah John</p>
                                                <p className='flex items-center gap-2 text-gray-700 text-sm'><span>Lorem ipsum dolor sit amet consectetur adipisicing elit</span></p> 
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className='py-1 px-2 text-gray-800 rounded-md text-sm'>Like</button>
                                                <button className='py-1 px-2 text-gray-800 rounded-md text-sm'>Reply</button>
                                            </div> 
                                        </li>
                                    </ul>
                                </li>

                                <li className='flex justify-between items-start gap-1 w-full'>
                                    {/* ==Profile== */}
                                    <ul className='flex justify-center gap-x-2'>
                                         <Link to="/">
                                            <img alt="name" src={userImag} className="w-10 h-7 rounded-full"/>
                                        </Link>
                                        <li className='flex flex-col'>
                                            <div className='flex flex-col bg-gray-100 py-2 px-4 rounded-3xl'>
                                                <p className='font-semibold'>Sarah Doe</p>
                                                <p className='flex items-center gap-2 text-gray-700 text-sm'><span>Illo eveniet velit consequatur quae fugit? Autem, temporibus. Sunt.</span></p> 
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className='py-1 px-2 text-gray-800 rounded-md text-sm'>Like</button>
                                                <button className='py-1 px-2 text-gray-800 rounded-md text-sm'>Reply</button>
                                            </div>
                                            
                                            {/* ==Reply== */}
                                            <li className='flex justify-between items-start gap-1 w-full'>
                                                <ul className='flex justify-center gap-x-2'>
                                                     <Link to="/">
                                                        <img alt="name" src={userImag} className="w-10 h-7 rounded-full"/>
                                                    </Link>
                                                    <li className='flex flex-col'>
                                                        <div className='flex flex-col bg-gray-100 py-2 px-4 rounded-3xl'>
                                                            <p className='font-semibold'>Emah John</p>
                                                            <p className='flex items-center gap-2 text-gray-700 text-sm'><span>Eos ex at maxime repellendus quis! Nihil expedita similique minima eaque eveniet quas hic sit assumenda cum. Illo officiis quo autem ipsum.</span></p> 
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button className='py-1 px-2 text-gray-800 rounded-md text-sm'>Like</button>
                                                            <button className='py-1 px-2 text-gray-800 rounded-md text-sm'>Reply</button>
                                                        </div> 
                                                    </li>
                                                </ul>
                                            </li>
                                            
                                        </li>
                                        
                                    </ul>
                                </li>
                                  
                        </nav>
                   </div>
                </div>
                
            </div>

    );
};

export default Post;