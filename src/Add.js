import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

function Add() {
    const [inputData, setInputData] = useState({
        first_name:"", 
        middle_name:"",
        last_name:"",
        address:"",
        birth_date:"",
        admission_date:""
    });

    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        axios.request({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            method: "POST",
            url: `http://localhost:8000/api/v1/employees/`,
            data: inputData
        }).then(res => {
            alert("Data Added Succesfully!")
            navigate("/")

        }).catch(error => {
            console.error('There was an error!', error);
            console.error(inputData);
        });
        
    }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-5'>
            <div className='text-end float-right m-3'>
                <Link to="/" className='btn btn-primary'>Home</Link>
            </div>
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