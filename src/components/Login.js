import { useState } from 'react';
import { Navigate} from "react-router-dom"
import '../App.css';
import {GetToken} from "../api/Endpoints"

function Login() {
  const [inputData, setInputData] = useState({
    username:"", 
    password:"",
  });
  const [authenticated, setauthenticated] = useState(localStorage.getItem("token")|| false);

  const handleSubmit = (e) => {
    e.preventDefault()
    GetToken(inputData).then(result => {
      if (result.request.status === 200){
        setauthenticated(true)
      }
      if (result.code === "ERR_BAD_REQUEST"){
        alert(result.response.data.detail)
      }
    }).catch(error => {
        setauthenticated(false)
        console.error('There was an error!', error);
    });
  };

  if (authenticated) {
    return <Navigate to="/home/" />;
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-5'>
            <div className='m-5'>
                <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='m-3'>
                    <input type='text' placeholder='Username' name='username'  className='form-control'
                    onChange={e=>setInputData({...inputData, username: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='password' placeholder='Password' name='password' className='form-control'
                    onChange={e=>setInputData({...inputData, password: e.target.value})}/>
                </div>
                <button className='m-3 btn btn-info'>Login</button>
            </form>
        </div>
    </div>
  );
}

export default Login;
