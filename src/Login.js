import { useState } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';

const Login = () => {
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
  )
};


export default Login;