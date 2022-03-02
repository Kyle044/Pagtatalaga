import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiViewGridAdd } from "react-icons/hi";
import moment from "moment";
import Modal from "@mui/material/Modal";
function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState();
  const [editAppointment, setEditAppointment] = useState({
    id: "",
    date: "",
    time: []
  });
  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;

    setEditAppointment((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getApp`)
      .then((res) => {
        console.log(res.data[0].Time[0]);
        setAppointment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditAppointment = (app) => {
    setSelectedApp(app);
    setModal(true);
    console.log(app);
  };

  const handleDeleteAppointment = (app) => {
    if (window.confirm("Are you sure you want to delete the appointment?")) {
      axios
        .delete(`${process.env.REACT_APP_KEY}/deleteApp`, { data: app })
        .then((res) => {
          axios
            .get(`${process.env.REACT_APP_KEY}/getApp`)
            .then((res) => {
              setAppointment(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
  const handleClose = () => {
    setModal(false);
  };

  const handleDeleteTime = (time) => {
    console.log(time);
  };
  return (
    <div>
      <div className="h-20 bg-green-600 flex items-center p-3">
        <h2 className="text-2xl font-bold text-white">Appointment</h2>
      </div>
      <div className="flex  container shadow-md justify-evenly h-16 items-center ">
        <h4 className="font-bold translate-x-0">Time</h4>{" "}
        <h4 className="font-bold translate-x-5">Date</h4>{" "}
        <h4 className="font-bold translate-x-4">Option</h4>
      </div>
      <div className="container flex flex-col   ">
        {appointment
          ? appointment.map((app) => {
              return (
                <div className="w-full  flex justify-evenly h-auto p-4 my-2 items-center  border-8 border-l-red-800">
                  <ul>
                    {app.Time.map((t) => {
                      return (
                        <li className="font-bold">
                          {moment(t.Time, "hh:mm").format("LT")}
                        </li>
                      );
                    })}
                  </ul>
                  <h4 className="font-bold ">
                    {moment(app.Date).format("LL")}
                  </h4>{" "}
                  <h4 className="font-bold flex w-9">
                    <div
                      onClick={() => {
                        handleEditAppointment(app);
                      }}
                      className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 "
                    >
                      Edit
                    </div>
                    <div
                      onClick={() => {
                        handleDeleteAppointment(app);
                      }}
                      className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-red-600 font-bold  text-white hover:bg-red-400 "
                    >
                      Delete
                    </div>
                  </h4>
                </div>
              );
            })
          : null}

        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="m-auto w-3/5 h-3/5 mt-28 bg-slate-300 p-4 rounded-lg">
            {selectedApp && (
              <div className="w-4/6 m-auto">
                <label>Date : {moment(selectedApp.Date).format("LL")}</label>
                <input
                  type="date"
                  value={editAppointment.date}
                  name="date"
                  onChange={handleAppointmentChange}
                />
                <label>Time</label>
                <ul>
                  {selectedApp.Time.map((time) => {
                    return (
                      <li className="flex w-full  m-1 items-center justify-evenly p-2">
                        <h4 className="font-bold">
                          {moment(time.Time, "hh:mm").format("LT")}
                        </h4>{" "}
                        <div
                          onClick={() => {
                            handleDeleteTime(time);
                          }}
                          className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-red-600 font-bold  text-white hover:bg-red-400 "
                        >
                          Delete
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex m-auto w-3/5 items-center justify-evenly">
                  <div
                    className="btnGreen"
                    onClick={() => {
                      console.log(editAppointment);
                    }}
                  >
                    Submit
                  </div>
                  <div
                    onClick={() => {
                      setModal(false);
                    }}
                    className="cursor-pointer bg-red-600 p-2 mt-4 shadow-lg h-12 text-slate-100 rounded-md flex items-center justify-center"
                  >
                    Cancel
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Appointment;
