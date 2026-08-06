import { Link } from "react-router-dom"

import "./index.css"

const InstructorCard = ({ instructor }) => {
  return (
    <div className="instructor-card">

      <h2>{instructor.name}</h2>

      <p>
        <strong>Experience:</strong>{" "}
        {instructor.experience} Years
      </p>

      <h4>Courses</h4>

      <ul>
        {instructor.courses
          .filter(course => course.courseId)
          .map(course => (
            <li key={course.courseId}>
              {course.title}
            </li>
          ))}
      </ul>

      <Link
        to={`/instructors/${instructor.instructorId}`}
      >
        <button className="details-btn">
          View Details →
        </button>
      </Link>

    </div>
  )
}

export default InstructorCard