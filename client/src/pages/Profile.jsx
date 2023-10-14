import React from 'react'

export default function Profile() {
  return (
    <div className='px-0 lg:px-12'>
        <div className='flex justify-center my-5 pt-4 gap-4'>
            <div className='w-4/12 border p-2 rounded-md'>
                <h1 className='text-center pb-5 uppercase font-semibold'>Update profile Pic</h1>
                <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs mb-5" />
            </div>
            <div className='w-4/12 border p-2 rounded-md'>
                 <h1 className='text-center'>Update your information</h1>
                
            </div>
            <div className='w-4/12 border p-2 rounded-md'>
                 <h1 className='text-center'>All Notification</h1>
            </div>
        </div>
    </div>
  )
}
