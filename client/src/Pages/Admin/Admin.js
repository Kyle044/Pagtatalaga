import React, { useState, useEffect } from "react";
import AppointmentForm from "../../Components/AppointmentForm/AppForm";
import "./admin.css";
import LeftBar from "../../Components/adminComponents/leftBar/LeftBar";
import Appointment from "../../Components/adminComponents/Appointment/Appointment";
import Dashboard from "../../Components/adminComponents/Dashboard/Dashboard";
import Configuration from "../../Components/adminComponents/Configuration/Configuration";
import AddAppointment from "../../Components/adminComponents/Appointment/AddAppointment";
import EditAppointment from "../../Components/adminComponents/Appointment/EditAppointment";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Admin() {
  const [admin, setAdmin] = useState(null);
  let navigate = useNavigate();
  const [toggle, setToggle] = useState({
    Dashboard: true,
    Appointment: false,
    Configuration: false,
    Add: false,
    Edit: false
  });

  const getAdmin = (token) => {
    axios
      .get(`${process.env.REACT_APP_KEY}/protected`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then((res) => {
        setAdmin(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    var token = localStorage.getItem("token");
    getAdmin(token);

    if (token) {
    } else {
      navigate("/portal");
    }
  }, []);
  return (
    <div className="masterAdmin">
      <div className="leftBar">
        <LeftBar
          toggle={toggle}
          setToggle={setToggle}
          admin={admin}
          setAdmin={setAdmin}
        />
      </div>

      <div className="rightBar">
        {admin ? (
          <div className="meron">
            {toggle.Dashboard ? (
              <Dashboard admin={admin} setAdmin={setAdmin} />
            ) : null}

            {toggle.Appointment ? (
              <Appointment admin={admin} setAdmin={setAdmin} />
            ) : null}

            {toggle.Configuration ? (
              <Configuration admin={admin} setAdmin={setAdmin} />
            ) : null}
            {toggle.Add ? (
              <AddAppointment admin={admin} setAdmin={setAdmin} />
            ) : null}
            {toggle.Edit ? (
              <EditAppointment admin={admin} setAdmin={setAdmin} />
            ) : null}
          </div>
        ) : (
          <div className="bg-white h-full w-full flex items-center justify-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
