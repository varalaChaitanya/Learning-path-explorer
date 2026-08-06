const driver = require("../config/db")

const {
  GET_ALL_STUDENTS,
  ENROLL_STUDENT,
  GET_RECOMMENDATIONS,
} = require("../queries/studentQueries")

const getAllStudents = async (req, res) => {
  const session = driver.session()

  try {
    const result = await session.run(GET_ALL_STUDENTS)

    const students = result.records.map((record) => ({
      studentId: record.get("studentId"),
      name: record.get("name"),
      email: record.get("email"),
      enrolledCourses: record.get("enrolledCourses"),
    }))

    res.status(200).json({
      success: true,
      data: students,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    })
  } finally {
    await session.close()
  }
}

const enrollStudent = async (req, res) => {
  const session = driver.session()

  try {
    const {
      studentId,
      courseId,
      status,
      progress,
    } = req.body

    const result = await session.run(
      ENROLL_STUDENT,
      {
        studentId,
        courseId,
        status,
        progress,
      }
    )

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student or Course not found",
      })
    }

    const record = result.records[0]

    res.status(200).json({
      success: true,
      message: "Enrollment Successful",
      data: {
        studentName: record.get("studentName"),
        courseTitle: record.get("courseTitle"),
        status: record.get("status"),
        progress: record.get("progress"),
      },
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Enrollment Failed",
    })
  } finally {
    await session.close()
  }
}

const getRecommendations = async (req, res) => {
  const session = driver.session()

  try {
    const { studentId } = req.params

    const result = await session.run(
      GET_RECOMMENDATIONS,
      {
        studentId,
      }
    )

    const recommendations = result.records.map((record) => ({
      courseId: record.get("courseId"),
      title: record.get("title"),
      level: record.get("level"),
    }))

    res.status(200).json({
      success: true,
      data: recommendations,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations",
    })
  } finally {
    await session.close()
  }
}

module.exports = {
  getAllStudents,
  enrollStudent,
  getRecommendations,
}