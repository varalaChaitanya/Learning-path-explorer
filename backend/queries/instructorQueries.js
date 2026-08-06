const GET_ALL_INSTRUCTORS = `
MATCH (i:Instructor)

OPTIONAL MATCH (c:Course)-[:TAUGHT_BY]->(i)

RETURN
    i.instructorId AS instructorId,
    i.name AS name,
    i.experience AS experience,
    collect(
        {
            courseId: c.courseId,
            title: c.title
        }
    ) AS courses

ORDER BY i.name
`

const GET_INSTRUCTOR_BY_ID = `
MATCH (i:Instructor {instructorId: $instructorId})

OPTIONAL MATCH (c:Course)-[:TAUGHT_BY]->(i)

RETURN
    i.instructorId AS instructorId,
    i.name AS name,
    i.experience AS experience,
    collect(
        {
            courseId: c.courseId,
            title: c.title
        }
    ) AS courses
`

module.exports = {
    GET_ALL_INSTRUCTORS,
    GET_INSTRUCTOR_BY_ID,
}