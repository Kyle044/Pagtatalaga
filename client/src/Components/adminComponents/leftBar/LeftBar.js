import React, { useState } from "react";
import { RiDashboardFill, RiLogoutCircleRLine } from "react-icons/ri";
import { DiAptana } from "react-icons/di";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import "./leftbar.css";
function LeftBar({ setToggle, toggle, admin, setAdmin }) {
  let navigate = useNavigate();
  const clickDash = () => {
    setToggle({
      Dashboard: true,
      Appointment: false,
      Configuration: false,
      Add: false,
      Edit: false
    });
  };

  const [drop, setDrop] = useState({ app: false });

  const clickApp = () => {
    setToggle({
      Dashboard: false,
      Appointment: true,
      Configuration: false,
      Add: false,
      Edit: false
    });
  };
  const clickConfig = () => {
    setToggle({
      Dashboard: false,
      Appointment: false,
      Configuration: true,
      Add: false,
      Edit: false
    });
  };
  const clickAdd = () => {
    setToggle({
      Dashboard: false,
      Appointment: false,
      Configuration: false,
      Add: true,
      Edit: false
    });
  };
  const clickEdit = () => {
    setToggle({
      Dashboard: false,
      Appointment: false,
      Configuration: false,
      Add: false,
      Edit: true
    });
  };

  const clickLogOut = () => {
    if (window.confirm("Are you sure you want to log-out?")) {
      localStorage.removeItem("token");
      navigate("/portal");
    } else {
    }
  };
  return (
    <div className="masterLeftBar">
      <h4 className="adname capitalize text-white font-bold">
        {admin ? admin.Authentication : "Invalid Access"}
      </h4>

      <ul>
        <li>
          <div
            className="linkcard"
            onClick={() => {
              clickDash();
              setDrop((prev) => {
                return { ...prev, app: false };
              });
            }}
          >
            <RiDashboardFill />
            <h4>Dashboard</h4>
          </div>
        </li>
        <li>
          <div
            className="group cursor-pointer transition hover:bg-slate-900 p-4 "
            onClick={() => {
              setDrop((prev) => {
                return { ...prev, app: !prev.app };
              });
            }}
          >
            <h4 className="flex w-fit m-auto   items-center justify-center font-bold text-white ">
              <BsFillCalendar2CheckFill className="mr-4 group-hover:text-white " />{" "}
              Appointment
            </h4>
          </div>
          <div
            className={
              drop.app ? "transition-all h-auto bg-slate-100 py-2   " : "hidden"
            }
          >
            <h4
              onClick={() => {
                clickApp();
              }}
              className=" font-bold cursor-pointer pl-16 pt-4 pb-4 text-sm w-full hover:bg-green-200"
            >
              View Appointment
            </h4>
            <h4
              onClick={() => {
                clickAdd();
              }}
              className=" font-bold cursor-pointer pl-16 pt-4 pb-4 text-sm w-full hover:bg-green-200"
            >
              Add Appointment
            </h4>
            <h4
              onClick={() => {
                clickEdit();
              }}
              className="font-bold  cursor-pointer pl-16 pt-4 pb-4 text-sm w-full hover:bg-green-200"
            >
              Edit Appointment
            </h4>
          </div>
        </li>
        <li>
          <div
            className="linkcard"
            onClick={() => {
              clickConfig();
              setDrop((prev) => {
                return { ...prev, app: false };
              });
            }}
          >
            <DiAptana />
            <h4>Configuration</h4>
          </div>
        </li>
        <li>
          <li>
            <div
              className="linkcard"
              onClick={() => {
                clickLogOut();
              }}
            >
              <RiLogoutCircleRLine />
              <h4>Log-out</h4>
            </div>
          </li>
        </li>
      </ul>
    </div>
  );
}

export default LeftBar;
