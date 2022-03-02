let Request = require("../model/Request");
let App = require("../model/Appointment");
const moment = require("moment");
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
    }
  });
  if (status) {
    var message = `
  ${mes} and the queue number is ${time.queue}
  `;
    var qr_png = qr.imageSync(message, {
      type: "png"
    });
  }
  var option = {
    from: '"DLSB" <pamantasan@gmail.com>', // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: mes, // plain text body
    html: `<html>
    <head>
  <style>
  
  </style>
    
    </head>
    <body>
    
    <h1>QR Code to Present</h1>
    
    </body>
    
    </html>`, // html body,
    attachments: [{ filename: "image.png", content: qr_png }]
  };

  var optionRejected = {
    from: '"DLSB" <pamantasan@gmail.com>', // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: "the request was rejected due to inconsistent information or the information is not valid", // plain text body
    html: `<html>
    <head>
  <style>
  
  </style>
    </head>
    <body>
    <h1>The Request is Rejected</h1>
    <p>the request was rejected due to inconsistent information or the information is not valid</p>
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
    Name
  } = req.body;
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
        Email: Email
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
  Request.find({ Office: "Registrar" })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAdminssiontRequest = (req, res) => {
  Request.find({ Office: "Admission" })
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.sendQr = (req, res) => {
  var timesOne = req.body.data.request.Appointment.app.Time.map((time) => {
    return time.Time;
  });
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
    time,
    true
  ).then(() => {
    res.json("Successfully Accepted");
  });
};

exports.rejectRequest = (req, res) => {
  smtp(req.body.Email, "Request Rejected", req.body, 0, false).then(() => {
    console.log(req.body.Appointment.time);

    App.findByIdAndUpdate(req.body.Appointment.app._id, {
      $pull: {
        Time: { Time: req.body.Appointment.time }
      }
    })
      .then((appointment) => {
        Request.findByIdAndDelete(req.body._id)
          .then((reqs) => {
            res.json("Successfully Rejected");
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

exports.getRequestCount = (req, res) => {
  Request.count().then((count) => {
    res.json(count);
  });
};
