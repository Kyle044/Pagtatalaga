import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Default/Home";
import About from "./Pages/Default/About";
import Portal from "./Pages/Portal/Portal";
import Admin from "./Pages/Admin/Admin";
import QueueRegistrar from "./Pages/RegistrarQueue/RegistrarQueue";
import QueueAdmission from "./Pages/AdmissionQueue/AdmissionQueue";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Portal" element={<Portal />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/QueueRegistrar" element={<QueueRegistrar />} />
        <Route path="/QueueAdmission" element={<QueueAdmission />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
