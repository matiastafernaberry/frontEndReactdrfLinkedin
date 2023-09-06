import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import App from './App'
import Add from './Add'
import Update from './Update'
import Home from './Home'

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            {/*   <Route path="/" element={isLogin ? <Navigate to="/" /> : <Login />}/> */}
            <Route path="/" element={<App />}></Route>
            <Route path="home/" element={<Home />}></Route>
            <Route path="create/" element={<Add />}></Route>
            <Route path="update/:id" element={<Update />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter