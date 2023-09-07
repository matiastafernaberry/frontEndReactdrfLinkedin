import React from 'react'
import { Routes, Route} from "react-router-dom"
import Add from './components/Add'
import Update from './components/Update'
import Home from './components/Home'
import Login from './components/Login'

function AppRouter() {
  return (
        <Routes>
            {/*   <Route path="/" element={isLogin ? <Navigate to="/" /> : <Login />}/> */}
            <Route path="/" element={<Login />}></Route>
            <Route path="home/" element={<Home />}></Route>
            <Route path="create/" element={<Add />}></Route>
            <Route path="update/:id" element={<Update />}></Route>
            <Route path="login/" element={<Login />}></Route>
        </Routes>
  )
}

export default AppRouter