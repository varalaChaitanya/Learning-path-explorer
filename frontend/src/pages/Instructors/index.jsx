import { useEffect, useState } from "react"

import api from "../../services/api"

import Loading from "../../components/Loading"
import Error from "../../components/Error"
import InstructorCard from "../../components/InstructorCard"

const Instructors = () => {
  const [instructors, setInstructors] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {
    fetchInstructors()
  }, [])

  const fetchInstructors = async () => {
    try {
      const response = await api.get("/instructors")

      setInstructors(response.data.data)
    } catch (error) {
      setError("Unable to fetch instructors")
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
      <h1>Instructors</h1>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(350px,1fr))",
          gap: "20px",
        }}
      >
        {instructors.map(instructor => (
          <InstructorCard
            key={instructor.instructorId}
            instructor={instructor}
          />
        ))}
      </div>
    </div>
  )
}

export default Instructors