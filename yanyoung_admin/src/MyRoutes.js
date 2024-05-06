import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ThemeExample from "./style/ThemeExample";
import SignIn from "./pages/SignIn/SignInPage";
import Attendance from "./pages/Attendance/AttendancePage";
import Student from "./pages/Student/StudentPage";
import DropdownExample from "./pages/Student/Dropdown"; 

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SignIn />} />
          <Route path="theme" element={<ThemeExample />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="student" element={<Student />} />
          {/* <Route path = "student" element={<DropdownExample />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
