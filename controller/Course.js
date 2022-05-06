let Course = require("../model/Course");
exports.insertCourse = (req, res) => {
  var newCourse = new Course({ Course: req.body.course,Window:req.body.window });
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
  console.logo(req.body.data)
  // Course.findByIdAndDelete(req.body.data)
  //   .then((course) => {
  //     res.json("Successfully Deleted");
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });
};
exports.editCourse = (req, res) => {
var id = req.body.toEdit.id;
var coursez = req.body.val.Course;
var window= req.body.val.Window;

  Course.findById(id)
    .then((course) => {
      course.Course = coursez;
      course.Window = window;
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
