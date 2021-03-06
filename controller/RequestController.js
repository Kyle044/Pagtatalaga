let Request = require("../model/Request");
let App = require("../model/Appointment");
const moment = require("moment");
var mongoose = require("mongoose");
const nodemailer = require("nodemailer");
var QRCode = require("qrcode");
var qr = require("qr-image");
const Appointment = require("../model/Appointment");
async function smtp(to, sub, mes, time, status) {
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
    },
    secureConnection: 'false',
    tls: {
      ciphers: 'SSLv3'
  }
  });
  //Quueing number   ${time.queue}
  if (status) {
    var message = `
  ${mes} 
  `;
    var qr_png = qr.imageSync(message, {
      type: "png"
    });
  }
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
    
    <h4>Greetings, your request for an appointment on ${time.date},   ${moment(
      time.time,
      "hh:mm"
    ).format(
      "LT"
    )} was approved. Please present this QR code to the PLSP E-Transaction Kiosk. Thank you!</h4>
  
  
    </body>
    
    </html>`, // html body,
    attachments: [{ filename: "image.png", content: qr_png }]
  };

  var optionRejected = {
    from: '"PLSP" <pamantasan@gmail.com>', // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: "the request was rejected due to inconsistent information or the information is not valid", // plain text body
    html: `<html>
    <head>
  <style>
  
  </style>
    </head>
    <body>
      <h3>Request Rejected
      Your requested appointment was rejected due to lack of information or the information is not valid.</h3>
    </body>
    </html>`
  };

  let info;
  // send mail with defined transport object

  if (status) {
    info = await transporter.sendMail(option);

  } else {
    info = await transporter.sendMail(optionRejected);
  }
 
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 
}

exports.insertRequest = (req, res) => {
  const {
    Email,
    Appointment,
    Type,
    Purpose,
    Admin,
    Course,
    Year,
    StudentID,
    Age,
    Name,
    ReqYr,
    ReqSem
  } = req.body;
  var index = 0;
  var integerTime = [];
  var integerHours = [];
  var integerMinutes = [];
  var sortedTime = [];
  var queue = null;

  Appointment.app.Time.forEach((appTime) => {
    var time = parseInt(
      appTime.Time.substring(0, 2) + appTime.Time.substring(3, 5)
    );
    var hours = appTime.Time.substring(0, 2);
    var minutes = appTime.Time.substring(3, 5);
    integerHours[index] = hours;
    integerMinutes[index] = minutes;
    integerTime[index] = time;

    index++;
  });
  integerTime.sort(function (a, b) {
    return a - b;
  });
  var b = 0;
  integerTime.forEach((time) => {
    var hour = null;
    var minutes = null;

    if (time.toString().length == 4) {
      hour = time.toString().substring(0, 2);
      minutes = time.toString().substring(2, 4);
    } else {
      hour = `0${time.toString().substring(0, 1)}`;
      minutes = time.toString().substring(1, 4);
    }

    sortedTime[b] = `${hour}:${minutes}`;

    if (`${hour}:${minutes}` == Appointment.time) {
      queue = b + 1;
    }
    b++;
  });

  var queueInteger = parseInt(queue);

  App.findById(Appointment.app._id)
    .then((app) => {
      var objIndex = app.Time.findIndex((obj) => obj.Time == Appointment.time);
      app.Time[objIndex].Request = req.body;
      app.save();

      var newRequest = new Request({
        Appointment: Appointment,
        Office: Admin,
        Name: Name,
        Age: Age,
        StudentID: StudentID,
        Year: Year,
        Course: Course,
        Purpose: Purpose,
        Email: Email,
        RequestedYear: ReqYr,
        RequestedSemester: ReqSem,
        QueueNumber: queueInteger
      });
      newRequest.save().then((request) => {
        res.json("Submitted Successfully.");
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getStudentRequest = (req, res) => {
  Request.find({
    Office: "Registrar",
    isEmailed: "FALSE"
  })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAdminssiontRequest = (req, res) => {
  Request.find({ Office: "Admission", isEmailed: "FALSE" })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.sendQr = (req, res) => {
 
  Request.findById(req.body.data.request._id)
    .then((request) => {
      request.isEmailed = "TRUE";
      request.save().then(() => {
        var timesOne = req.body.data.request.Appointment.app.Time.map(
          (time) => {
            return time.Time;
          }
        );
        var times = req.body.data.request.Appointment.app.Time.map((time) => {
          var newTime = time.Time.substring(0, 2) + time.Time.substring(4, 7);
          return parseInt(newTime);
        });
        var sortedTime = times.sort(function (a, b) {
          return a - b;
        });
        var i = 0;
        var queueTime = sortedTime.map((st) => {
          i++;
          return { queue: i, time: timesOne[i - 1] };
        });
        let time = queueTime.find(
          (o) => o.time === req.body.data.request.Appointment.time
        );
        smtp(
          req.body.data.request.Email,
          "Request Accepted",
          req.body.data.data,
          req.body.data.request.Appointment,
          true
        ).then(() => {
       res.json("Email has been Successfully Sent!")
        });
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.rejectRequest = (req, res) => {
  smtp(req.body.Email, "Request Rejected", req.body, 0, false).then(() => {
    console.log(req.body.Appointment.time);

    App.findById({
      _id: req.body.Appointment.app._id
    })
      .then((appointment) => {
        // console.log(appointment.Time);
        var pending = { Status: "Pending" };
        const newState = appointment.Time.map((obj) =>
          obj.Time == req.body.Appointment.time
            ? { _id: obj._id, Time: obj.Time, Request: pending }
            : obj
        );
        appointment.Time = newState;
        appointment.save();
        Request.findById(req.body._id)
          .then((reqs) => {
            reqs.IsAccepted = "REJECTED";
            reqs
              .save()
              .then(() => {
                res.json("Successfully Rejected");
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
        res.json(err);
      });
  });
};

exports.getRequestCountReg = (req, res) => {
  Request.count({ Office: "Registrar" }).then((count) => {
    res.json(count);
  });
};

exports.getRequestCountAdmin = (req, res) => {
  Request.count({ Office: "Admission" }).then((count) => {
    res.json(count);
  });
};

exports.getRequestToday = (req, res) => {
  Request.find({
    Office: "Registrar",
    "Appointment.date": moment(new Date()).format("YYYY-MM-DD"),
    IsAccepted: "NOT ACCEPTED"
  }).then((count) => {
    res.json(count);
  });
};

exports.getRequestAdminToday = (req, res) => {
  Request.find({
    Office: "Admission",
    "Appointment.date": moment(new Date()).format("YYYY-MM-DD"),
    IsAccepted: "NOT ACCEPTED"
  }).then((count) => {
    res.json(count);
  });
};

exports.markedOnQueueRequest = (req, res) => {
  Request.findById(req.body.id).then((request) => {
    request.Status = "On Queue";
    request
      .save()
      .then((rq) => {
        res.json("The Request is on Queue");
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
exports.markedasAdoneRequest = (req, res) => {
  Request.findById(req.body.id).then((request) => {
    request.Status = "Complete";
    request
      .save()
      .then((rq) => {
        res.json("The Request is on Queue");
      })
      .catch((err) => {
        res.json(err);
      });
  });
};

exports.scanQR = (req, res) => {
  Request.findById(req.body.id.trim())
    .then((request) => {
      console.log(request.length);
      if (request.Status == "EXPIRED") {
        res.json("The QR Code is Expired.");
      } else {
        request.IsAccepted = "ACCEPTED";
        request.Status = "EXPIRED";
        request
          .save()
          .then((request) => {
            res.json({ msg: "The Request is on Queue", data: request });
          })
          .catch((err) => {
            res.json({ msg: "Error Saving the data", error: err });
          });
      }
    })
    .catch((err) => {
      res.json({ msg: "QR Code is Invalid", error: err });
    });
};

exports.getRequestTodayAccepted = (req, res) => {
  Request.find({
    Office: "Registrar",
    "Appointment.date": moment(new Date()).format("YYYY-MM-DD"),
    IsAccepted: "ACCEPTED"
  })
    .sort({ QueueNumber: 1 })
    .then((count) => {
      res.json(count);
    });
};

exports.getRequestAdminTodayAccepted = (req, res) => {
  Request.find({
    Office: "Admission",
    "Appointment.date": moment(new Date()).format("YYYY-MM-DD"),
    IsAccepted: "ACCEPTED"
  })
    .sort({ QueueNumber: 1 })
    .then((count) => {
      res.json(count);
    });
};

exports.getStudentRequestAccepted = (req, res) => {
  Request.find({
    Office: "Registrar",
    IsAccepted: "ACCEPTED"
  })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAdminssiontRequestAccepted = (req, res) => {
  Request.find({ Office: "Admission", IsAccepted: "ACCEPTED" })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getEmailedAdminssion = (req, res) => {
  Request.find({ Office: "Admission", isEmailed: "TRUE" })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getEmailedRegistrar = (req, res) => {
  Request.find({ Office: "Registrar", isEmailed: "TRUE" })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};
