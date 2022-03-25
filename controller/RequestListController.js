let RequestList = require("../model/RequestList");

exports.insertRequestList = (req, res) => {
  var newRequest = new RequestList({ Request: req.body.request });
  newRequest
    .save()
    .then((c) => {
      res.json("Successfully Added");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getRequestList = (req, res) => {
  RequestList.find()
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteRequestList = (req, res) => {
  RequestList.findByIdAndDelete(req.body.data)
    .then((request) => {
      res.json("Successfully Deleted");
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.editRequestList = (req, res) => {
  RequestList.findById(req.body.id)
    .then((request) => {
      request.Request = req.body.value;
      request
        .save()
        .then((c) => {
          res.json("Successfully Updated");
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};
