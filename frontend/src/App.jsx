import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Courses from "./pages/Courses"

import CourseDetails from "./pages/CourseDetails"
import Students from "./pages/Students"
import Footer from "./components/Footer"
import Instructors from "./pages/Instructors"
import InstructorDetails from "./pages/InstructorDetails"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/courses/:courseId"
          element={<CourseDetails />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        

        <Route
          path="/instructors"
          element={<Instructors />}
        />
        <Route
          path="/instructors/:instructorId"
          element={<InstructorDetails />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App