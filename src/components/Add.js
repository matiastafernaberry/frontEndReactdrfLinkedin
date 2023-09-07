import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addData } from '../api/Endpoints';

function Add() {
    const [inputData, setInputData] = useState({
        first_name:"", 
        middle_name:"",
        last_name:"",
        address:"",
        birth_date:"",
        admission_date:""
    });
    const token = localStorage.getItem('token');

    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
       
        addData(token, inputData).then(result => {
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
                <h1>Add Employee</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='m-3'>
                    <input type='text' placeholder='Name' name='first_name' className='form-control'
                    onChange={e=>setInputData({...inputData, first_name: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='text' placeholder='Middle Name' name='middle_name' className='form-control'
                    onChange={e=>setInputData({...inputData, middle_name: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='text' placeholder='Last Name' name='last_name' className='form-control'
                    onChange={e=>setInputData({...inputData, last_name: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='text' placeholder='Address' name='address' className='form-control'
                    onChange={e=>setInputData({...inputData, address: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='date' placeholder='Birthdate' name='birth_date' className='form-control'
                    onChange={e=>setInputData({...inputData, birth_date: e.target.value})}/>
                </div>
                <div className='m-3'>
                    <input type='date' placeholder='Admission Date' name='admission_date' className='form-control'
                    onChange={e=>setInputData({...inputData, admission_date: e.target.value})}/>
                </div>
                <button className='m-3 btn btn-info'>Submit</button>
            </form>
        </div>
    </div>

  )
}

export default Add