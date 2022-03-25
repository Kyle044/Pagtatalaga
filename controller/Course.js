let Course = require("../model/Course");
exports.insertCourse = (req, res) => {
  var newCourse = new Course({ Course: req.body.course });
  newCourse
    .save()
    .then((c) => {
      res.json("Successfully Added");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getCourse = (req, res) => {
  Course.find()
    .then((course) => {
      res.json(course);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteCourse = (req, res) => {
  Course.findByIdAndDelete(req.body.data)
    .then((course) => {
      res.json("Successfully Deleted");
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.editCourse = (req, res) => {
  console.log(req.body);
  Course.findById(req.body.id)
    .then((course) => {
      course.Course = req.body.value;
      course
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
