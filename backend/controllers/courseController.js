const driver = require("../config/db")

const {
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  GET_LEARNING_PATH,
} = require("../queries/courseQueries")

const getAllCourses = async (req, res) => {
  const session = driver.session()

  try {
    const result = await session.run(GET_ALL_COURSES)

    const courses = result.records.map(record => ({
      courseId: record.get("courseId"),
      title: record.get("title"),
      level: record.get("level"),
      duration: record.get("duration"),
      instructor: record.get("instructor"),
      skills: record.get("skills"),
    }))

    res.status(200).json({
      success: true,
      data: courses,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    })
  } finally {
    await session.close()
  }
}

const getCourseById = async (req, res) => {
  const session = driver.session()

  try {
    const { courseId } = req.params

    const result = await session.run(
      GET_COURSE_BY_ID,
      {
        courseId,
      }
    )

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    const record = result.records[0]

    const course = {
      courseId: record.get("courseId"),
      title: record.get("title"),
      level: record.get("level"),
      duration: record.get("duration"),
      instructor: record.get("instructor"),
      skills: record.get("skills"),
      prerequisites: record.get("prerequisites"),
      nextCourses: record.get("nextCourses"),
    }

    res.status(200).json({
      success: true,
      data: course,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    })
  } finally {
    await session.close()
  }
}

const getLearningPath = async (req, res) => {
  const session = driver.session()

  try {
    const { courseId } = req.params

    const result = await session.run(
      GET_LEARNING_PATH,
      {
        courseId,
      }
    )

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found",
      })
    }

    const learningPath =
      result.records[0].get("learningPath")

    res.status(200).json({
      success: true,
      learningPath,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch learning path",
    })
  } finally {
    await session.close()
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  getLearningPath,
}