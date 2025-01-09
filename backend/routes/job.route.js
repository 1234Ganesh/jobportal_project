const express = require("express");
const {
  postJob,
  getAllJob,
  getAdminJobs,
  getJobById,
} = require("../controllers/job.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

const router = express.Router();

router.post("/post", isAuthenticated, postJob);

router.get("/get", isAuthenticated, getAllJob);

router.get("/getadminjobs", isAuthenticated, getAdminJobs);

router.get("/get/:id", isAuthenticated, getJobById);

module.exports = router;
