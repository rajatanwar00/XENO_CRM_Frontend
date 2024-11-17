import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const clientID=import.meta.env.VITE_CLIENTID;
const backendURL=import.meta.env.VITE_APIURL;

function Login() {

    const navigate=useNavigate()

    function handleLoginSuccess(response){
        console.log('Login Successful');

        axios.post(`${backendURL}/login`,{
            authToken:response.credential
        })
        .then((response)=>{
            //console.log(response)
            localStorage.setItem('jwtToken',response.data.token)
            navigate('/audience')
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    function handleLoginError(){
        console.log('login failed');
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='border p-5 shadow-xl bg-slate-100 rounded-sm '>
            <p>Login to continue</p><br/>
            <GoogleOAuthProvider clientId={clientID}>
                <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError}/>
            </GoogleOAuthProvider>
        </div>        
    </div>
  )
}

export default Login