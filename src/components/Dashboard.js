import { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom"
import '../App.css';
import {GetData, DeleteItem} from "../api/Endpoints"


function Dashboard() {
  const [records, setRecords] = useState([],[]);
  const navigate = useNavigate()

  useEffect(()=> {
    let token = localStorage.getItem('token');
    GetData(token).then(result => {
        if (Object.keys(result).length > 0 ){
          setRecords(result)
        } else {
          console.log(result)
          localStorage.token = ""
          window.location.replace('/');
        }
        
    }).catch(error => {
        console.error('There was an error!', error);
    });
  },[])

  return (
    <div className="container mt-5">
      <div className='text-end float-right m-3'>
        <Link to="/create" className='btn btn-primary'>Add +</Link>
      </div>
      <table className='table table-bordered table-hover '>
        <thead class="thead-dark">
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
                <Link to={`/update/${item.employee_id}`} className='btn btn-outline-success btn-sm m-1'>update</Link>
                <button onClick={e=> handleDelete(item.employee_id)} className='btn btn-outline-danger btn-sm m-1'>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(id){
    const conf = window.confirm("Do you want to delete?");
    let token = localStorage.getItem('token');
    if (conf){
      DeleteItem(token, id).then(result => {
        console.log(result)
        alert("Record has deleted")
        navigate(0)
      }).catch(error => {
          console.error('There was an error!', error);
      });
    }
  }
}

export default Dashboard;
