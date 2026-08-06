const express = require("express")

const {
  getAllCourses,
  getCourseById,
  getLearningPath,
} = require("../controllers/courseController")

const router = express.Router()

router.get("/", getAllCourses)

router.get("/:courseId", getCourseById)

router.get("/:courseId/path", getLearningPath)

module.exports = router