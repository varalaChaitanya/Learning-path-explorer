import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="page-container">
      {/* Hero Section */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#1e3a8a)",
          color: "white",
          borderRadius: "18px",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
          }}
        >
          Learning Path Explorer
        </h1>

        <p
          style={{
            fontSize: "18px",
            maxWidth: "750px",
            margin: "auto",
            lineHeight: "1.8",
          }}
        >
          Explore learning paths using a Graph
          Database powered by CognoDB. Discover
          courses, instructors, skills and
          prerequisite relationships through an
          interactive graph-based application.
        </p>

        <Link to="/courses">
          <button
            className="blue-btn"
            style={{
              marginTop: "35px",
            }}
          >
            Browse Courses
          </button>
        </Link>
      </div>

      {/* Statistics */}

      <div
        className="grid"
        style={{
          marginTop: "40px",
        }}
      >
        <div className="card">
          <h2
            style={{
              color: "#2563eb",
              fontSize: "40px",
            }}
          >
            3
          </h2>

          <p>Students</p>
        </div>

        <div className="card">
          <h2
            style={{
              color: "#2563eb",
              fontSize: "40px",
            }}
          >
            5
          </h2>

          <p>Courses</p>
        </div>

        <div className="card">
          <h2
            style={{
              color: "#2563eb",
              fontSize: "40px",
            }}
          >
            3
          </h2>

          <p>Instructors</p>
        </div>
      </div>

      {/* Why Graph Database */}

      <div
        className="card"
        style={{
          marginTop: "40px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#1e3a8a",
          }}
        >
          Why Graph Database?
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            color: "#4b5563",
          }}
        >
          Traditional relational databases store
          information in tables, but educational
          platforms naturally involve relationships.
          Students enroll in courses, courses teach
          skills, instructors teach courses and
          courses have prerequisites. A graph
          database models these relationships
          directly, making multi-hop traversals fast,
          intuitive and easier to visualize.
        </p>
      </div>

      {/* Features */}

      <div
        style={{
          marginTop: "40px",
        }}
      >
        <h2
          className="page-title"
          style={{
            marginBottom: "20px",
          }}
        >
          Features
        </h2>

        <div className="grid">
          <div className="card">
            <h3>📘 Course Explorer</h3>

            <p
              style={{
                marginTop: "12px",
              }}
            >
              Browse available courses with
              instructor and skill information.
            </p>
          </div>

          <div className="card">
            <h3>👨‍🎓 Student Dashboard</h3>

            <p
              style={{
                marginTop: "12px",
              }}
            >
              View enrolled courses and learning
              progress.
            </p>
          </div>

          <div className="card">
            <h3>👨‍🏫 Instructor Directory</h3>

            <p
              style={{
                marginTop: "12px",
              }}
            >
              Explore instructors and the courses
              they teach.
            </p>
          </div>

          <div className="card">
            <h3>🔗 Learning Paths</h3>

            <p
              style={{
                marginTop: "12px",
              }}
            >
              Discover prerequisite chains using
              graph traversal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home