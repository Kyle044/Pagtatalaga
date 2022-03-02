import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./portal.css";
function Portal() {
  let navigate = useNavigate();
  const initialState = {
    Username: "",
    Password: ""
  };
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_KEY}/login`, state)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="masterPortal bgGreen">
      <div className="w-3/12 bg-slate-300 p-4 rounded-md flex ">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Username</label>
          <input
            type="text"
            onChange={handleChange}
            name="Username"
            value={state.Username}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="Password"
            value={state.Password}
          />
          <button className="btnGreen" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Portal;
