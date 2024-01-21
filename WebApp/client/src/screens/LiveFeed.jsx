import React from 'react'

export default function LiveFeed() {
    return (
        <>

            <div className='text-center w-screen bg-gray-800 text-white p-4 text-4xl'>
                Monitoring
            </div>
            <div className='flex justify-center items-center m-8'>
                <img className='rounded-3xl' src="http://192.168.137.1:3000/video" alt="Video feed" />
            </div>

            <div className='flex justify-center'>
                <button className='p-2 rounded-md mt-2 w-[100%] text-white font-medium mx-5 max-w-[200px] bg-green-500 ' >Open The Gate </button>
            </div>
        </>
    );
}
