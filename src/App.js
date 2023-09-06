import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate, Navigate} from "react-router-dom"
import './App.css';

async function getToken() {
  let token = ""
  await axios.request({
    method: "POST",
    url: `http://127.0.0.1:8000/api/token/`,
    data: {
      "password": "password123",
      "username": "admin"
    }
  }).then(res => {
    token = res.data.access;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', res.data.refresh);
  }).catch(error => {
    console.error('There was an error!', error);
  });
  return token
}

async function getData(token) {
  let data =  {}
  await axios.request({
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: "GET",
    url: `http://localhost:8000/api/v1/employees/`
  }).then(res => {
    console.log(res.data.results)
    data = res.data.results
  }).catch(error => {
      console.error('There was an error!', error);
  });
  return data
}

async function deleteItem(token, id) {
  let data =  {}
  await axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "DELETE",
      url: "http://localhost:8000/api/v1/employees/" + id + "/"
  }).then(res => {
      data = res.data.results
  }).catch(error => {
      console.error('There was an error!', error);
  });
  return data
}

function App() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const users = [{ username: "Jane", password: "testpassword" }];

  const handleSubmit = (e) => {
    e.preventDefault()
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
        setauthenticated(true)
        localStorage.setItem("authenticated", true);
    }
  };

  const isAuthenticated = true;

  if (isAuthenticated) {
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
                    <input type='text' placeholder='Username' name='username'  className='form-control'/>
                </div>
                <div className='m-3'>
                    <input type='password' placeholder='Password' name='password' className='form-control'/>
                </div>
                <button className='m-3 btn btn-info'>Login</button>
            </form>
        </div>
    </div>
  );
}

export default App;
