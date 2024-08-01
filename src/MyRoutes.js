import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Attendance from "./pages/Attendance/AttendancePage";
import LectureDetail from "./pages/Lecture/Detail/LectureDetail";
import Lecture from "./pages/Lecture/LecturePage";
import SignIn from "./pages/SignIn/SignInPage";
import StudentDetail from "./pages/Student/StudentDetail";
import Student from "./pages/Student/StudentPage";

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SignIn />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="student" element={<Student />} />
          <Route path="/student/:id" element={<StudentDetail />} />
          <Route path="lecture" element={<Lecture />} />
          <Route path="lecture/:id" element={<LectureDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
