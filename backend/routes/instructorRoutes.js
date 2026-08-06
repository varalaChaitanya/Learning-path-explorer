const express = require("express")

const {
  getAllInstructors,
  getInstructorById,
} = require("../controllers/instructorController")

const router = express.Router()

router.get("/", getAllInstructors)

router.get("/:instructorId", getInstructorById)

module.exports = router