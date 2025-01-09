const express = require("express");
const {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} = require("../controllers/application.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applyJob);

router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.all("/status/:id/update", isAuthenticated, updateStatus);

module.exports = router;
