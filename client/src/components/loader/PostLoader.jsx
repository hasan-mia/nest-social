import React from 'react'

export default function PostLoader() {
  return (
     <>
        <div className="mt-4">
            <div className="w-full p-6 bg-white rounded-md shadow-lg">
                <div className='w-full flex items-center'>
                    <div className="w-2/12">
                        <div className="skeleton h-8 w-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
                    </div>
                    <div className="w-8/12">
                        <div className="skeleton h-4 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>    
                    </div>    
                </div>            
                <div className="skeleton h-4 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
                <div className="skeleton h-48 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
                <div className="skeleton h-2 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
                <div className="skeleton h-2 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
            </div>
        </div>
        <div className="mt-4">
            <div className="w-full p-6 bg-white rounded-md shadow-lg">
                <div className='w-full flex items-center'>
                    <div className="w-2/12">
                        <div className="skeleton h-8 w-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
                    </div>
                    <div className="w-8/12">
                        <div className="skeleton h-4 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>    
                    </div>    
                </div>            
                <div className="skeleton h-4 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
                <div className="skeleton h-48 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
                <div className="skeleton h-2 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
                <div className="skeleton h-2 bg-gradient-to-r from-gray-200 to-gray-400 mb-2"></div>
            </div>
        </div>
     </>
  )
}
