import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Layout from "./Layout";
import ThemeExample from "./style/ThemeExample";
import Excel from "./Excel";

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route element ={<Layout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="theme" element={<ThemeExample />} />
        <Route path="excel" element={<Excel />} />
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
