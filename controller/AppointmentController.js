const { listenerCount } = require("../model/Appointment");
let Appointment = require("../model/Appointment");
let Request = require("../model/Request");

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

exports.getAppointmentCount = (req, res) => {
  Appointment.count().then((count) => {
    res.json(count);
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
