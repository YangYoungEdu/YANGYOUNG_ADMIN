import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignInPage";
import Layout from "./Layout";
import ThemeExample from "./style/ThemeExample";

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SignIn />} />
          <Route path="theme" element={<ThemeExample />} />
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
