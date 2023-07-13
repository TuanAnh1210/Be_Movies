import express from "express";
import mongoose from "mongoose";
import movieRouter from "./routers/movie";
import bodyParser from "body-parser";

const app = express();
const port = 8080;

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Router
app.use("/api", movieRouter);

mongoose
  .connect("mongodb://localhost:27017/ass")
  .then(() => console.log("Connected to DB"));

app.listen(port, () => {
  console.log("Server is running on " + port);
});
