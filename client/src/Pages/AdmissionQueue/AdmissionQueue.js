import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
function AdmissionQueue() {
  // initializing the states

  const [state, setState] = useState();

  //getRequestToday of the admission
  const getRequest = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/requestAdminTodayA`)
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
        <h1>Admission Real-Time Queue </h1>
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
                    {request.StudentID ? request.StudentID : "Non Student"}
                  </h1>
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

export default AdmissionQueue;
