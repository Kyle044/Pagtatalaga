import React, { useEffect, useState } from "react";
import "./registrarqueue.css";
import axios from "axios";
import moment from "moment";
function RegistrarQueue() {
  // initializing the states

  const [state, setState] = useState();

  //getRequestToday of the registrar
  const getRequest = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/requestTodayA`)
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        alert(
          "There was an error fetching the data kindly restart the browser"
        );
        console.log(err);
      });
  };

  useEffect(() => {
    setInterval(() => {
      getRequest();
    }, 3000);
  }, []);

  return (
    <div>
      <div className="dashRegistrarQueue">
        <h1>Registrar Real-Time Queue </h1>
      </div>

      {state && (
        <ul className="queuelist">
          {state.length === 0 ? (
            <h1>Empty</h1>
          ) : (
            state.map((request) => {
              return (
                <li key={request._id} className="lest">
                  <h1>Queue # : {request.QueueNumber}</h1>
                  <h1>{request.Name}</h1>

                  <h1>
                    {moment(request.Appointment.time, "hh:mm").format("LT")}
                  </h1>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}

export default RegistrarQueue;
