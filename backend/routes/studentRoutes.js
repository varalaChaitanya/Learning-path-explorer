const express = require("express")

const {
  getAllStudents,
  enrollStudent,
  getRecommendations,
} = require("../controllers/studentController")

const router = express.Router()

router.get("/", getAllStudents)

router.post("/enroll", enrollStudent)

router.get("/recommendations/:studentId", getRecommendations)

module.exports = router