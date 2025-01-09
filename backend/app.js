const express = require("express");
const cookiParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const userRouter = require("./routes/user.route");
const companyRouter = require("./routes/company.route");
const jobRouter = require("./routes/job.route");
const applicationRouter = require("./routes/application.route");
const path = require("path");
dotenv.config({});

const app = express();

const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3005;
connectDB();
app.get("/home", (req, res) => {
  res.status(200).json({
    message: "I am coming from backend",
  });
});

// api's
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.use("/api/v1/company", companyRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => console.log("started", PORT));
