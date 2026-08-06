const GET_ALL_COURSES = `
MATCH (c:Course)
OPTIONAL MATCH (c)-[:TAUGHT_BY]->(i:Instructor)
OPTIONAL MATCH (c)-[:HAS_SKILL]->(s:Skill)

RETURN
    c.courseId AS courseId,
    c.title AS title,
    c.level AS level,
    c.duration AS duration,
    i.name AS instructor,
    collect(s.name) AS skills

ORDER BY c.courseId
`

const GET_COURSE_BY_ID = `
MATCH (c:Course {courseId: $courseId})

OPTIONAL MATCH (c)-[:TAUGHT_BY]->(i:Instructor)
OPTIONAL MATCH (c)-[:HAS_SKILL]->(s:Skill)
OPTIONAL MATCH (pre:Course)-[:PREREQUISITE_FOR]->(c)
OPTIONAL MATCH (c)-[:PREREQUISITE_FOR]->(next:Course)

RETURN
    c.courseId AS courseId,
    c.title AS title,
    c.level AS level,
    c.duration AS duration,
    i.name AS instructor,
    collect(DISTINCT s.name) AS skills,
    collect(DISTINCT pre.title) AS prerequisites,
    collect(DISTINCT next.title) AS nextCourses
`

const GET_LEARNING_PATH = `
MATCH path = (start:Course {courseId: $courseId})-[:PREREQUISITE_FOR*]->(course)

WITH path
ORDER BY length(path) DESC

LIMIT 1

RETURN [node IN nodes(path) | node.title] AS learningPath
`

module.exports = {
    GET_ALL_COURSES,
    GET_COURSE_BY_ID,
    GET_LEARNING_PATH,
}