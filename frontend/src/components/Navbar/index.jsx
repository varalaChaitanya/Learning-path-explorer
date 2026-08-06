import { Link, useLocation } from "react-router-dom"

import "./index.css"

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="logo">
        📘 Learning Path Explorer
      </div>

      <ul className="nav-links">
        <li>
          <Link
            className={location.pathname === "/" ? "active" : ""}
            to="/"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            className={
              location.pathname.startsWith("/courses")
                ? "active"
                : ""
            }
            to="/courses"
          >
            Courses
          </Link>
        </li>

        <li>
          <Link
            className={
              location.pathname.startsWith("/students")
                ? "active"
                : ""
            }
            to="/students"
          >
            Students
          </Link>
        </li>

        <li>
          <Link
            className={
              location.pathname.startsWith("/instructors")
                ? "active"
                : ""
            }
            to="/instructors"
          >
            Instructors
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar