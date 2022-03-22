const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.URI;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database is Running"))
  .catch((err) => console.log("The Error is " + err));
const studentRouter = require("./routes/Student");
const adminRouter = require("./routes/adminRegistrar");
const appointmentRouter = require("./routes/appointmentRoute");
const RequestRouter = require("./routes/requestRoute");
const courseRouter = require("./routes/courseRouter");
const requestListRouter = require("./routes/requestListRouter");
app.use("/api", studentRouter);
app.use("/api", adminRouter);
app.use("/api", appointmentRouter);
app.use("/api", RequestRouter);
app.use("/api", courseRouter);
app.use("/api", requestListRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log("Server Runs on Port : " + port);
});
