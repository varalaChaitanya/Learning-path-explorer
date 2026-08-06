import { Link } from "react-router-dom"

import "./index.css"

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h2>{course.title}</h2>

      <p>
        <strong>Level:</strong> {course.level}
      </p>

      <p>
        <strong>Duration:</strong> {course.duration} Hours
      </p>

      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>

      <Link to={`/courses/${course.courseId}`}>
        <button className="details-btn">
          View Details
        </button>
      </Link>
    </div>
  )
}

export default CourseCard