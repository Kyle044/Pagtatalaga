import React from "react";
import AppForm from "../../AppointmentForm/AppForm";
function AddAppointment({ admin }) {
  return (
    <div>
      <div className="h-20 bg-green-600 flex items-center p-3">
        <h2 className="text-2xl font-bold text-white">Add Appointment</h2>
      </div>

      <AppForm admin={admin} />
    </div>
  );
}

export default AddAppointment;
