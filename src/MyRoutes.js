import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Attendance from "./pages/Attendance/AttendancePage";
import DayTimeTable from "./pages/Lecture/DayTimeTable";
import LectureDetail from "./pages/Lecture/LectureDetail";
import Lecture from "./pages/Lecture/LecturePage";
import SignIn from "./pages/SignIn/SignInPage";
import StudentDetail from "./pages/Student/StudentDetail";
import Student from "./pages/Student/StudentPage";
import ThemeExample from "./style/ThemeExample";

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
          <Route path="/lecture/day" element={<DayTimeTable />} />
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
