import React, { useState, useEffect, useRef } from "react";
import "./configuration.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Configuration() {
  const [course, setCourse] = useState("");
  const [request, setRequest] = useState("");
  const [toEdit, setToEdit] = useState("");
  const modal = useRef();

  const [toggle, setToggle] = useState({
    addC: false,
    addR: false,
    edit: false
  });

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

  const edit = (id) => {
    modal.current.style.display = "block";
    setToggle({
      addC: false,
      addR: false,
      edit: true
    });
  };
  // Submit
  const submit = () => {
    if (toggle.addC) {
      alert(course);
    } else if (toggle.addR) {
      alert(request);
    } else if (toggle.edit) {
      alert(toEdit);
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
              <tr>
                <td>BS Computer Engineering</td>
                <td>
                  <div className="btnGroup">
                    <div
                      onClick={() => {
                        edit(1);
                      }}
                    >
                      <FiEdit />
                      <h3>Edit</h3>
                    </div>
                    <div>
                      <FiTrash2 />
                      <h3>Remove</h3>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>BS Information Technology</td>
                <td>
                  <div className="btnGroup">
                    <div>
                      <FiEdit />
                      <h3>Edit</h3>
                    </div>
                    <div>
                      <FiTrash2 />
                      <h3>Remove</h3>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>BS Computer Science</td>
                <td>
                  <div className="btnGroup">
                    <div>
                      <FiEdit />
                      <h3>Edit</h3>
                    </div>
                    <div>
                      <FiTrash2 />
                      <h3>Remove</h3>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>BS Office Manager</td>
                <td>
                  <div className="btnGroup">
                    <div>
                      <FiEdit />
                      <h3>Edit</h3>
                    </div>
                    <div>
                      <FiTrash2 />
                      <h3>Remove</h3>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Request List */}

      <section className="sectionSpace">
        <div className="headerCourse">
          <h2>Registrar Request List</h2>
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
              <tr>
                <td>Transcript of Records</td>
                <td>
                  <div className="btnGroup">
                    <div
                      onClick={() => {
                        edit(1);
                      }}
                    >
                      <FiEdit />
                      <h3>Edit</h3>
                    </div>
                    <div>
                      <FiTrash2 />
                      <h3>Remove</h3>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Transfer Credentials</td>
                <td>
                  <div className="btnGroup">
                    <div>
                      <FiEdit />
                      <h3>Edit</h3>
                    </div>
                    <div>
                      <FiTrash2 />
                      <h3>Remove</h3>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Certification of Grades</td>
                <td>
                  <div className="btnGroup">
                    <div>
                      <FiEdit />
                      <h3>Edit</h3>
                    </div>
                    <div>
                      <FiTrash2 />
                      <h3>Remove</h3>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Certification of Graduation</td>
                <td>
                  <div className="btnGroup">
                    <div>
                      <FiEdit />
                      <h3>Edit</h3>
                    </div>
                    <div>
                      <FiTrash2 />
                      <h3>Remove</h3>
                    </div>
                  </div>
                </td>
              </tr>
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
                  value={toEdit}
                  onChange={(e) => {
                    setToEdit(e.target.value);
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
