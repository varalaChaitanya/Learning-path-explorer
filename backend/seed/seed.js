const driver = require("../config/db")

const students = [
  {
    studentId: "S001",
    name: "Rahul",
    email: "rahul@gmail.com",
  },
  {
    studentId: "S002",
    name: "Priya",
    email: "priya@gmail.com",
  },
  {
    studentId: "S003",
    name: "Arjun",
    email: "arjun@gmail.com",
  },
]

const instructors = [
  {
    instructorId: "I001",
    name: "John",
    experience: 8,
  },
  {
    instructorId: "I002",
    name: "Sarah",
    experience: 6,
  },
  {
    instructorId: "I003",
    name: "David",
    experience: 10,
  },
]

const skills = [
  {
    skillId: "SK001",
    name: "Python",
  },
  {
    skillId: "SK002",
    name: "Arrays",
  },
  {
    skillId: "SK003",
    name: "SQL",
  },
  {
    skillId: "SK004",
    name: "Graphs",
  },
  {
    skillId: "SK005",
    name: "Machine Learning",
  },
]

const courses = [
  {
    courseId: "C001",
    title: "Python Basics",
    level: "Beginner",
    duration: 20,
  },
  {
    courseId: "C002",
    title: "Data Structures",
    level: "Intermediate",
    duration: 30,
  },
  {
    courseId: "C003",
    title: "Algorithms",
    level: "Intermediate",
    duration: 35,
  },
  {
    courseId: "C004",
    title: "Database Systems",
    level: "Intermediate",
    duration: 25,
  },
  {
    courseId: "C005",
    title: "Machine Learning",
    level: "Advanced",
    duration: 45,
  },
]

const enrollments = [
  {
    studentId: "S001",
    courseId: "C001",
    status: "Completed",
    progress: 100,
  },
  {
    studentId: "S001",
    courseId: "C002",
    status: "Completed",
    progress: 100,
  },
  {
    studentId: "S002",
    courseId: "C004",
    status: "Completed",
    progress: 100,
  },
  {
    studentId: "S003",
    courseId: "C002",
    status: "Completed",
    progress: 100,
  },
]

const courseInstructors = [
  {
    courseId: "C001",
    instructorId: "I001",
  },
  {
    courseId: "C002",
    instructorId: "I002",
  },
  {
    courseId: "C003",
    instructorId: "I002",
  },
  {
    courseId: "C004",
    instructorId: "I003",
  },
  {
    courseId: "C005",
    instructorId: "I001",
  },
]

const courseSkills = [
  {
    courseId: "C001",
    skillId: "SK001",
  },
  {
    courseId: "C002",
    skillId: "SK002",
  },
  {
    courseId: "C003",
    skillId: "SK004",
  },
  {
    courseId: "C004",
    skillId: "SK003",
  },
  {
    courseId: "C005",
    skillId: "SK005",
  },
]

const prerequisites = [
  {
    prerequisiteId: "C001",
    courseId: "C002",
  },
  {
    prerequisiteId: "C002",
    courseId: "C003",
  },
  {
    prerequisiteId: "C003",
    courseId: "C005",
  },
  {
    prerequisiteId: "C004",
    courseId: "C005",
  },
]

const seedDatabase = async () => {
  const session = driver.session()

  try {
    console.log("Starting database seed...")

    // Clear existing graph
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `)

    console.log("Existing data cleared")

    // Students
    await session.run(
      `
      UNWIND $students AS student

      MERGE (s:Student {studentId: student.studentId})

      SET
        s.name = student.name,
        s.email = student.email
      `,
      { students }
    )

    console.log("Students created")

    // Instructors
    await session.run(
      `
      UNWIND $instructors AS instructor

      MERGE (i:Instructor {instructorId: instructor.instructorId})

      SET
        i.name = instructor.name,
        i.experience = instructor.experience
      `,
      { instructors }
    )

    console.log("Instructors created")

    // Skills
    await session.run(
      `
      UNWIND $skills AS skill

      MERGE (s:Skill {skillId: skill.skillId})

      SET
        s.name = skill.name
      `,
      { skills }
    )

    console.log("Skills created")

    // Courses
    await session.run(
      `
      UNWIND $courses AS course

      MERGE (c:Course {courseId: course.courseId})

      SET
        c.title = course.title,
        c.level = course.level,
        c.duration = course.duration
      `,
      { courses }
    )

    console.log("Courses created")

    // Student Enrollments
    await session.run(
      `
      UNWIND $enrollments AS enrollment

      MATCH (s:Student {studentId: enrollment.studentId})
      MATCH (c:Course {courseId: enrollment.courseId})

      MERGE (s)-[r:ENROLLED_IN]->(c)

      SET
        r.status = enrollment.status,
        r.progress = enrollment.progress
      `,
      { enrollments }
    )

    console.log("Enrollments created")

    // Course -> Instructor
    await session.run(
      `
      UNWIND $courseInstructors AS item

      MATCH (c:Course {courseId: item.courseId})
      MATCH (i:Instructor {instructorId: item.instructorId})

      MERGE (c)-[:TAUGHT_BY]->(i)
      `,
      { courseInstructors }
    )

    console.log("Course-Instructor relationships created")

    // Course -> Skill
    await session.run(
      `
      UNWIND $courseSkills AS item

      MATCH (c:Course {courseId: item.courseId})
      MATCH (s:Skill {skillId: item.skillId})

      MERGE (c)-[:HAS_SKILL]->(s)
      `,
      { courseSkills }
    )

    console.log("Course-Skill relationships created")

    // Course Prerequisites
    await session.run(
      `
      UNWIND $prerequisites AS item

      MATCH (pre:Course {courseId: item.prerequisiteId})
      MATCH (course:Course {courseId: item.courseId})

      MERGE (pre)-[:PREREQUISITE_FOR]->(course)
      `,
      { prerequisites }
    )

    console.log("Prerequisite relationships created")

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Seeding failed:", error)
  } finally {
    await session.close()
    await driver.close()
  }
}

seedDatabase()