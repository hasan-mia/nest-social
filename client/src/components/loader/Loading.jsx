import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center pb-4 mb-4'>
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
    </div>
  )
}
