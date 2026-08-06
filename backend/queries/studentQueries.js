const GET_ALL_STUDENTS = `
MATCH (s:Student)

OPTIONAL MATCH (s)-[e:ENROLLED_IN]->(c:Course)

RETURN
    s.studentId AS studentId,
    s.name AS name,
    s.email AS email,
    collect(
        {
            courseId: c.courseId,
            title: c.title,
            status: e.status,
            progress: e.progress
        }
    ) AS enrolledCourses

ORDER BY s.studentId
`

const ENROLL_STUDENT = `
MATCH (s:Student {studentId: $studentId})
MATCH (c:Course {courseId: $courseId})

MERGE (s)-[e:ENROLLED_IN]->(c)

SET
    e.status = $status,
    e.progress = $progress

RETURN
    s.name AS studentName,
    c.title AS courseTitle,
    e.status AS status,
    e.progress AS progress
`

const GET_RECOMMENDATIONS = `
MATCH (s:Student {studentId: $studentId})
MATCH (s)-[e:ENROLLED_IN]->(completed:Course)
WHERE e.status = 'Completed'

MATCH (completed)-[:PREREQUISITE_FOR]->(recommended:Course)

WHERE NOT EXISTS {
    MATCH (s)-[:ENROLLED_IN]->(recommended)
}

RETURN DISTINCT
    recommended.courseId AS courseId,
    recommended.title AS title,
    recommended.level AS level

ORDER BY recommended.courseId
`
module.exports = {
  GET_ALL_STUDENTS,
  ENROLL_STUDENT,
  GET_RECOMMENDATIONS,
}