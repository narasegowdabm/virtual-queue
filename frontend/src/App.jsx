import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {AppContext} from "./Context/Context.jsx";

import {Home, MyAppointments, AllDoctors, SignUp, Login, DoctorRegister, DoctorDetails } from "./import-export/ImportExport.js";

function App() {

  return (
    <BrowserRouter>
      <AppContext>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<MyAppointments />} />
          <Route path="/alldoctors" element={<AllDoctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register/doctor" element={<DoctorRegister />} />
          <Route path="/doctors/:doctorId" element={<DoctorDetails />} />
        </Routes>

      </AppContext>
    </BrowserRouter>
  );
}

export default App;
