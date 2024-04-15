import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Layout from "./Layout";

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route element ={<Layout />}>
        <Route path="/" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
