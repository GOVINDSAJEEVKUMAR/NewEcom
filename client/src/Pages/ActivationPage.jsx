import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server';



const ActivationPAge = () => {
    const {activation_token} = useParams();
    const [error,SetError] = useState(false);
    useEffect(()=>{
        if(activation_token){
            const sendRequest = async ()=>{
                await axios.post(`${server}/activation`,{
                    activation_token,
                }).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                    SetError(true);
                })
            };
            sendRequest();
        }
    },[]);
  return (
    <div style ={{
        width:"100%",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",

    }}>
      {error ?(
            <p>Your token is expired</p>
        ) : (
            <p>Your Account has been created Successfully</p>
        )
     }
    </div>
  )
}

export default ActivationPAge
