import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate, Navigate} from "react-router-dom"
import './App.css';

async function getToken(data) {
  let token = ""
  let result = ""
  await axios.request({
    method: "POST",
    url: `http://127.0.0.1:8000/api/token/`,
    data: {
      "password": data.password,
      "username": data.username
    }
  }).then(res => {
    result = res
    token = res.data.access;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', res.data.refresh);
  }).catch(error => {
    result = error
    console.log(error.response.status)
    console.log(error.response.data.detail)
    console.error(error);
  });
  return result
}


function App() {
  const [inputData, setInputData] = useState({
    username:"", 
    password:"",
});
  const [authenticated, setauthenticated] = useState(localStorage.getItem("token")|| false);

  const handleSubmit = (e) => {
    e.preventDefault()
    getToken(inputData).then(result => {
      //console.log(result)
      if (result.request.status === 200){
        setauthenticated(true)
      }
      let error = Object.values(result).includes("code");
      //console.log(result.code)
      //console.log(error)

      if (result.code === "ERR_BAD_REQUEST"){
        alert(result.response.data.detail)
      }
    }).catch(error => {
        setauthenticated(false)
        console.error('There was an error!', error);
    });
  };


  if (authenticated) {
    return <Navigate to="home/" />;
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

export default App;
