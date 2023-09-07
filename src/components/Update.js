import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {getSingleData, updateData} from "./Endpoints"

function Update() {
    const {id} = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const [inputData, setInputData] = useState({
        first_name:"", 
        middle_name:"",
        last_name:"",
        address:"",
        birth_date:"",
        admission_date:""
    });

    useEffect(()=> {
        getSingleData(token, id).then(result => {
            console.log(result)
            setData(result)
        }).catch(error => {
            console.error('There was an error!', error);
        });
    },[token, id])

    function handleSubmit(event){
        event.preventDefault()
        //check if value is empty
        Object.keys(inputData).forEach(function(key, index) {
            if (!inputData[key]){inputData[key] = data[key]} ;
        });

        updateData(token, inputData, id).then(result => {
            alert("Data Updated Succesfully!")
            navigate("/home/")
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }
    
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-1'>
            <div className='m-5'>
                <h1>Edit Employee</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='m-3'>
                    <input type='text' placeholder='Name' name='first_name'  defaultValue={data.first_name}  className='form-control'
                    onChange={e=>setInputData({...inputData, first_name: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='text' placeholder='Middle Name' defaultValue={data.middle_name} name='middle_name' className='form-control'
                    onChange={e=>setInputData({...inputData, middle_name: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='text' placeholder='Last Name' defaultValue={data.last_name} name='last_name' className='form-control'
                    onChange={e=>setInputData({...inputData, last_name: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='text' placeholder='Address' defaultValue={data.address} name='address' className='form-control'
                    onChange={e=>setInputData({...inputData, address: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='date' placeholder='Birthdate' defaultValue={data.birth_date} name='birth_date' className='form-control'
                    onChange={e=>setInputData({...inputData, birth_date: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='date' placeholder='Admission Date' defaultValue={data.admission_date} name='admission_date' className='form-control'
                    onChange={e=>setInputData({...inputData, admission_date: e.target.value})}/>
                </div>
                <button className='m-3 btn btn-info'>Update</button>
            </form>
        </div>
    </div>
    
  )
}

export default Update