import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import App from './App'
import Add from './Add'
import Update from './Update'

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="create/" element={<Add />}></Route>
            <Route path="update/:id" element={<Update />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter