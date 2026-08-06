import { useEffect, useState } from "react"

import api from "../../services/api"

import "./index.css"

const EnrollModal = ({ onClose, onSuccess }) => {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])

  const [studentId, setStudentId] = useState("")
  const [courseId, setCourseId] = useState("")

  const [status, setStatus] = useState("In Progress")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [studentsResponse, coursesResponse] =
        await Promise.all([
          api.get("/students"),
          api.get("/courses"),
        ])

      setStudents(studentsResponse.data.data)
      setCourses(coursesResponse.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await api.post("/students/enroll", {
        studentId,
        courseId,
        status,
        progress: Number(progress),
      })

      alert("Student enrolled successfully.")

      onSuccess()

      onClose()
    } catch (error) {
      console.error(error)

      alert("Enrollment failed.")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Enroll Student</h2>

        <form onSubmit={handleSubmit}>

          <label>Student</label>

          <select
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            required
          >
            <option value="">Select Student</option>

            {students.map(student => (
              <option
                key={student.studentId}
                value={student.studentId}
              >
                {student.name}
              </option>
            ))}
          </select>

          <label>Course</label>

          <select
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            required
          >
            <option value="">Select Course</option>

            {courses.map(course => (
              <option
                key={course.courseId}
                value={course.courseId}
              >
                {course.title}
              </option>
            ))}
          </select>

          <label>Status</label>

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <label>Progress (%)</label>

          <input
            type="number"
            min="0"
            max="100"
            value={progress}
            onChange={e => setProgress(e.target.value)}
          />

          <div className="modal-buttons">

            <button
              type="submit"
              className="blue-btn"
            >
              Enroll
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default EnrollModal