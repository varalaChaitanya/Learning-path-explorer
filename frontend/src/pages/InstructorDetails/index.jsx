import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import api from "../../services/api"

import Loading from "../../components/Loading"
import Error from "../../components/Error"

import "./index.css"

const InstructorDetails = () => {
  const { instructorId } = useParams()

  const [instructor, setInstructor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchInstructor()
  }, [instructorId])

  const fetchInstructor = async () => {
    try {
      const response = await api.get(
        `/instructors/${instructorId}`
      )

      setInstructor(response.data.data)
    } catch (err) {
      console.error(err)
      setError("Unable to fetch instructor details.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  if (error) return <Error message={error} />

  return (
    <div className="page-container">
      <div className="instructor-details-card">

        <h1>👨‍🏫 {instructor.name}</h1>

        <p className="experience">
          Experience: {instructor.experience} Years
        </p>

        <h3>Courses Taught</h3>

        <ul className="course-list">
          {instructor.courses
            .filter(course => course.courseId)
            .map(course => (
              <li key={course.courseId}>
                📘 {course.title}
              </li>
            ))}
        </ul>

        <Link to="/instructors">
          <button className="blue-btn">
            Back
          </button>
        </Link>

      </div>
    </div>
  )
}

export default InstructorDetails