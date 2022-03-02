import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./appform.css";
function AppForm() {
  const initialState = {
    Date: "",
    Time: []
  };

  const [state, setState] = useState(initialState);
  const [time, setTime] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleAddTime = () => {
    setState((prev) => {
      return { ...prev, Time: [...prev.Time, { Student: "", Time: time }] };
    });
    setTime("");
  };
  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_KEY}/insertApp`, state)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="masterAppform">
      <div className="w-6/12 h-96 flex flex-col justify-evenly p-4 border-2 shadow rounded bg-slate-200">
        <label>Date</label>
        <input
          type="date"
          name="Date"
          id=""
          value={state.Date}
          onChange={handleChange}
        />
        <label>Time</label>
        <input
          type="time"
          onChange={(e) => {
            setTime(e.target.value);
          }}
          value={time}
        />
        <div className="btnflex">
          <button
            className="btnGreen"
            onClick={() => {
              handleAddTime();
            }}
          >
            Add Time
          </button>
          <button
            className="btnGreen ml-4"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="bg-slate-200 w-6/12 h-96 flex items-center justify-center flex-col">
        <h4 className="font-bold mb-4 text-lg">
          {state.Date ? moment(state.Date).format("LL") : "Empty"}
        </h4>
        <ul>
          {state.Time.map((t) => {
            return (
              <li className="bg-green-600 w-32 text-center p-2 rounded-md font-bold mb-4">
                {moment(t.Time, "hh:mm").format("LT")}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AppForm;
