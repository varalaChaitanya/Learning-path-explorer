import { useEffect, useState } from "react"

import api from "../../services/api"

import CourseCard from "../../components/CourseCard"
import Loading from "../../components/Loading"
import Error from "../../components/Error"

const Courses = () => {
  const [courses, setCourses] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses")

      setCourses(response.data.data)
    } catch (err) {
      setError("Unable to fetch courses")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Courses</h1>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {courses.map(course => (
          <CourseCard
            key={course.courseId}
            course={course}
          />
        ))}
      </div>
    </div>
  )
}

export default Courses