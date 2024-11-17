import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {

    const [user,setUser]=useState('')
    const navigate=useNavigate()
    const location=useLocation()
    const currentPath=location.pathname;
    const backendURL=import.meta.env.VITE_APIURL;

    useEffect( ()=>{
        const token=localStorage.getItem('jwtToken');

        // let username=localStorage.getItem('user')
        // setUser(username);

        axios.get(`${backendURL}/users`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response)=>{
            //console.log(response);
            setUser(response.data.data[0].name);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[currentPath])

    function logout(e){
        e.preventDefault()
    
        localStorage.clear()
        setUser(localStorage.getItem('userType'))
        navigate('/')
      }


  return (
    <div className='bg-blue-500 text-white h-24 p-3'>
        <div className='flex justify-center items-center'>
            <p className='font-extrabold text-4xl'>XenoCRM</p>
        </div>

        <div className='flex justify-between'>
            <label className='p-2'>
                {user}
            </label>

            <button className='p-2 hover:bg-blue-400' onClick={(e)=>logout(e)}>Logout</button>
        </div>
    </div>
  )
}

export default Header