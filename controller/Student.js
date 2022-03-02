let Student = require("../model/Student");
exports.postQR = (req, res) => {
  const { no, name, courseyear, purpose, age } = req.body;
  if (no && name && courseyear && purpose && age) {
    var newStudent = new Student({
      no: no,
      name: name,
      age: age,
      courseyear: courseyear,
      purpose: purpose
    });
    newStudent
      .save()
      .then((student) => {
        res.json("Successfully Added");
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    var newStudent = new Student({
      no: "N/A",
      name: name,
      age: age,
      courseyear: courseyear,
      purpose: purpose
    });
    newStudent
      .save()
      .then((student) => {
        res.json("Successfully Added");
      })
      .catch((err) => {
        res.json(err);
      });
  }
};
