const express = require("express")
const cors = require("cors")

const driver = require("./config/db")
const courseRoutes = require("./routes/courseRoutes")
const studentRoutes = require("./routes/studentRoutes")
const instructorRoutes = require("./routes/instructorRoutes")
const app = express()

app.use(cors())

app.use(
  cors({
    origin: "*",
  })
)

app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Learning Path Explorer API Running",
  })
})

// Database Connection Test
app.get("/test-db", async (req, res) => {
  const session = driver.session()

  try {
    const result = await session.run(
      "RETURN 'Connected Successfully' AS message"
    )

    res.json({
      success: true,
      message: result.records[0].get("message"),
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
    })
  } finally {
    await session.close()
  }
})

// Course Routes
app.use("/courses", courseRoutes)
app.use("/students", studentRoutes)
app.use("/instructors", instructorRoutes)

module.exports = app
