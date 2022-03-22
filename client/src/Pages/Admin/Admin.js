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

  const [count, setCount] = useState({
    totalRequest: "",
    totalAppointment: "",
    totalAppNow: ""
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
        if (res.data.Username == "registrar") {
          getRequestCountReg();
          getAppointmentCountReg();
          getTodayAppointmentReg();
        } else {
          getRequestCountAdmin();
          getAppointmentCountAdmin();
          getTodayAppointmentAdmin();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTodayAppointmentReg = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAppTodayReg`)
      .then((res) => {
        setCount((prev) => {
          return { ...prev, totalAppNow: res.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTodayAppointmentAdmin = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAppTodayAdmin`)
      .then((res) => {
        setCount((prev) => {
          return { ...prev, totalAppNow: res.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRequestCountAdmin = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequestCountAdmin`)
      .then((res) => {
        setCount((prev) => {
          return { ...prev, totalRequest: res.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRequestCountReg = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequestCountReg`)
      .then((res) => {
        setCount((prev) => {
          return { ...prev, totalRequest: res.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAppointmentCountReg = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAppCountReg`)
      .then((res) => {
        setCount((prev) => {
          return { ...prev, totalAppointment: res.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAppointmentCountAdmin = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAppCountAdmin`)
      .then((res) => {
        setCount((prev) => {
          return { ...prev, totalAppointment: res.data };
        });
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
              <Dashboard
                admin={admin}
                setAdmin={setAdmin}
                totalRequest={count.totalRequest}
                totalAppointment={count.totalAppointment}
                today={count.totalAppNow}
              />
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
