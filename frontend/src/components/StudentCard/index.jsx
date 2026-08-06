import "./index.css"

const StudentCard = ({student}) => {
  return (
    <div className="student-card">
      <h2>{student.name}</h2>

      <p>
        <strong>Email:</strong> {student.email}
      </p>

      <h4>Enrolled Courses</h4>

      <ul>
        {student.enrolledCourses.map(course => (
          <li
            key={`${student.studentId}-${course.courseId}`}
          >
            {course.title}

            {" - "}

            {course.status}

            {" ("}

            {course.progress}

            %)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentCard