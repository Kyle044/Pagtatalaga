import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import Modal from "@mui/material/Modal";
import QRCode from "qrcode";
function Dashboard({ admin, setAdmin, totalRequest, totalAppointment, today }) {
  const [adminssion, setAdminssion] = useState([]);
  const [src, setSrc] = useState({ src: "", data: "" });
  const [student, setStudent] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [toggle, setToggle] = useState(false);
  // accepted request =====

  const [registrarAcceptedRequest, setRegistrarAcceptedRequest] = useState();
  const [admissionAcceptedRequest, setAdmissionAcceptedRequest] = useState();

  const getRegistrarAcceptedRequest = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getEmailedRegistrar`)
      .then((res) => {
        setRegistrarAcceptedRequest(res.data);
      });
  };

  const getAdmissionAcceptedRequest = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getEmailedAdminssion`)
      .then((res) => {
        setAdmissionAcceptedRequest(res.data);
      });
  };

  var encrypt = (str) => {
    let resultArray = [];
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i) + 2;
      while (code > 122) {
        code = code - 122 + 96;
      }
      resultArray.push(String.fromCharCode(code));
    }
    return resultArray.join("");
  };
  var decrypt = (str) => {
    let resultArray = [];
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i) - 2;
      while (code > 122) {
        code = code - 122 + 96;
      }
      resultArray.push(String.fromCharCode(code));
    }
    return resultArray.join("");
  };
  const handleOpen = (req) => {
    var data = req._id;

    console.log(encrypt(data));
    console.log(decrypt(encrypt(data)));
    setOpen(true);
    QRCode.toDataURL(data)
      .then((url) => {
        setSrc({ src: url, data: data, request: req });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRequestCount = () => {};

  const handleClose = () => setOpen(false);
  const getStudent = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getStudentRequest`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdmission = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getAdminssiontRequest`)
      .then((res) => {
        setAdminssion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudent();
    getAdmission();
    getRegistrarAcceptedRequest();
    getAdmissionAcceptedRequest();
    // setInterval(() => {
    //   if (toggle) {
    //     requestAdminTodayA();
    //     requestTodayA();
    //     requestToday();
    //     requestAdminToday();
    //   } else {
    //     getStudent();
    //     getAdmission();
    //     getRegistrarAcceptedRequest();
    //     getAdmissionAcceptedRequest();
    //   }
    // }, 3000);
  }, []);

  const handleSendEmail = (student) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/sendQr`, { data: src })
      .then((res) => {
        alert(res.data);
        getStudent();
        getAdmission();
        getRegistrarAcceptedRequest();
        getAdmissionAcceptedRequest();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = (student) => {
    if (window.confirm("Are you sure you want to reject the request")) {
      axios
        .post(`${process.env.REACT_APP_KEY}/rejectRequest`, student)
        .then((res) => {
          alert(res.data);
          getStudent();
          getAdmission();
          getRegistrarAcceptedRequest();
          getAdmissionAcceptedRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
  const requestToday = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/requestToday`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requestAdminToday = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/requestAdminToday`)
      .then((res) => {
        setAdminssion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requestTodayA = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/requestTodayA`)
      .then((res) => {
        setRegistrarAcceptedRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requestAdminTodayA = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/requestAdminTodayA`)
      .then((res) => {
        setAdmissionAcceptedRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4
  };

  return (
    <div>
      <div>
        <div className="h-20 bg-green-600 flex items-center p-3">
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        </div>
        <div className="statDiv">
          <div className="totalRequest shadow-lg ">
            <h4>{totalRequest ? totalRequest : 0}</h4>
            <div className="content">
              <h4>Total Request</h4>
            </div>
          </div>
          <div className="todayAppointment shadow-lg">
            <h4>{today ? today : 0}</h4>
            <div className="content">
              <h4>Today Appointment</h4>
            </div>
          </div>
          <div className="appointment shadow-lg">
            <h4>{totalAppointment ? totalAppointment : 0}</h4>
            <div className="content">
              <h4>Total Appointment</h4>
            </div>
          </div>
        </div>
        {/* PENDING REQUEST ======================================================= */}
        <h4 className="title">Student Request</h4>
        <div className="w-11/12 m-auto p-3 flex items-center">
          <div
            onClick={() => {
              if (admin.Authentication == "registrar") {
                getStudent();
              } else {
                getAdmission();
              }
            }}
            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 "
          >
            All Request
          </div>
          <div
            onClick={() => {
              if (admin.Authentication == "registrar") {
                requestToday();
                console.log(student);
              } else {
                requestAdminToday();
                console.log(adminssion);
              }
            }}
            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 "
          >
            Request Today
          </div>
        </div>
        <div className="tableDiv">
          <table class="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                {admin.Authentication == "registrar" ? (
                  <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Student #
                  </th>
                ) : null}

                <th class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Name
                </th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Age
                </th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Appointment
                </th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Purpose
                </th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Option
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
              {admin.Authentication == "registrar"
                ? student &&
                  student.map((stud) => {
                    return (
                      <tr>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                          {stud.StudentID}
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                          {stud.Name}
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          {stud.Age}
                        </td>
                        <td class="border-b flex flex-col justify-center border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          <h5> {stud.Appointment.date}</h5>
                          <h5> {stud.Appointment.time}</h5>
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          {stud.Purpose.map((p) => {
                            return <h4>{p}</h4>;
                          })}
                        </td>
                        <td class="flex  items-center border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          <div
                            onClick={() => {
                              handleOpen(stud);
                            }}
                            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 "
                          >
                            Send QR
                          </div>
                          <div
                            onClick={() => {
                              handleReject(stud);
                            }}
                            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-red-600 font-bold  text-white hover:bg-red-400 "
                          >
                            Reject
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : adminssion.map((stud) => {
                    return (
                      <tr>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                          {stud.Name}
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          {stud.Age}
                        </td>
                        <td class="border-b flex flex-col justify-center border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          <h5> {stud.Appointment.date}</h5>
                          <h5> {stud.Appointment.time}</h5>
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          {stud.Purpose.map((p) => {
                            return <h4>{p}</h4>;
                          })}
                        </td>
                        <td class="flex  items-center border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          <div
                            onClick={() => {
                              handleOpen(stud);
                            }}
                            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 "
                          >
                            Send QR
                          </div>
                          <div
                            onClick={() => {
                              handleReject(stud);
                            }}
                            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-red-600 font-bold  text-white hover:bg-red-400 "
                          >
                            Reject
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        {/* ACCEPTED REQUEST ======================================================= */}
        <h4 className="title mt-5">Accepted Requests</h4>
        <div className="w-11/12 m-auto p-3 flex items-center">
          <div
            onClick={() => {
              if (admin.Authentication == "registrar") {
                getRegistrarAcceptedRequest();
              } else {
                getAdmissionAcceptedRequest();
              }
            }}
            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 "
          >
            All Request
          </div>
          <div
            onClick={() => {
              if (admin.Authentication == "registrar") {
                requestTodayA();
                console.log(student);
              } else {
                requestAdminTodayA();
                console.log(adminssion);
              }
            }}
            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 "
          >
            Request Today
          </div>
        </div>
        <div className="tableDiv">
          <table class="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                {admin.Authentication == "registrar" ? (
                  <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Student #
                  </th>
                ) : null}

                <th class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Name
                </th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Age
                </th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Appointment
                </th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Purpose
                </th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Option
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
              {admin.Authentication == "registrar"
                ? registrarAcceptedRequest &&
                  registrarAcceptedRequest.map((stud) => {
                    return (
                      <tr>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                          {stud.StudentID}
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                          {stud.Name}
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          {stud.Age}
                        </td>
                        <td class="border-b flex flex-col justify-center border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          <h5> {stud.Appointment.date}</h5>
                          <h5> {stud.Appointment.time}</h5>
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          {stud.Purpose.map((p) => {
                            return <h4>{p}</h4>;
                          })}
                        </td>
                        <td class="flex  items-center border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          <div
                            onClick={() => {
                              handleReject(stud);
                            }}
                            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-red-600 font-bold  text-white hover:bg-red-400 "
                          >
                            Reject
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : admissionAcceptedRequest &&
                  admissionAcceptedRequest.map((stud) => {
                    return (
                      <tr>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                          {stud.Name}
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          {stud.Age}
                        </td>
                        <td class="border-b flex flex-col justify-center border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          <h5> {stud.Appointment.date}</h5>
                          <h5> {stud.Appointment.time}</h5>
                        </td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          {stud.Purpose.map((p) => {
                            return <h4>{p}</h4>;
                          })}
                        </td>
                        <td class="flex  items-center border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                          <div
                            onClick={() => {
                              handleReject(stud);
                            }}
                            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-red-600 font-bold  text-white hover:bg-red-400 "
                          >
                            Reject
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={style} className="h-auto bg-green-700 rounded-sm p-8">
            <img src={src.src} alt="" className="h-full" />
            <div className="flex items-center justify-evenly h-20 ">
              <div
                className="btnGreen"
                onClick={() => {
                  handleSendEmail();
                }}
              >
                Send
              </div>
              <div
                onClick={() => {
                  handleClose();
                }}
                className="cursor-pointer bg-red-600 p-2 mt-4 shadow-lg h-12 text-slate-100 rounded-md flex items-center justify-center"
              >
                Cancel
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Dashboard;
