import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import Modal from "@mui/material/Modal";
import QRCode from "qrcode";
function Dashboard({ admin, setAdmin }) {
  const [adminssion, setAdminssion] = useState([]);
  const [src, setSrc] = useState({ src: "", data: "" });
  const [student, setStudent] = useState([]);
  const [open, setOpen] = React.useState(false);
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
    var data = `Student# : ${req.StudentID}
     Name : ${req.Name}
     Age: ${req.Age}
     Purpose : ${req.Purpose.map((p) => {
       return p;
     })} 
    Date&Time Appointment : ${req.Appointment.date}||${req.Appointment.time}
    Request For the Office of ${req.Office}`;

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
  }, []);

  const handleSendEmail = (student) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/sendQr`, { data: src })
      .then((res) => {
        alert(res.data);
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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
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
            <h4>1500</h4>
            <div className="content">
              <h4>Total Request</h4>
            </div>
          </div>
          <div className="todayAppointment shadow-lg">
            <h4>1500</h4>
            <div className="content">
              <h4>Today Appointment</h4>
            </div>
          </div>
          <div className="appointment shadow-lg">
            <h4>1500</h4>
            <div className="content">
              <h4>Total Appointment</h4>
            </div>
          </div>
        </div>

        <h4 className="title">Student Request</h4>
        <div className="w-11/12 m-auto p-3 flex items-center">
          <div
            onClick={() => {
              console.log(admin.Authentication);
            }}
            className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 "
          >
            All Request
          </div>
          <div className="border w-fit p-2 rounded-3xl duration-200 mr-1 cursor-pointer text-xs bg-green-600 font-bold  text-white hover:bg-green-400 ">
            Request Today
          </div>
        </div>
        <div className="tableDiv">
          <table class="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Student #
                </th>
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
                            Accept
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
                            Accept
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
