import './App.css';
import { useState } from 'react';
import Dashboard from './Dashboard';
import { Navigate} from "react-router-dom"


function Home() {
    //const [authenticated, setauthenticated] = useState(localStorage.getItem("token")|| false);
    //setauthenticated(localStorage.getItem("token")|| false)
    
    return (
        <>
            <Dashboard />
        </>
    );
}

export default Home;