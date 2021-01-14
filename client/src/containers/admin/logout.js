import React from 'react';
import axios from 'axios';
const Logout = (props)=>{
    let request = axios('/api/user/logout').then((response)=>{
        //console.log("log out response!", response);
        setTimeout(()=>{
            props.history.push('/')
        },3000);
    });
    return (
        <div className="logout_container">
            <h1>
                Sorry to see you go! :(
            </h1>
        </div>
    )
}

export default Logout;