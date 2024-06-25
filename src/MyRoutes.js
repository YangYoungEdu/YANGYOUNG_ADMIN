import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ThemeExample from "./style/ThemeExample";
import SignIn from "./pages/SignIn/SignInPage";
import Attendance from "./pages/Attendance/AttendancePage";
import Student from "./pages/Student/StudentPage";
import StudentDetail from "./pages/Student/StudentDetail";
import Lecture from "./pages/Lecture/LecturePage";
import LectureDetail from "./pages/Lecture/LectureDetail";

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SignIn />} />
          <Route path="theme" element={<ThemeExample />} />
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
