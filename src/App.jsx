import React from "react";
import FormPage from "./Components/FormPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Components/HomePage'
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<FormPage/>} ></Route>
        <Route path='/HomePage' element={<HomePage/>} ></Route>
      </Routes>
    </Router>


    </>
  )
}

export default App
