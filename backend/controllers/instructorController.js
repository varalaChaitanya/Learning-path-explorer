const driver = require("../config/db")

const {
  GET_ALL_INSTRUCTORS,
  GET_INSTRUCTOR_BY_ID,
} = require("../queries/instructorQueries")

const getAllInstructors = async (req, res) => {
  const session = driver.session()

  try {
    const result = await session.run(GET_ALL_INSTRUCTORS)

    const instructors = result.records.map(record => ({
      instructorId: record.get("instructorId"),
      name: record.get("name"),
      experience: record.get("experience"),
      courses: record.get("courses"),
    }))

    res.status(200).json({
      success: true,
      data: instructors,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch instructors",
    })
  } finally {
    await session.close()
  }
}

const getInstructorById = async (req, res) => {
  const session = driver.session()

  try {
    const { instructorId } = req.params

    const result = await session.run(
      GET_INSTRUCTOR_BY_ID,
      {
        instructorId,
      }
    )

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      })
    }

    const record = result.records[0]

    res.status(200).json({
      success: true,
      data: {
        instructorId: record.get("instructorId"),
        name: record.get("name"),
        experience: record.get("experience"),
        courses: record.get("courses"),
      },
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch instructor",
    })
  } finally {
    await session.close()
  }
}

module.exports = {
  getAllInstructors,
  getInstructorById,
}