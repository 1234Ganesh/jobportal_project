const express = require("express");
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/user.controler");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const { singleUpload } = require("../middlewares/multer.js");
const router = express.Router();
router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

module.exports = router;
