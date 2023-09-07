import { useState } from 'react';
import { Navigate} from "react-router-dom"


function Logout() {
  
    localStorage.setItem('token', "");

    return (
        <Navigate to="/" /> 
    );
}

export default Logout;
