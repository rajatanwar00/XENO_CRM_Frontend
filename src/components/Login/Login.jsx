import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const clientID=import.meta.env.VITE_CLIENTID;
const backendURL=import.meta.env.VITE_APIURL;

//console.log(clientID,backendURL);

function Login() {

    const navigate=useNavigate()
    const [loading, setLoading] = useState(false);

    function handleLoginSuccess(response){
        console.log('Login Successful');

        setLoading(true);
        axios.post(`${backendURL}/login`,{
            authToken:response.credential
        })
        .then((response)=>{
            //console.log(response)
            localStorage.setItem('jwtToken',response.data.token)
            setLoading(false)
            navigate('/audience')
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false)
        })

    }

    function handleLoginError(){
        console.log('login failed');
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        {loading?(<Loader className='items-center'/>):(
            <div className='border p-5 shadow-xl bg-slate-100 rounded-sm '>
                <p>Login to continue</p><br/>
                <GoogleOAuthProvider clientId={clientID}>
                    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError}/>
                </GoogleOAuthProvider>
            </div>   
        )}
             
    </div>
  )
}

export default Login