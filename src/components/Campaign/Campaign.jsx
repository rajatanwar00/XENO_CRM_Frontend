import React, { useEffect } from 'react'

function Campaign() {

    useEffect(()=>{

    },[])
    
  return (
    <div className='flex h-screen'>
        <div className='w-60 p-3 border'>
            <div className='text-lg'>
                <p className='font-medium'>Previous Campaigns</p>
            </div>
        </div>

        <div className='w-screen'>
            <div className='flex justify-center items-center pt-4 text-xl'>
                <p className='font-bold'>Your Campaign</p>
            </div>
        </div>
    </div>
  )
}

export default Campaign