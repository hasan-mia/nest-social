import React from 'react';
import { FaVideo } from 'react-icons/fa';
import { MdPhotoLibrary } from 'react-icons/md';
import { Link } from 'react-router-dom';
import userImag from '../../src/assets/userImg.png';


const PostEditor = () => {
    return (
        <div className='py-2 mt-6 bg-white border rounded-xl'>
            <div className="flex flex-col justify-start gap-2">
                <div className='flex items-center gap-1 hover:bg-gray-100 px-2 py-2 w-full mb-2'>
                    <Link to='/'>
                        <img alt="name" src={userImag} className="w-10 h-10 rounded-full"/>
                    </Link>
                    <div className="flex w-full px-2">
                        <input type="text" placeholder="What's your mind Emah?" className="py-4 input bg-gray-100 input-bordered w-full" />
                    </div>
                </div>
                
                <div className="flex justify-between items-center gap-2 px-8">
                    <button className='py-2 px-4 flex items-center gap-2 hover:bg-gray-200 hover:rounded-md'><FaVideo className='lg:text-3xl text-red-500'/><span className='lg:text-md font-semibold'>video</span></button>
                    <button className='py-2 px-4 flex items-center gap-2 hover:bg-gray-200 hover:rounded-md'><MdPhotoLibrary className='lg:text-3xl text-green-300'/><span className='lg:text-md font-semibold'>Photo</span></button>
                </div>
            </div>
        </div>
    );
};

export default PostEditor;