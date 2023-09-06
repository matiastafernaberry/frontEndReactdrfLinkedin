import { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom"
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

function App() {
  const [records, setRecords] = useState([]);

  useEffect(()=> {
    let token = localStorage.getItem('token');
    if (!token){
      //get token 
      getToken().then(result => {
        //console.log(result)
        token = result;
        getData(token).then(result => {
          console.log(result)
          setRecords(result)
        }).catch(error => {
            console.error('There was an error!', error);
        });
      }).catch(error => {
          console.error('There was an error!', error);
      });
      

    } else {
      getData(token).then(result => {
        console.log(result)
        setRecords(result)
      }).catch(error => {
          console.error('There was an error!', error);
      });
      
    }
  },[])

  return (
    <div className="container mt-5">
      <div className='text-end float-right m-3'>
        <Link to="/create" className='btn btn-primary'>Add +</Link>
      </div>
      <table className='table'>
        <thead>
          <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Birthdate</th>
              <th>Admission Date</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {records.map((item) => (
          <tr key={item.id}>
            {/* {Object.values(item).map((val) => (
              <td>{val}</td>
            ))} */}
             <td>{item.first_name}</td>
             <td>{item.middle_name}</td>
             <td>{item.last_name}</td>
             <td>{item.address}</td>
             <td>{item.birth_date}</td>
             <td>{item.admission_date}</td>
            <td>
              <Link to={`/update/${item.employee_id}`} className='btn btn-success'>update</Link>
              <button onClick={e=> handleDelete(item.employee_id)} className='btn btn-danger'>delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(){

  }
}

export default App;
