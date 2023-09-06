import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from "axios";

function Update() {
    const {id} = useParams()

    const [data, setData] = useState([]);
    const [inputData, setInputData] = useState({
        first_name:"", 
        middle_name:"",
        last_name:"",
        address:"",
        birth_date:"",
        admission_date:""
    });

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk0MDIyODgyLCJpYXQiOjE2OTQwMTc0ODIsImp0aSI6IjkyYmYwMTc4NGVjYjQ3ZGU4Y2NkYTA5MWIwNGIxYjA1IiwidXNlcl9pZCI6MX0.JyOSdYXGBencw_n_LuzRy4dxEH3UDrnte6ylOtmTP84';
    useEffect(()=> {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: "http://localhost:8000/api/v1/employees/" + id + "/"
            }).then(res => {
                console.log(res.data)
                setData(res.data)
            }).catch(error => {
                console.error('There was an error!', error);
            });
        }, [])

    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "PATCH",
            url: "http://localhost:8000/api/v1/employees/" + id + "/",
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