const { listenerCount } = require("../model/Appointment");
let Appointment = require("../model/Appointment");
let Request = require("../model/Request");
const moment = require("moment");
const nodemailer = require("nodemailer");
async function smtp(to, sub, mes, date) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "pamantasan04@gmail.com", // generated ethereal user
      pass: "thesis123" // generated ethereal password
    }
  });

  var option = {
    from: '"PLSP" <pamantasan@gmail.com>', // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: mes, // plain text body
    html: `<html>
    <head>
  <style>
  
  </style>
    
    </head>
    <body>
    
    <h1>The Request appointment was updated to ${date}</h1>
    
    </body>
    
    </html>` // html body,
  };

  let info;
  // send mail with defined transport object

  info = await transporter.sendMail(option);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.insertAppointment = (req, res) => {
  Appointment.find({ Date: req.body.Date, Office: req.body.Office }).then(
    (appointment) => {
      if (appointment.length) {
        res.json("There was a Data Duplication");
      } else {
        var newApp = new Appointment(req.body);
        newApp
          .save()
          .then((data) => {
            res.json("Success Adding an appointment");
          })
          .catch((err) => {
            res.json(err);
          });
      }
    }
  );
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
  const { _id, Date, Time, Office } = req.body;
  Appointment.findById(_id)
    .then((app) => {
      app.Date = Date;
      app.Time = Time;
      app
        .save()
        .then(() => {
          Request.updateMany(
            { "Appointment.app._id": _id },
            { $set: { "Appointment.date": Date } }
          )
            .then((re) => {
              Request.find({ "Appointment.app._id": _id })
                .then((wat) => {
                  wat.forEach((s) => {
                    smtp(s.Email, "Updated Appointment", "null", Date);
                  });
                  res.json("Updated Sucessfully");
                })
                .catch((err) => {
                  res.json(err);
                });
            })
            .catch((err) => {
              res.json(err);
            });
        })
        .catch((err) => {
          res.json("There was an error updating the Appointment");
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteTime = (req, res) => {
  const { Name, Age, Purpose, Appointment } = req.body.Request;
  Request.findOneAndDelete({
    Name: Name,
    Age: Age,
    Purpose: Purpose,
    Appointment: Appointment
  })
    .then((request) => {
      res.json("Successfully Deleted");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.addTime = (req, res) => {
  console.log(req.body.data);
};
