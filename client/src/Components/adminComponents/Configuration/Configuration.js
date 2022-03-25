import React, { useState, useEffect, useRef } from "react";
import "./configuration.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";
function Configuration() {
  const [courses, setCourses] = useState();
  const [course, setCourse] = useState("");
  const [request, setRequest] = useState("");
  const [requestList, setRequestList] = useState();
  const [toEdit, setToEdit] = useState({ value: "", state: "", id: "" });
  const modal = useRef();
  // toggle State
  const [toggle, setToggle] = useState({
    addC: false,
    addR: false,
    edit: false
  });

  //getCourse
  const getCourse = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getCourse`)
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        alert("There was an error fetching courses");
        console.log(err);
      });
  };

  //getRequestList
  const getRequestList = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequestList`)
      .then((res) => {
        console.log(res.data);
        setRequestList(res.data);
      })
      .catch((err) => {
        alert(
          "There was an error fetching RequestList kindly reload the website"
        );
        console.log(err);
      });
  };
  //deleteCourse
  const deleteCourse = (id) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/deleteCourse`, { data: id })
      .then((res) => {
        getCourse();
      })
      .catch((err) => {
        alert("There was an error fetching courses kindly reload the website");
        console.log(err);
      });
  };

  //deleteCourse
  const deleteRequestList = (id) => {
    axios
      .post(`${process.env.REACT_APP_KEY}/deleteRequestList`, { data: id })
      .then((res) => {
        getRequestList();
      })
      .catch((err) => {
        alert(
          "There was an error fetching RequestList kindly reload the website"
        );
        console.log(err);
      });
  };

  //onStart
  useEffect(() => {
    getCourse();
    getRequestList();
  }, []);

  // Add Request List Modal

  const addRequest = () => {
    modal.current.style.display = "block";
    setToggle({
      addC: false,
      addR: true,
      edit: false
    });
  };

  // Add Course List Modal

  const addCourse = () => {
    modal.current.style.display = "block";
    setToggle({
      addC: true,
      addR: false,
      edit: false
    });
  };
  // Add Request List Modal

  const edit = (id, boolean) => {
    modal.current.style.display = "block";
    setToggle({
      addC: false,
      addR: false,
      edit: true
    });
    if (boolean) {
      // edit course
      setToEdit({ value: id.Course, state: "course", id: id._id });
    } else {
      //edit request
      setToEdit({ value: id.Request, state: "request", id: id._id });
    }
  };
  // Submit
  const submit = () => {
    if (toggle.addC) {
      axios
        .post(`${process.env.REACT_APP_KEY}/insertCourse`, { course })
        .then((res) => {
          alert(res.data);

          setCourse("");
        })
        .catch((err) => {
          alert("There was an error please try again.");
          console.log(err);
        });
    } else if (toggle.addR) {
      axios
        .post(`${process.env.REACT_APP_KEY}/insertRequestList`, { request })
        .then((res) => {
          alert(res.data);
          getRequestList();
          setRequest("");
          modal.current.style.display = "none";
        })
        .catch((err) => {
          alert("There was an error please try again.");
          console.log(err);
        });
    } else if (toggle.edit) {
      if (toEdit.state == "course") {
        axios
          .post(`${process.env.REACT_APP_KEY}/editCourse`, toEdit)
          .then((res) => {
            alert(res.data);
            getCourse();
            modal.current.style.display = "none";
          })
          .catch((err) => {
            alert("There was an error please try again.");
            console.log(err);
          });
      } else {
        axios
          .post(`${process.env.REACT_APP_KEY}/editRequestList`, toEdit)
          .then((res) => {
            alert(res.data);
            getRequestList();
            modal.current.style.display = "none";
          })
          .catch((err) => {
            alert("There was an error please try again.");
            console.log(err);
          });
      }
    }
  };
  return (
    <div>
      <div className="h-20 bg-green-600 flex items-center p-3">
        <h2 className="text-2xl font-bold text-white">Configuration</h2>
      </div>

      {/* Course */}

      <section className="sectionSpace">
        <div className="headerCourse">
          <h2>Course List</h2>
          <div
            className="outlineBtnCourse"
            onClick={() => {
              addCourse();
            }}
          >
            <AiOutlinePlus />
            <h4>Add Course</h4>
          </div>
        </div>
        <div className="tableCourse">
          <table className="tableStyle">
            <thead>
              <tr>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses
                ? courses.map((c) => {
                    return (
                      <tr>
                        <td>{c.Course}</td>
                        <td>
                          <div className="btnGroup">
                            <div
                              onClick={() => {
                                edit(c, true);
                              }}
                            >
                              <FiEdit />
                              <h3>Edit</h3>
                            </div>
                            <div
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete the course"
                                  )
                                ) {
                                  deleteCourse(c._id);
                                } else {
                                }
                              }}
                            >
                              <FiTrash2 />
                              <h3>Remove</h3>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </section>

      {/* Request List */}

      <section className="sectionSpace">
        <div className="headerCourse">
          <h2>Request List</h2>
          <div
            className="outlineBtnCourse"
            onClick={() => {
              addRequest();
            }}
          >
            <AiOutlinePlus />
            <h4>Add Request</h4>
          </div>
        </div>
        <div className="tableCourse">
          <table className="tableStyle">
            <thead>
              <tr>
                <th>Request</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requestList &&
                requestList.map((rl) => {
                  return (
                    <tr>
                      <td>{rl.Request}</td>
                      <td>
                        <div className="btnGroup">
                          <div
                            onClick={() => {
                              edit(rl, false);
                            }}
                          >
                            <FiEdit />
                            <h3>Edit</h3>
                          </div>
                          <div
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete the Request"
                                )
                              ) {
                                deleteRequestList(rl._id);
                              } else {
                              }
                            }}
                          >
                            <FiTrash2 />
                            <h3>Remove</h3>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL */}

      <div className="modalz" ref={modal}>
        <div className="modalz-content">
          <div className="modalz-header">
            <h4
              className="closeBtnz"
              onClick={() => {
                modal.current.style.display = "none";
              }}
            >
              &times;
            </h4>

            {toggle.addC ? (
              <h3>Add Course</h3>
            ) : toggle.addR ? (
              <h3>Add Request</h3>
            ) : toggle.edit ? (
              <h3>Edit</h3>
            ) : null}
          </div>
          <div className="modalz-body">
            {toggle.addC ? (
              <div className="contentForCourse">
                <input
                  type="text"
                  name=""
                  id=""
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                />
              </div>
            ) : toggle.addR ? (
              <div className="contentForRequest">
                <input
                  type="text"
                  name=""
                  id=""
                  value={request}
                  onChange={(e) => {
                    setRequest(e.target.value);
                  }}
                />
              </div>
            ) : toggle.edit ? (
              <div className="contentForEdit">
                <input
                  type="text"
                  name=""
                  id=""
                  value={toEdit.value}
                  onChange={(e) => {
                    setToEdit((prev) => {
                      return { ...prev, value: e.target.value };
                    });
                  }}
                />
              </div>
            ) : null}
            <div
              className="btnGreen"
              onClick={() => {
                submit();
              }}
            >
              <h3>Submit</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuration;
