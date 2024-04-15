import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default MyRoutes;
