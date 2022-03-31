import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiViewGridAdd } from "react-icons/hi";
import moment from "moment";
import Modal from "@mui/material/Modal";
function Appointment({ admin }) {
  const [appointment, setAppointment] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState({
    Date: "",
    Office: "",
    Time: [],
    _id: ""
  });
  const [time, setTime] = useState();
  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;

    setSelectedApp((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    if (admin.Authentication == "registrar") {
      axios
        .get(`${process.env.REACT_APP_KEY}/getAppReg`)
        .then((res) => {
          setAppointment(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`${process.env.REACT_APP_KEY}/getAppAdmin`)
        .then((res) => {
          setAppointment(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          if (admin.Authentication == "registrar") {
            axios
              .get(`${process.env.REACT_APP_KEY}/getAppReg`)
              .then((res) => {
                setAppointment(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            axios
              .get(`${process.env.REACT_APP_KEY}/getAppAdmin`)
              .then((res) => {
                setAppointment(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
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
    if (
      window.confirm(
        "Note that if you delete the time the request will be deleted also"
      )
    ) {
      axios
        .post(`${process.env.REACT_APP_KEY}/deleteTime`, time)
        .then((res) => {
          if (res.data == "Successfully Deleted") {
            setSelectedApp((prev) => {
              return {
                ...prev,
                Time: prev.Time.filter((e) => {
                  return e != time;
                })
              };
            });
          } else {
            console.log("There was an error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
  const submitEditedAppointment = (id) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/editApp`, selectedApp)
      .then((res) => {
        alert(res.data);
        if (admin.Authentication == "registrar") {
          axios
            .get(`${process.env.REACT_APP_KEY}/getAppReg`)
            .then((res) => {
              setAppointment(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          axios
            .get(`${process.env.REACT_APP_KEY}/getAppAdmin`)
            .then((res) => {
              setAppointment(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddTime = () => {
    if (time) {
      var value;
      if (time.substring(0, 1) == 0) {
        value = time.substring(1, 2);
      } else {
        value = time.substring(0, 2);
      }
      if (value > 6 && value < 18) {
        var newArray = selectedApp.Time.concat({
          Time: time,
          Request: { Status: "Pending" }
        });
        setSelectedApp((prev) => {
          return { ...prev, Time: newArray };
        });
        setTime("");
      } else {
        alert("Please enter a valid time");
      }
    } else {
      alert("Please input a time");
    }
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
          <div
            className="bg-gray-300 h-full flex items-center justify-evenly
          "
          >
            {selectedApp && (
              <div className="w-4/6 m-auto h-full flex flex-col justify-evenly p-12">
                <label>Date : {moment(selectedApp.Date).format("LL")}</label>
                <input
                  type="date"
                  value={selectedApp.Date}
                  name="Date"
                  onChange={handleAppointmentChange}
                />
                <label>Add Time</label>
                <input
                  type="time"
                  value={time}
                  name="time"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />

                <div
                  className="btnGreen"
                  onClick={() => {
                    AddTime();
                  }}
                >
                  Add Time
                </div>

                <label className="my-4">Time</label>
                <ul>
                  {selectedApp.Time.map((time) => {
                    return (
                      <li className="flex w-full  m-1 items-center justify-between p-2">
                        <h4 className="font-bold">
                          {time.Request.Name &&
                            `Booked by ${time.Request.Name} at `}
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
                      submitEditedAppointment(selectedApp._id);
                    }}
                  >
                    Submit
                  </div>
                  <div
                    onClick={() => {
                      setModal(false);
                    }}
                    className="cursor-pointer bg-red-600 p-2 mt-4 mb-2 shadow-lg h-11 text-slate-100 rounded-md flex items-center justify-center"
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
