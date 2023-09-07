import React from 'react'
import { Routes, Route} from "react-router-dom"
import Add from '../components/Add'
import Update from '../components/Update'
import Home from '../components/Home'
import Login from '../components/Login'
import Logout from '../components/Logout'

function AppRouter() {
  return (
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="home/" element={<Home />}></Route>
            <Route path="create/" element={<Add />}></Route>
            <Route path="update/:id" element={<Update />}></Route>
            <Route path="login/" element={<Login />}></Route>
            <Route path="logout/" element={<Logout />}></Route>
        </Routes>
  )
}

export default AppRouter