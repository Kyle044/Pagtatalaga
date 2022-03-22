const { listenerCount } = require("../model/Appointment");
let Appointment = require("../model/Appointment");
let Request = require("../model/Request");
const moment = require("moment");
exports.insertAppointment = (req, res) => {
  var newApp = new Appointment(req.body);
  newApp
    .save()
    .then((data) => {
      res.json("Success");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAppointment = (req, res) => {
  Appointment.find()
    .then((appointment) => {
      res.json(appointment);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAppointmentCountReg = (req, res) => {
  Appointment.count({ Office: "Registrar" }).then((count) => {
    res.json(count);
  });
};
exports.getAppointmentCountAdmin = (req, res) => {
  Appointment.count({ Office: "Admission" }).then((count) => {
    res.json(count);
  });
};

exports.getAppointmentReg = (req, res) => {
  Appointment.find({ Office: "Registrar" }).then((app) => {
    res.json(app);
  });
};
exports.getAppointmentAdmin = (req, res) => {
  Appointment.find({ Office: "Admission" }).then((app) => {
    res.json(app);
  });
};

exports.getAppointmentToday = (req, res) => {
  res.json(new Date());
};

exports.deleteApp = (req, res) => {
  const { _id } = req.body;

  req.body.Time.forEach((r) => {
    if (r.Request.Appointment === undefined) {
    } else {
      Request.findOneAndDelete({
        "Appointment.app._id": r.Request.Appointment.app._id
      })
        .then(() => {
          console.log("deleting nested docx...");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  Appointment.findByIdAndDelete(_id)
    .then((app) => {
      res.json("Success deleting the appointment");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getTodayAppointmentAdmin = (req, res) => {
  Appointment.count({
    Office: "Admission",
    Date: moment(new Date()).format("YYYY-MM-DD")
  }).then((app) => {
    console.log();
    res.json(app);
  });
};

exports.getTodayAppointmentReg = (req, res) => {
  Appointment.count({
    Office: "Registrar",
    Date: moment(new Date()).format("YYYY-MM-DD")
  }).then((app) => {
    console.log(moment(new Date()).format("YYYY-MM-DD"));
    res.json(app);
  });
};

exports.editAppointment = (req, res) => {
  console.log(req.body);
  const { _id, Date, Time, Office } = req.body;
  Appointment.findById(_id)
    .then((app) => {
      app.Date = Date;
      app.Time = Time;
      app
        .save()
        .then(() => {
          res.json("Update Success");
        })
        .catch((err) => {
          res.json("There was an error updating the Appointment");
        });
    })
    .catch((err) => {
      res.json(err);
    });
};
