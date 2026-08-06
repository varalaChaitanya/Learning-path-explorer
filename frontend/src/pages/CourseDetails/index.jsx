import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import api from "../../services/api"

import Loading from "../../components/Loading"
import Error from "../../components/Error"

import "./index.css"

const CourseDetails = () => {
  const { courseId } = useParams()

  const [course, setCourse] = useState(null)
  const [learningPath, setLearningPath] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchCourseDetails()
  }, [courseId])

  const fetchCourseDetails = async () => {
    setLoading(true)

    try {
      const [courseResponse, learningPathResponse] =
        await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/courses/${courseId}/path`),
        ])

      setCourse(courseResponse.data.data)

      setLearningPath(
        learningPathResponse.data.learningPath || []
      )
    } catch (err) {
      console.error(err)
      setError("Unable to fetch course details.")
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
    <div className="page-container">
      <div className="card">
        <h1
          style={{
            color: "#1e3a8a",
            marginBottom: "20px",
          }}
        >
          📘 {course.title}
        </h1>

        {/* Course Info */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          <div className="card">
            <h3>Course Information</h3>

            <br />

            <p>
              <strong>Level</strong>
            </p>

            <span className="badge">
              {course.level}
            </span>

            <br />

            <br />

            <p>
              <strong>Duration</strong>
            </p>

            <span className="badge">
              {course.duration} Hours
            </span>
          </div>

          <div className="card">
            <h3>Instructor</h3>

            <br />

            <h2
              style={{
                color: "#2563eb",
              }}
            >
              👨‍🏫 {course.instructor}
            </h2>
          </div>
        </div>

        {/* Skills */}

        <div
          className="card"
          style={{
            marginTop: "25px",
          }}
        >
          <h3>Skills Covered</h3>

          <br />

          {course.skills.filter(Boolean).length === 0 ? (
            <p>No Skills Available</p>
          ) : (
            course.skills
              .filter(Boolean)
              .map(skill => (
                <span
                  key={skill}
                  className="badge"
                >
                  {skill}
                </span>
              ))
          )}
        </div>

        {/* Prerequisites & Next Courses */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <div className="card">
            <h3>Prerequisites</h3>

            <br />

            {course.prerequisites.filter(Boolean)
              .length === 0 ? (
              <p>No Prerequisites</p>
            ) : (
              <ul>
                {course.prerequisites
                  .filter(Boolean)
                  .map(item => (
                    <li
                      key={item}
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      🔹 {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="card">
            <h3>Next Courses</h3>

            <br />

            {course.nextCourses.filter(Boolean)
              .length === 0 ? (
              <p>No Next Courses</p>
            ) : (
              <ul>
                {course.nextCourses
                  .filter(Boolean)
                  .map(item => (
                    <li
                      key={item}
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      🚀 {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* Learning Path */}

        <div className="card learning-path">
          <h3>Learning Path</h3>

          <br />

          {learningPath.length === 0 ? (
            <p>No Learning Path Available</p>
          ) : (
            learningPath.map((courseName, index) => (
              <div key={index}>
                <div className="path-item">
                  {courseName}
                </div>

                {index !==
                  learningPath.length - 1 && (
                  <div className="path-arrow">
                    ↓
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseDetails