import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Attendance from "./pages/Attendance/AttendancePage";
import LectureDetail from "./pages/Lecture/Detail/LectureDetail";
import Lecture from "./pages/Lecture/LecturePage";
import SignIn from "./pages/SignIn/SignInPage";
import StudentDetail from "./pages/Student/StudentDetail";
<<<<<<< HEAD
import Student from "./pages/Student/StudentPage";
=======
import Lecture from "./pages/Lecture/LecturePage";
>>>>>>> 2e60c9fb9a18603c131dc4b6847cac09fd493bed

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
<<<<<<< HEAD
          <Route path="lecture/:id" element={<LectureDetail />} />
=======
>>>>>>> 2e60c9fb9a18603c131dc4b6847cac09fd493bed
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
