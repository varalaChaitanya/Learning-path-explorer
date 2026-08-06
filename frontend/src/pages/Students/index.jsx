import { useEffect, useState } from "react"

import api from "../../services/api"

import Loading from "../../components/Loading"
import Error from "../../components/Error"
import StudentCard from "../../components/StudentCard"
import EnrollModal from "../../components/EnrollModal"

const Students = () => {
  const [students, setStudents] = useState([])

  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)

  const [error, setError] = useState("")

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students")

      setStudents(response.data.data)
    } catch (error) {
      console.error(error)

      setError("Unable to fetch students")
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Students</h1>

        <button
          className="blue-btn"
          onClick={() => setShowModal(true)}
        >
          Enroll Student
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(350px,1fr))",
          gap: "20px",
        }}
      >
        {students.map(student => (
          <StudentCard
            key={student.studentId}
            student={student}
          />
        ))}
      </div>

      {showModal && (
        <EnrollModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchStudents}
        />
      )}
    </div>
  )
}

export default Students