import React from 'react';
import PostEditor from '../components/PostEditor';
import Posts from '../components/Posts';

const Home = () => {
    return (
       <div className='bg-gray-100'>
            <div className='flex flex-col lg:flex-row justify-between items-center gap-2'>
                 <div className='w-12/12 lg:w-4/12'></div>
                <div className='w-12/12 lg:w-5/12'>
                    <PostEditor></PostEditor>
                    <Posts></Posts>
                </div>
                <div className='w-12/12 lg:w-4/12'></div>
            </div>
       </div>
    );
};

export default Home;