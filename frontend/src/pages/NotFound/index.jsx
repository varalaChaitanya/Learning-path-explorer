import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          color: "#2563eb",
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p
        style={{
          marginTop: "15px",
          color: "#6b7280",
        }}
      >
        The page you are looking for doesn't exist.
      </p>

      <Link to="/">
        <button
          className="blue-btn"
          style={{
            marginTop: "25px",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound